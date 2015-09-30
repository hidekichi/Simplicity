<?php
	//$url = "http://scrap.php.xdomain.jp";  // 対象のURL
	$rss_url = $_GET['url'];
	$api = "http://cloud.feedly.com/v3/feeds/feed%2F";
	$rss = urlencode($rss_url);

	$ch = curl_init(); // 初期化
	curl_setopt( $ch, CURLOPT_URL, $api.$rss ); // URLの設定
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true ); // 出力内容を受け取る設定
	$result = curl_exec( $ch ); // データの取得
	curl_close($ch); // cURLのクローズ

	$jd = json_decode($result,true);
	$sub = $jd['subscribers'];
	
	echo $sub; //取得内容を出力

?>
