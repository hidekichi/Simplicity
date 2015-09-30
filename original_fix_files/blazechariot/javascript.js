(function($){
/**
 * 自分のサイトアドレス
 * http://yahoo.co.jp/wp-content/themes/simplicity-child/lib/xxxx-count.phpの場合、
 * http://yahoo.co.jp/ ←まで(最後スラッシュ含む)まで入れておく
 * @type {String}
 */
var SITE = "http://";
var SC_CHILD_LIB = "wp-content/themes/simplicity-child/lib/";

var SNS = {
	ajax: function ( surl,query ){
		var def = $.Deferred();
		$.ajax({
			type: "GET",
			url: surl,
			data: query,
			dataType: "jsonp",
		success: def.resolve,
		error: def.reject
		});
		return def.promise();
	},
	twitter: function( url ){
		var def = $.Deferred();
		$.ajax({
			type: "GET",
			url: "http://urls.api.twitter.com/1/urls/count.json",
			data: { "url": url },
			dataType: "jsonp",
			success: def.resolve,
			error: def.reject
		});
		return def.promise();
	},
	countShow: function ( selecter,count ){
		jQuery( selecter ).text( count );
	},
	feedly: function ( surl,query ){
		var def = $.Deferred();
		$.ajax({
			type: "GET",
			url: surl,
			data: query,
			dataType: 'html',
		success: def.resolve,
		error: def.reject
		});
		return def.promise();
	},
	gp: function ( surl,query ){
		var def = $.Deferred();
		$.ajax({
			type: "GET",
			url: surl,
			data: query,
			dataType: 'html',
		success: def.resolve,
		error: def.reject
		});
		return def.promise();
	},
	hb: function ( surl,query ){
		var def = $.Deferred();
		$.ajax({
			type: "GET",
			url: surl,
			data: query,
			dataType: "html",
		success: def.resolve,
		error: def.reject
		});
		return def.promise();
	},
	pt: function ( surl,query ){
		var def = $.Deferred();
		$.ajax({
			type: "GET",
			url: surl,
			data: query,
			dataType: "json",
		success: def.resolve,
		error: def.reject
		});
		return def.promise();
	},
};

/**
 * ajaxに送るアドレスとそのクエリを作る部分
 * @param  {string} url social_count_config.permalink等のアドレス
 * @return {string}     関数SNS(ajax部)に送る引数を作り、仲介する関数
 */
function get_count_twitter(url){ return SNS.twitter(url); }
function get_count_facebook(url){
	var surl = SITE + SC_CHILD_LIB + 'facebook-count.php',
		query = {url: url };
	return SNS.feedly(surl, query);
}
function get_count_googleplus(url){
	var surl = SITE + SC_CHILD_LIB + 'gp-count.php',
		query = {url: url };
	return SNS.gp(surl,query);
}
function get_count_hatebu(url){
	var surl = SITE + SC_CHILD_LIB + 'hatena-count.php',
		query = { "url": url };
	return SNS.hb(surl,query);
}
function get_count_pocket(url){
	var surl = SITE + SC_CHILD_LIB + 'pocket-count.php',
	query = { url: url };

	return SNS.feedly(surl,query);
}
function get_count_feedly(url){
	var surl = SITE + SC_CHILD_LIB + 'feedly-count.php',
		query = { "url": url };
	return SNS.feedly(surl,query);
}

	$(function(){
		if (typeof social_count_config !== 'undefined') {

		/**
		 * 並列してajaxに引数を送る
		 * @param  {function}      get_count_関数名(アドレス(wordpressローカル変数)
		 * @return {ajax_response} ajaxで処理した内容が返ってくる
		 */
		$.when(
			//get_count_twitter(social_count_config.permalink),
			get_count_facebook(social_count_config.permalink),
			get_count_googleplus(social_count_config.permalink),
			get_count_hatebu(social_count_config.permalink),
			get_count_pocket(social_count_config.permalink),
			get_count_feedly(social_count_config.rss2_url)
		).done(function(/*twd,*/fbd,gpd,hbd,ptd,fyd){
			// console.log("twitter: ", twd);
			console.log("facebook: ", fbd);
			console.log("google+: ", gpd);
			console.log("hatebu: ", hbd);
			console.log("pocket: ", ptd);
			console.log("feedly: ", fyd);

			/**
			 * SNS.countShow('書き換えるセレクタ','その値')
			 * @param  {selector} '.twitter-count' 書き換えるセレクタ
			 * @param  {int_number} 0              カウンタ数値
			 * @return {none}                      htmlを書き換えるので戻り値なし
			 */
			//twitter
			SNS.countShow( '.twitter-count',  /*twd[0].count || 0*/ 'suspend' );
			//facebook
			SNS.countShow( '.facebook-count', ( fbd[0]) );
			//google+
			SNS.countShow( '.googleplus-count', ( gpd[0] ) );
			//hatebu
			SNS.countShow( '.hatebu-count', ( hbd[0] || 0 ) );
			//pocket
			SNS.countShow( '.pocket-count', ( ptd[0] ) );
			//feedly
			SNS.countShow( '.feedly-count', ( fyd[0] || 0 ) );
		}).fail(function(/*twde,*/fbde,gpde,hbde,ptde,fyde){
			/**
			 * ブラウザデベロッパーツールのconsoleに表示するエラーメッセージと内容
			 * @param  {string} "fb:" エラーが出ているSNS名 fb:facebookなど
			 * @param  {object} fbde  ajax処理のエラーオブジェクト
			 * @return {none}         ブラウザコンソール出力のため戻り値なし
			 */
			console.log("fb:",fbde);
			console.log("gp:",gpde);
			console.log("hb:",hbde);
			console.log("pt:",ptde);
			console.log("fy:",fyde);
		});
		}
	});
})(jQuery);
