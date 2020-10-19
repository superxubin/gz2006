<?php


// 连接数据库
mysql_connect("localhost","root","root");

// 选择数据库
mysql_select_db("gz2006");

//  sql语句
// 搜索goods的表格
$sql = "SELECT * FROM heroinfo";

// 执行sql
$result = mysql_query("$sql");    

// 创建一个空的数组
$arr =  array();

// 将goods 的搜索结果抽出来放入数组
while ($row = mysql_fetch_array($result)){
    array_push ($arr , $row);
}
// 输出并转换为json 数组.
echo json_encode(array("error"=>0,"data"=>$arr));


?>