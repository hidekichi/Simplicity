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
	 * ※ 使用時には助長なコメントは削除して下さい。説明用です。
	 *
	 * 2015/09/13 不要な変数等削除、for文をより速く動かすために型もどき追加 リサイズ対応
	 * 2015/09/12 色チェックの精度向上
	 * 2015/09/09 23:18 今現在までにわかっている問題をすべて修正完了
	 * 2015/09/09 new
	 *
	 */

	// オフセットを調べる関数
	function offsetCheck(tgt) {
		return tgt.get(0).offsetTop;
	}

	// heightを調べる関数
	function heightCheck(tgt) {
		return tgt.height();
	}

	/**
	 * 入力された色から、その色の明るさを調べて白か黒を返します。本来は白黒で判別するほうが確実性が上がる
	 * Simplicityの場合はデフォルトで#333なので敢えて#333で調査
	 *
	 * @param  {string} rgb [rgb(r,g,b) or rgba(r,g,b,a)]
	 * @return {string}    [#333333 or #ffffff]
	 */
	function parseColor(rgb) {
		var bgColor = rgb.match(/\d+/g),
			lightColor = [255, 255, 255],
			darkColor = [51, 51, 51],
			lightColorBrightness = colorBright(lightColor),
			darkColorBrightness = colorBright(darkColor);

		var bg = colorBright(bgColor);
		var deltaL = Math.abs(bg - lightColorBrightness);
		var deltaD = Math.abs(bg - darkColorBrightness);
		return (deltaL > deltaD) ? "#" + colorToHex(lightColor).join("") : "#" + colorToHex(darkColor).join("");
	}

	/**
	 * [255,255,255]のような色の配列を["ff","ff","ff"]と言うような16進数で返します
	 * @param  {array} color [(color Array)[dec,dec,dec] min:0, max:255]
	 * @return {array}       [(color Array)[hex,hex,hex] min:00, max:FF]
	 */
	function colorToHex(color) {
		for (var i = 0; i < 3 | 0; i = i + 1 | 0) {
			color[i] = parseInt(color[i]).toString(16);
			if (color[i].length > 0) {
				color[i] = "0" + color[i];
			}
		}
		return color;
	}

	/**
	 * 入力された色より明度を調査する関数、背景色によっては読みにくくなる場合もある
	 * @param  {array} rgb [(Array)[r,b,g] の形式でrgbはint min:0, max:255 ]
	 * @return {string}     [0〜255]
	 *
	 * http://qiita.com/k_ui/items/f8c4077dafa1a41626c6
	 */
	function colorBright(rgb) {
		return ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;
	}

	/**
	 * sidebarの背景に色が付いていた場合の処理をする関数
	 * カスタマイザーで背景白の設定ON、ユーザーが任意にサイドバーの色を設定している場合はカラーチェックfalse
	 *
	 * @param  {jQueryObject} tgt [基本追従エリアのセレクタが入ります]
	 * @return {none}     [関数で出力するため返り値なし]
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
		var checkColor, fontColor,
			isBgcolor = (sidebar.css("background-color") !== "transparent") ? true : false;

		// サイドバー・追従エリアの文字色チェック
		// .custom-backgroundが存在して、サイドバーのbackground-colorに色が着いていない場合に
		// サイドバーのinputとa以外の文字にcolorBright()で判断した色を付ける
		if ($(".custom-background").length > 0 && !isBgcolor) {
			checkColor = parseColor($(".custom-background").css("background-color"));

			tgt.css("color", checkColor);
			sidebar.find("*:not('a, input')").css("color", checkColor);
		}

		if (isBgcolor) {

			tgt
				.addClass('following whiteBG')
				.css({
					"width": sidebar.outerWidth(),
					"left": sidebar.offset().left
				});

		} else {

			tgt.css({
				"width": sidebar.outerWidth(),
				"left": sidebar.offset().left
			});

		}
	}

	$(function() {

		//setting
		var mainHeight = $("#main").height(),
			sidebarWidth = $("#sidebar").width(),
			ft = $("#footer"),
			ftTop = ft.get(0).offsetTop,
			followArea = $("#sidebar-scroll"),
			flwAreaHeight = followArea.outerHeight(),
			flwAreaTop = ( followArea.length > 0 ) ? followArea.get(0).offsetTop : 0,
			flwAreaBottom = flwAreaTop + flwAreaHeight,
			ftTopMargin = parseInt($(ft).css('margin-top'), 10),
			mBottomMargin = parseInt($("#main").css('margin-bottom'), 10),
			betweenMargin = ftTopMargin + mBottomMargin;

		// 追従エリアの前にdummyブロックを挿入
		if ( flwAreaTop > 0 ){
			$(followArea).before("<div class='dummy'></div>");
			var dummy = $("#sidebar .dummy"),
				dyOffset = dummy.get(0).offsetTop;
		}

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

		if (window.innerWidth > 1050) {

			if (timer !== false) {
				clearTimeout(timer);
			}

			timer = setTimeout(function() {

				$(window).on("load scroll resize", function() {

					/**
					 * sidebarの背景色をチェックする関数
					 * @param  {jQueryObject} followArea [追従エリアに対して出力しますがsidebarをチェックします]
					 * @return {none}           [関数にて直接出力。返り値なし]
					 */
					bgColorCheck(followArea);

					// dummyのオフセットを調べてそれが変更されたら追従エリアの座標(top)に代入
					//
					if (dyOffset !== offsetCheck(dummy)) {
						dyOffset = offsetCheck(dummy);
						flwAreaTop = dyOffset;
					}

					var st = $(window).scrollTop();

					if (mainHeight > flwAreaBottom) {

						// scrollTopが追従エリアのoffsetTopを超えた時
						if (st > dyOffset) {

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

							if (st > offsetCheck(ft) - (heightCheck(followArea) + betweenMargin)) {

								followArea.css({
									position: "absolute",
									top: offsetCheck(ft) - (heightCheck(followArea) + betweenMargin)
								});

							} else {

								/**
								 * footerに追従エリアが到達し、追従エリアの高さを超えるということは
								 * 画面上辺に追従エリアが達したと言うことなのでfixedにしてtop:0になってます
								 */

								followArea.css({
									position: "fixed",
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

			}, 100); //settimeoutの時間 1000 = 1秒
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
