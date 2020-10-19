;(function () {

  // 检查cookie;
  let cook = QF.getCookie("super");
  console.log(cook);
  if(!cook){
    alert("您没登录,请登录")
    location.href = "../index.html"
  }

  //  用户登录
//  获取本地贮存的 用户名
   $userName = localStorage.getItem("userName");
//  获取元素
   $user = $(".user");
   $user.html(`
   <p>尊敬的"${$userName}"<p>
   <button class="btn">注销登录<button>
   `)


// 获取 注销按钮

$btn = $(".btn");
$btn.on("click",function(){
QF.removeCookie("super","/");
location.reload();
})
  
   
  //  顶部新闻的JS代码
  //  获取元素  几个p标签的div元素
  $title = $(".title li a");
  $titleMin = $(".title")
  $content = $(".content div")

  //  创建鼠标移入事件
  //  这是给新闻栏目做的 事件
  $title.each(function (index, value) {
    console.log(value)
    $(this).mouseenter(function (e) {
      var target = $(e.target)
      target.css("color", "#1da6ba");
      target.css("border-color", "#1da6ba");
      $title.addClass("active").siblings().removeClass("active");
      $content.eq(index).addClass("active").siblings().removeClass("active");
      // $title.css("color","#1da6ba");
      // $title.css("border-color","#1da6ba");
    })
  });
  //  创建鼠标移出事件将样式清除
  $titleMin.on("mouseout", "a", function (e) {
    var target = $(e.target)
    target.css("color", "black")
    target.css("border-color", "transparent");

  })



  // 下面 渲染英雄 的JS 代码

  //  获取ul列表元素
  $ul = $(".ulList");

  //  创建一个空的数组接返回的数据
  let arr = [];

  // jquery 发送ajax 请求 获取一个数据数组 data 返回的是数组
  $.ajax({
    type: "post",
    url: "../php/guanwang.php",
    data: {},
    datatype: "json",
    success: function (data) {
      arr = $.parseJSON(data).data;
      // console.log(arr);

      //  返回是0  说明成功。
      if ($.parseJSON(data).error == 0) {

        //  执行 渲染函数
        render(arr);


        //  这是将 英雄种类分类
        //  获取元素

        $heroClass = $(".heroClass li");
        $ulList = $(".ulList li");


        // 英雄渲染出来的上面的列表 点击事件 更改样式
        $heroClass.each(function (index, value) {
          // console.log(index,value)
          $(this).click(function (e) {
            $(this).addClass("back").siblings().removeClass("back");
            $(this).eq(index).addClass("back").siblings().removeClass("back");


            //  将点击的元素 li 的class id名取出来 用来做判断
            var msg = $(this).attr("id")
            var classMsg = $(this).attr("class")
            //    第一个li 的class名需要截取
            var newClassMsg = classMsg.slice(0, 6);
            // console.log(newClassMsg);

            //  发现因为加样式的时候 加了class名“back”  导致输入的class名 不匹配 所以出来的数组为o 分离不出来  
            //  这时候就试试将 msg  给截取出来
            // var newMsg = msg.slice(0, 7)
            // console.log(newMsg);
            //  后面发现有bug  就是class有长有短。 不能各式各样的截取  所以直接将分类改成ID名字

            //  这是 数组分类方法  filter 
            var newArr = $.parseJSON(data).data.filter(function (value) {
              //  将 id名将数据里面的名字对应 筛选出来  
              // 返回的 一个新数组 是过滤出来的
              return value["roles.0"] == msg;
            })
            // console.log(newArr)

            //  将新数组 当参数 放入执行渲染函数里
            render(newArr);


            //  判断 如果点的 全部英雄  那么从新渲染一次 之前的全部数组
            if (newClassMsg == "ziliao") {
              render(arr);
            }
          });
        })
      }
    }

  })
  //  将渲染 函数 包装
  function render(arr) {
    // 将数组截取
    // let arrText = arr.slice(0,1);
    // console.log(arrText)
    // //   用获取出来的数组第一个数据
    // var item = arrText[0];
    //  console.log(item)
    // 循环 
    var str = "";

    //  将英雄 种类 添加到li的class名
    for (var i = 0; i < arr.length; i++) {
      // 单独拿出一条数据
      var item = arr[i];
      // console.log(item);
      //  这是将 数据里面的图片地址 拼接起来
      var newStr = item.palmHeroHeadImg;
      var d = newStr.slice(6, 41);
      // console.log(d);
      // var a =  d.slice(0,35);
      var b = "champion/";
      var c = ".png";
      // console.log(d+b+item.alias+c);
      str += `
          <li class ="${item["roles.0"]}"> 
            <img src="${d}${b}${item.alias}${c}">
        <p>
            ${item.name}
        </p>
        </li>
        `
    }
    // 渲染
    $ul.html(str);
  };

  //  导航栏的 事件
  //  获取元素
  $list = $(".list");
  $yinmin = $(".yinMin");
  $yin = $(".yin")

  //  给导航栏 ul 创建鼠标移入事件
  $list.on("mouseenter", function () {
    $yinmin.css("z-index", "2");
    $yin.css("z-index", "1")
  })

  // 创建鼠标移出事件
  $yinmin.on("mouseleave", function () {
    $yinmin.css("z-index", "-1");
    $yin.css("z-index", "-1")

  })




  //  轮播图
  var galleryThumbs = new Swiper('.gallery-thumbs', {
    // spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  var galleryTop = new Swiper('.gallery-top', {
    // spaceBetween: 10,
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
    autoplay: {
      delay: 800,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    loop: true,
    thumbs: {
      swiper: galleryThumbs
    }
  });
  //鼠标覆盖停止自动切换
  galleryTop.el.onmouseover = function () {
    galleryTop.autoplay.stop();
  }

  //鼠标离开开始自动切换
  galleryTop.el.onmouseout = function () {
    galleryTop.autoplay.start();
  }


})();