<?php

	header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

	$rss_url = $_GET['url'];
	$api = "http://cloud.feedly.com/v3/feeds/feed%2F";
	$rss = urlencode($rss_url);
	
	$json = file_get_contents($api.$rss);
	$jd = json_decode($json,true);
	$subs = $jd['subscribers'];
	
	echo $subs;
	
?>
