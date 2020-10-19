;(function(){
   
// 获取页面的输入框元素
$inputUser = $("#inputuser");
$inputPass = $("#inputPassword");
//  获取按钮元素
$btn = $(".btn");

// 先给用户名输入框写失去焦点事件
$inputUser.on("blur",function(){
    //  获取用户输入的值
    $userName = $inputUser[0].value;

    // 写一个用户名正则
    var reg = /^[a-zA-Z0-9_-]{4,16}$/;
    // 验证输入的用户名是否符合正则
     $result = reg.test($userName);

    // 判断 如果正确就显示√
    if($result){
        $.post("../php/zhuce.php",{username:$userName},function(data){
        if(!$.parseJSON(data).error){
            $(".user").html("√");
            $(".user").css("color","green")
        }else{
            $(".user").html("X");
            $(".user").css("color","red")
            alert("用户名被占用")
        }
        })
    }else{
        //  错误就显示X
        $(".user").html("X");
        $(".user").css("color","red")
    }  
})
//  创建 密码输入框的 失去焦点事件
$inputPass.on("blur",function(){
        //  获取用户输入的值
        $passWord = $inputPass[0].value;

        // 写一个密码正则    
        let reg = /^\w{4,10}$/;
        // 验证输入的用户名是否符合正则
        $result = reg.test($passWord);

        // 判断是否符合
        if($result){
            $(".pass").html("√");
            $(".pass").css("color","green")
        }else{
            //  错误就显示X
            $(".pass").html("X");
            $(".pass").css("color","red")
        } 
})
//  创建 注册按钮的 点击事件
$btn.on("click",function(){
   $.ajax({
    type:"post",
    url:"../php/zhuchenggong.php",
    data:{
        username:$userName,
        password:$passWord,
    },
    datatype: "json",
    success:function(data){
       alert($.parseJSON(data).msg)   
    }
   }) 
   $inputUser[0].value = "";
   $inputPass[0].value = "";
   $("span").css("display","none");
})
    
})()

















