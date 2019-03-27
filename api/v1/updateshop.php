<?php
    include("db.php");
    $Id = $_GET{"Id"};
    $name = $_GET{"name"};
    $price = $_GET{"price"};
    $num = $_GET{"num"};
	
	$sql = "update shop set name='$name',price='$price',num='$num'  where id='$Id'";
	
	if(mysql_query($sql)){
		echo json_encode(array('res_code' => 1, 'res_message' => '修改成功'));
	}else{
		echo json_encode(array('res_code' => 1, 'res_message' => '修改失败'));
    }
	
?>