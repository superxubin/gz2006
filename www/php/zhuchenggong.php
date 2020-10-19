<?php

   // 更换格式
   header("content-type: text/html;charset=utf-8");

    //  获取前端发送的数据
    $username = $_POST["username"];
    $password = $_POST["password"];

  // 连接数据库
    mysql_connect("localhost","root","root");

  // 确认操作的数据库
      mysql_select_db("gz2006");

     // 定义sql语句
    //  查询 发送过来的用户名在数据库里有没有
    $sql = "INSERT INTO user VALUES('$username', '$password')";

     // 5 执行sql语句
     $result = mysql_query($sql);

       //  因为ursename 是主键  所有有的话就只有一个.没有就是数据库里没有
    // 判断
    if($result){
        // 输出
        echo json_encode(array("error" => 1, "msg" => "注册成功"));
    }else{
        echo json_encode(array("error" => 0, "msg" => "注册失败"));
    }

    ?>