<?php
//Simplicity子テーマ用の関数を書く

if(!is_admin()){
	function register_jQuery(){
		wp_deregister_script( 'jquery' ); //あらかじめ登録されているjQueryを登録解除する
		//'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js';

		$url = "http" . ($_SERVER['SERVER_PORT'] == 443 ? "s" : "") . "://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
		//$test_url = file_check($url);
		$args = array(
			'timeout'	=> 15,
			'headers'	=> array(),
			'body'		=> null,
			'sslverify'	=> true
			);
		$test_url = wp_remote_get( $url, $args );
		$check = wp_remote_retrieve_response_code($test_url);
		if ( (int)$check === 200 ) {
			wp_register_script(
				'jquery',
				$url,
				array(),
				NULL,
				false
				);
		} else {
			$local_url = get_stylesheet_directory_uri() . "/lib/jquery.min.js";
			wp_register_script('jquery', $local_url, array(), NULL, false);
		}

		wp_enqueue_script('jquery'); //登録し直したjQueryを読み込む
	}
	add_action('wp_enqueue_scripts', 'register_jQuery');
}
add_filter(
	'script_loader_tag',
	function ( $tag, $handle ) {
		if ( 'jquery' !== $handle ){ return $tag; }
		return str_replace( ' src', ' defer src', $tag );
	},
	0,
	2
);

remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

?>