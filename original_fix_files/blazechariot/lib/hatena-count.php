<?php

$g_url = $_GET['url'];
$api = 'http://api.b.st-hatena.com/entry.count?url=';
$url = rawurlencode($g_url);

$ch = curl_init(); // 初期化
curl_setopt( $ch, CURLOPT_URL, $api.url ); // URLの設定
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true ); // 出力内容を受け取る設定
$result = curl_exec( $ch ); // データの取得
curl_close($ch); // cURLのクローズ

	if( !isset( $result ) || empty( $result ) ){
		$result = 0 ;
	}

echo $result;
?>
