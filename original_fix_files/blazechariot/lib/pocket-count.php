<?php

$url = $_GET['url'];
$html = 'http://widgets.getpocket.com/v1/button?label=pocket&count=vertical&v=1&url=' . urlencode( $url );

$ch = curl_init(); // 初期化
curl_setopt( $ch, CURLOPT_URL, $html ); // URLの設定
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true ); // 出力内容を受け取る設定
$result = curl_exec( $ch ); // データの取得
curl_close($ch); // cURLのクローズ

$domDocument = new DOMDocument('1.0', 'UTF-8');
$domDocument->preserveWhiteSpace = false;
$domDocument->loadHTML($result);
$xmlString = $domDocument->saveXML();
$xmlObject = simplexml_load_string($xmlString);
$array = json_decode(json_encode($xmlObject), true);

echo $array['body']['div']['a']['span']['em'];

?>
