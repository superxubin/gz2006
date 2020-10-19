<?php

    //  获取前端发送的数据
    $username = $_POST["username"];
    $password = $_POST["password"];

    // 连接数据库
    mysql_connect("localhost","root","root");

    // 确认操作的数据库
    mysql_select_db("gz2006");

    // 定义sql语句
    $sql = "SELECT * FROM user WHERE username = '$username' and password = '$password'"; 
    // 执行sql语句
    $result = mysql_query($sql);
    // 查询结果
    $row = mysql_fetch_array($result);
    //  判定
    if($row){
      setcookie("super","1",time()+1800,"/");
      echo json_encode(array("error" => 0 , "data" => "登录成功"));
    }else{
        echo json_encode(array("error" => 1 , "data" => "检查用户名和密码"));
    };

?>