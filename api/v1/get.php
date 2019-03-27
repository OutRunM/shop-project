<?php 
	include("db.php");
	$pageIndex = $_GET["pageIndex"];

	$sql = "select * from shop";

	$totalPage = ceil(mysql_num_rows(mysql_query($sql))/10);

	if($pageIndex>$totalPage) $pageIndex = $totalPage;

	$start = ($pageIndex-1) * 10;

	$setSql = "select * from shop limit $start,10";

	$res = mysql_query($setSql);
	

	$arr = array();

	while ($row = mysql_fetch_assoc($res)) {
		array_push($arr, $row);
	}

	$resArr = array(
		
		'res_code' => 1,
		'res_message' => '查询成功',
		'res_body' => array('data' => $arr,
				'pageIndex'=>$pageIndex - 0,
				'totalPage'=>$totalPage,
				
		)
	);

	echo json_encode($resArr);



 ?>