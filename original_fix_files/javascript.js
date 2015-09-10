/**
 * TOPへ戻るボタン
 */

(function($) {

	$(window).on("load scroll", function() {
		//最上部から現在位置までの距離を取得して、変数[now]に格納
		var now = $(window).scrollTop(),
			pageTop = $("#page-top");

		//最上部から現在位置までの距離(now)が600以上
		if (now > 600) {
			//[#page-top]をゆっくりフェードインする
			pageTop.fadeIn('slow');

			//それ以外だったらフェードアウトする
		} else {

			pageTop.fadeOut('slow');
		}
		//console.log(wrapperTop);

	});

	//ボタン(id:move-page-top)のクリックイベント
	// クリックでページトップへ移動する
	$(function() {
		$("#page-top").on("click", function() {
			$("body,html").animate({
				scrollTop: 0
			}, 600);
		});
	});

})(jQuery);


/**
 * スクロール追従
 */

(function($) {
	/**
	 *
	 * follow scrool widget, wordpress theme Simplicity専用
	 *
	 * script by Hidekichi
	 * http://blazechariot.wp.xdomain.jp/
	 *
	 */

	 // オフセットを調べる関数
 	function offsetCheck(tgt){
 		return tgt.get( 0 ).offsetTop;
 	}

 	// heightを調べる関数
 	function heightCheck(tgt){
 		return tgt.height();
 	}

 	/**
 	 * [bgColorCheck sidebarの背景に色が付いていた場合の処理をする関数]
 	 * @param  {[jQueryObject]} tgt [基本追従エリアのセレクタが入ります]
 	 * @return {[none]}     [関数で出力するため返り値なし]
 	 *
 	 * 追従エリアに適用するための、構成クラス.followingと色クラス.whiteBGが必要です
 	 *
 	 * .following {
 	 *   padding: 0px 8px 30px;  // sidebarのpaddingは[5px 8px]、#mainに合わせるため30px追加(topも必要かも)
 	 *   border-radius: 0 0 4px 4px; // 追従している間はトップに張り付いていると思うので上左・右のコーナー丸角は不要
 	 * }
 	 * .whiteBG {
 	 *   background-color: #fff;  // 追従エリアに入れる背景色
 	 *   border: 1px solid #ddd;  // それに伴うボーダー色
 	 * }
 	 *
 	 * 上記をstyle.cssに追記(whiteBGを別バージョンで作れば他の色背景にも対応可能)
 	 */
 	function bgColorCheck(tgt) {
 		var sidebar = $("#sidebar");

 		// sidebarの背景に色がついているかどうか
 		// 色がない = 透過されている状態
 		// 透過されている = sidebarに色を付けるがチェックされていない
 		if ( sidebar.css("background-color") !== "transparent"){

 			// style.cssに追記した汎用クラスを付けて、sidebarの横幅と座標(left)を揃える
 			tgt.addClass('following whiteBG')
 				.css({
 					"width": sidebar.outerWidth(),
 					"left": sidebar.offset().left
 				});

 		} else {

 			// sidebarに色を付けるがチェックされていない場合は、sidebarの横幅と座標(left)を揃えるだけ
 			tgt.css({
 					"width": sidebar.outerWidth(),
 					"left": sidebar.offset().left
 				});

 		}
 	}

 	$(function(){

 		//setting
 		var mainHeight    = $("#main").height(),
 		    sidebarWidth  = $("#sidebar").width(),
 		    ft            = $("#footer"),
 		    ftTop         = ft.get( 0 ).offsetTop,
 		    followArea    = $("#sidebar-scroll"),
 		    flwAreaHeight = followArea.outerHeight(),
 		    flwAreaTop    = followArea.get( 0 ).offsetTop,
 		    flwAreaBottom = flwAreaTop + flwAreaHeight,
 			ftTopMargin   = parseInt( $(ft).css('margin-top'), 10 ),
 			mBottomMargin = parseInt( $("#main").css('margin-bottom'), 10 ),
 			betweenMargin = ftTopMargin + mBottomMargin;

 			// 追従エリアの前にdummyブロックを挿入
 			$(followArea).before("<div class='dummy'></div>");
 			var dummy     = $("#sidebar .dummy"),
 			    dyOffset  = dummy.get( 0 ).offsetTop;

 		/**
 		 * setTimeoutにて、0.2秒後に処理が行われるようにするためのtimerです
 		 * これがなければスクロールの最中も処理が行われるので、それを回避するため設置
 		 */
 		var timer = false;

 		/**
 		 * window.innerWidth > 1050 は、スクロール追従する処理を行う画面幅です
 		 * 1050px以上の画面幅がある時のみ処理を行います
 		 * wordpressローカル変数で、タブレットの時にデスクトップ表示の有無をチェックしても良いかも知れません
 		 */

 		if (window.innerWidth > 1050){

 			if (timer !== false ) { clearTimeout(timer); }

 			timer = setTimeout(function(){

 				$(window).on("load scroll", function(){

 					/**
 					 * sidebarの背景色をチェックする関数
 					 * @param  {jQueryObject} followArea [追従エリアに対して出力しますがsidebarをチェックします]
 					 * @return なし。直接出力            [関数にて直接出力。返り値なし]
 					 */
 					bgColorCheck(followArea);

 					// dummyのオフセットを調べてそれが変更されたら追従エリアの座標(top)に代入
 					//
 					if (dyOffset !== offsetCheck(dummy)){
 						dyOffset = offsetCheck(dummy);
 						flwAreaTop = dyOffset;
 					}

 					var st = $(window).scrollTop();

 					if ( mainHeight > flwAreaBottom ){

 						// scrollTopが追従エリアのoffsetTopを超えた時
 						if ( st > dyOffset ){

 							/**
 							 * #条件
 							 *
 							 * footer.offset().topから追従エリアの高さを引いた座標よりscrollTopが小さい時
 							 * (つまりは追従エリアがfooterに達している場面よりも上にscrollTopがある時)、
 							 * [check]footer.offset().top - ( [check]追従エリア + footer上のマージン )よりscrollTopが大きい時
 							 *
 							 * これは、footerに追従エリアが到達して上に戻る時にfooterに追従エリアを張り付かせるためのものです
 							 * checkはスクリプト先頭の関数からその時のオフセット値を求めてます
 							 * スクロールごとにチェックするのでやり過ぎですが、追従エリアのサイズが非同期で変わった後、
 							 * 追従エリアがfooterを突き抜けることがあったため導入
 							 */

 							if (st > offsetCheck(ft) - (heightCheck(followArea) + betweenMargin) ) {

 								followArea.css({
 									position: "absolute",
 									top: offsetCheck(ft) - ( heightCheck(followArea) + betweenMargin)
 								});

 							} else {

 								/**
 								 * footerに追従エリアが到達し、追従エリアの高さを超えるということは
 								 * 画面上辺に追従エリアが達したと言うことなのでfixedにしてtop:0になってます
 								 */

 								followArea.css({
 									position:"fixed",
 									top: 0
 								});

 							}

 						} else {

 							/**
 							 * 追従エリアが元の座標に戻った場合は、jQueryのcssでstyleに追加したプロパティが不要なので
 							 * styleごと削除して元に戻します。
 							 * オリジナルではposition: staticでしたが、何もなければ基本staticなので
 							 * 特別に何も処理してません
 							 */

 							followArea
 								.removeClass()
 								.removeAttr("style", "position top");
 						}

 					} else {
 						/**
 						 * もしメインの記事の高さがサイドバーよりも低い場合は、ここに何か書くことで
 						 * スクロールに伴う独自の処理を行えます
 						 */
 					}

 				});

 			},100); //settimeoutの時間 1000 = 1秒
 		}
 	});
 })(jQuery);


/**
 * メニューボタンの開閉
 *
 *   -> 一部スクリプトを書き換えています。動作の内容は同じです
 */

/*jQuery(document).ready(function() {
  jQuery('#mobile-menu-toggle').click(function(){
	header_menu = jQuery('#navi ul');
	if (header_menu.css('display') == 'none') {
	  header_menu.slideDown();
	} else{
	  header_menu.slideUp();
	};
  });

});*/

(function($) {

	$(function() {

		/**
		 * タッチ操作ができる端末で、反応速度を上げるため
		 *
		 *   端末がtouchstart可能な場合、clickをtouchstarに
		 *   できない場合はclickを'click'で
		 */
		var click = ('ontouchstart' in document) ? 'touchstart' : 'click';

		$("#mobile-menu-toggle").on(click, function() {
			var header_menu = $("#navi ul");

			if (header_menu.is(":hidden")) {

				/**
				 * todo: jQuery3.0より、
				 *       .slideDown, .slideUp()はcssでdisplay:noneの要素に対して動作しなくなります。
				 * idea: css側でdisplay:noneにした$('#navi ul')にたいして、新たにcssでクラスを作り
				 *       header_menu.addClass("show");などで.showにdisplay:blockを入れることで表示
				 *       #navi ul(のli)にtop:50px;などのプロパティを入れておき、.show.slideUpでtop:0に。
				 *       .slideUpにtransition&opacityを仕込めばアニメーションします。
				 *       参考例: header_menu.addClass("show slideUp");
				 */

				header_menu.slideDown();

			} else {

				header_menu.slideUp();

			}
		});

	});

})(jQuery);


/**
 * ソーシャルボタンカウントの非同期取得
 */

(function($) {

	var sharebar = $('#sharebar'),
		main = $('#main');

	$(window).on("scroll", function() {
		//console.log($('#sidebar').css('clear'));
		//最上部から現在位置までの距離を取得して、変数[now]に格納
		var now = $(window).scrollTop();

		if (!sharebar.size()) {
			return;
		}

		var sharebar_top = sharebar.offset().top,
			sharebar_h = sharebar.outerHeight(),
			main_top = main.offset().top,
			main_h = main.outerHeight(),
			bottom_line = main_h - 400;

		if (now < (main_h - sharebar_h)) {

			if (now > main_top) {
				//sharebar.fadeIn('fast');
				sharebar
					.css({
						position: 'fixed',
						top: 70 + 'px'
					});
			} else {
				sharebar
					.css({
						position: 'absolute',
						top: main_top + 70 + "px"
					});
			}
		} else {
			//sharebar.fadeOut('fast');
			sharebar
				.css({
					position: 'absolute',
					top: main_h - sharebar_h + "px"
				});
		}
		//console.log(sharebar_h);
	});
})(jQuery);

var count;

// カウント値を出力する関数
function outputSelector(selector, count) {
	jQuery(selector).empty().append(count);
}

// Twitterのシェア数を取得
function get_social_count_twitter(url, selector) {
	jQuery.ajax({
		url: '//urls.api.twitter.com/1/urls/count.json',
		dataType: 'jsonp',
		data: {
			url: url
		}
	}).done(function(res) {

		count = res.count || 0;
		outputSelector(selector, count);

	}).fail(function(jqXHR, textStatus, errorThrown) {

		outputSelector(selector, "error");
		console.log("twitter_count_error:", textStatus + " | " + errorThrown.message);

	});
}

//Facebookのシェア数を取得
function get_social_count_facebook(url, selector) {
	jQuery.ajax({
		url: 'https://graph.facebook.com/',
		dataType: 'jsonp',
		data: {
			id: url
		}
	}).done(function(res) {

		count = res.shares || 0;
		outputSelector(selector, count);

	}).fail(function(jqXHR, textStatus, errorThrown) {

		outputSelector(selector, "error");
		console.log("facebook_count_error:", textStatus + " | " + errorThrown.message);

	});
}

//Google＋のシェア数を取得
function get_social_count_googleplus(url, selector) {
	jQuery.ajax({
		type: "get",
		dataType: "xml",
		url: "//query.yahooapis.com/v1/public/yql",
		data: {
			q: "SELECT content FROM data.headers WHERE url='https://plusone.google.com/_/+1/fastbutton?hl=ja&url=" + url + "' and ua='#Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'",
			format: "xml",
			env: "http://datatables.org/alltables.env"
		}
	}).done(function(data) {

		var content = jQuery(data).find("content").text();
		var match = content.match(/window\.__SSR[\s*]=[\s*]{c:[\s*](\d+)/i);
		var count = (match !== null) ? match[1] : 0;

		outputSelector(selector, count);

	}).fail(function(jqXHR, textStatus, errorThrown) {

		outputSelector(selector, "error");
		console.log("google+_count_error:", textStatus + " | " + errorThrown.message);

	});
}

//はてなブックマークではてブ数を取得
function get_social_count_hatebu(url, selector) {
	jQuery.ajax({
		url: '//api.b.st-hatena.com/entry.count?callback=?',
		dataType: 'jsonp',
		data: {
			url: url
		}
	}).done(function(res) {

		count = res || 0;
		outputSelector(selector, count);

	}).fail(function(jqXHR, textStatus, errorThrown) {

		outputSelector(selector, "error");
		console.log("hatena_count_error", textStatus + " | " + errorThrown.message);

	});
}

//ポケットのストック数を取得
function get_social_count_pocket(url, selector) {
	jQuery.ajax({
		type: "get",
		dataType: "xml",
		url: "//query.yahooapis.com/v1/public/yql",
		data: {
			q: "SELECT content FROM data.headers WHERE url='https://widgets.getpocket.com/v1/button?label=pocket&count=vertical&v=1&url=" + url + "' and ua='#Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'",
			format: "xml",
			env: "http://datatables.org/alltables.env"
		}
	}).done(function(data) {

		var content = jQuery(data).find("content").text();
		var match = content.match(/<em id="cnt">(\d+)<\/em>/i);
		var count = (match !== null) ? match[1] : 0;

		outputSelector(selector, count);

	}).fail(function(jqXHR, textStatus, errorThrown) {

		outputSelector(selector, "error");
		console.log("pocket_count_error", textStatus + " | " + errorThrown.message);

	});
}

//feedlyの購読者数を取得
function get_social_count_feedly(rss_url, selector) {
	//console.log('http://cloud.feedly.com/v3/feeds/feed%2F' + encodeURIComponent(rss_url));
	jQuery.ajax({
		type: "get",
		dataType: "json",
		url: "//query.yahooapis.com/v1/public/yql",
		data: {
			q: "SELECT content FROM data.headers WHERE url='//cloud.feedly.com/v3/feeds/feed%2F" + encodeURIComponent(rss_url) + "' and ua='#Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'",
			format: "json",
			env: "http://datatables.org/alltables.env"
		}
	}).done(function(data) {

		count = data.query.results.resources.content.json.subscribers;

		outputSelector(selector, count);

	}).fail(function(jqXHR, textStatus, errorThrown) {

		outputSelector(selector, "error");
		console.log("feedly_count_error", textStatus + " | " + errorThrown.message);

	});
}

// ajax動作元
(function($) {

	//$(function() {
	$(window).on("load", function() {
		/**
		 * social_count_config、lazyload_configは別ファイル(header-javascript.php?)で
		 * wordpressローカル変数(?)になってます
		 */

		if (typeof social_count_config !== 'undefined') {

			get_social_count_twitter(social_count_config.permalink, '.twitter-count');
			get_social_count_facebook(social_count_config.permalink, '.facebook-count');
			get_social_count_googleplus(social_count_config.permalink, '.googleplus-count');
			get_social_count_hatebu(social_count_config.permalink, '.hatebu-count');
			get_social_count_pocket(social_count_config.permalink, '.pocket-count');
			//get_social_count_feedly(social_count_config.rss2_url, '.feedly-count');
		}

		if (typeof lazyload_config !== 'undefined') {

			$('img').lazyload(lazyload_config);

		}

	});

})(jQuery);


/**
 * doMasonry関係
 *
 *   doMasonry()
 *      #listは記事一覧を囲んでる部分
 *     .entryは各記事を囲んでる部分
 *     isAnimated: true -> アニメーションON
 */

(function($) {

	function doMasonry() {
		$('#list').masonry({
			itemSelector: '.entry',
			isAnimated: true
		});
	}

	$(window).on("load", function() {
		if (typeof do_masonry !== 'undefined') {
			doMasonry();
		}
	});

	$(function() {
		if (typeof do_masonry !== 'undefined') {
			doMasonry();
		}
	});

})(jQuery);


/**
 * レスポンス表示時のメニューの挙動
 * メニューのスタイル表示崩れの防止
 */

(function($) {

	$(function() {

		$(window).on("resize", function() {
			if ($(window).width() > 1110) {
				$('#navi-in ul').removeAttr('style');
			}
		});

	});

})(jQuery);


/**
 * Facebookページいいねエリアのリサイズ（Androidブラウザ対応用）
 */

(function($) {

	function adjast_article_like_arrow_box() {
		var w = $('#main').width(),
			ws = $('#sidebar').width();
		$('#main .article-like-arrow-box').css('width', (w - 114) + 'px');
		$('#sidebar .article-like-arrow-box').css('width', (ws - 114) + 'px');
		//console.log(w);
	}

	$(window).on("resize", function() {
		adjast_article_like_arrow_box();
	});

	$(function() {
		adjast_article_like_arrow_box();
	});

})(jQuery);
