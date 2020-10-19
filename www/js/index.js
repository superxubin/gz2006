;(function(){
//  获取元素  输入框和密码框
$username = $("#inputuser");
$password = $("#inputpassword");
$btn = $(".btn");
 //  导航栏的 事件
  //  获取元素
$list = $(".list");
$yinmin = $(".yinMin");
$yin = $(".yin")



$btn.on("click",function(){
// 获取用户输入的 用户名和密码
$userName = $username[0].value;
$passWord = $password[0].value;
console.log($userName,$passWord)

localStorage.setItem("userName",$userName);

    $.ajax({
        type:"post",
        url:"./php/denglu.php",
        data:{
            username:$userName,
            password:$passWord,
        },
        datatype:"json",
        success:function(data){
            if(!$.parseJSON(data).error){
                location.href = "./html/guanwang.html"
            }else{
                alert($.parseJSON(data).data)
            }
           
        }
    })
    $username[0].value = "";
    $password[0].value = "";
});


 
  

  //  给导航栏 ul 创建鼠标移入事件
  $list.on("mouseenter", function () {
    $yinmin.css("z-index", "2");
    $yin.css("z-index", "1");
    console.log(1);
  })



  // 创建鼠标移出事件
  $yinmin.on("mouseleave", function () {
    $yinmin.css("z-index", "-1");
    $yin.css("z-index", "-1")

  })



})();

