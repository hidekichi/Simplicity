<?php

$url = $_GET['url'];
$api = "http://graph.facebook.com/?id=";
$rss = urlencode($url);

$ch = curl_init(); // 初期化
curl_setopt( $ch, CURLOPT_URL, $api.$url ); // URLの設定
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true ); // 出力内容を受け取る設定
$result = curl_exec( $ch ); // データの取得
curl_close($ch); // cURLのクローズ

$jd = json_decode($result, true);

if( isset($jd['shares']) ){
	$sub = $jd['shares'];
} else {
	$sub = 0 ;
}

echo $sub; //取得内容を出力

?>
