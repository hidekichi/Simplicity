<?php
	function get_plusones($url) {

	    $ch = curl_init(); // 初期化
		curl_setopt( $ch, CURLOPT_URL, $url ); // URLの設定
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true ); // 出力内容を受け取る設定
		$result = curl_exec( $ch ); // データの取得
		curl_close($ch); // cURLのクローズ

	    $vDoc = new DOMDocument();
		@$vDoc->loadHTML($result);
		$vCounter = $vDoc->getElementById('aggregateCount');
		echo $vCounter->nodeValue;
	}
	$url = $_GET['url'];
	$api = "https://plusone.google.com/_/+1/fastbutton?url=";
	$plusone = get_plusones($api . urlencode($url));

?>
