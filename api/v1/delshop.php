<?php
	include("db.php");
	$Id = $_GET{"id"};
	$sql = "delete from shop where id='$Id'";
	
	
	if(mysql_query($sql)){
		echo json_encode(array('res_code' => 1, 'res_message' => '删除成功'));
	}
?>