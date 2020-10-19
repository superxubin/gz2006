<?php

    //  获取前端发送的数据

    $username = $_POST["username"];

  // 连接数据库
    mysql_connect("localhost","root","root");

  // 确认操作的数据库
      mysql_select_db("gz2006");

     // 定义sql语句
    //  查询 发送过来的用户名在数据库里有没有
    $sql = "SELECT * FROM user WHERE username = '$username'";

    // 执行sql语句
    $result = mysql_query($sql);

    //  将上面查询的结果集里面取得一行.返回根据从结果集取得的行生成的数组.如果没有多行则返回false
      $row = mysql_fetch_array($result);

      //  因为ursename 是主键  所有有的话就只有一个.没有就是数据库里没有
    // 判断
    if($row){
        // 输出
        echo json_encode(array("error" => 1, "msg" => "用户名被占用"));
    }else{
        echo json_encode(array("error" => 0, "msg" => "用户名可以注册"));
    }

    ?>