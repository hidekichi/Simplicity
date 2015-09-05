/////////////////////////////////
//TOPへ戻るボタン
/////////////////////////////////
jQuery(function($) {
	$(window).scroll(function() {
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
	$('#move-page-top').on('click', function() {
		//ページトップへ移動する
		$('body,html')
			.animate({
				scrollTop: 0
			}, 800);
	});
});

jQuery(function($) {
	/////////////////////////////////
	//スクロール追従
	/////////////////////////////////
	var wrapperTop; //追従エリアのトップ位置を格納（追従開始位置
	var wrapperHeight; //追従エリアの高さを格納
	var sidebarHeight; //サイドバーの高さを格納

	//非同期ブログパーツがあっても追従開始位置がずれないように修正（無理やり）
	//スマートな良い方法があれば、ご教授お願いします。

	/*
	 *	A. 	var target = $(target_selector);
	 *		var changeHeight = target.clientHeight;
	 *		// もしブログパーツがフッターのであれば
	 *		var watchTarget = $("#footer"); //たいていはcontainerなどでやることが多いみたいです
	 *		watchTarget.style.height = changeHeight + "px";
	 */
	function getScrollAreaSettings() {
		wrapperHeight = $('#sidebar-scroll').outerHeight();
		sidebarHeight = $('#sidebar').outerHeight();
		wrapperTop = sidebarHeight - wrapperHeight + 240;
	}
	setInterval(getScrollAreaSettings(), 2000);

	$(function() {
		/*
		Ads Sidewinder
		by Hamachiya2. http://d.hatena.ne.jp/Hamachiya2/20120820/adsense_sidewinder
		*/
		var main = $('#main'); // メインカラムのID
		var side = $('#sidebar'); // サイドバーのID
		var wrapper = $('#sidebar-scroll'); // スクロール追従要素のID
		var side_top_margin = 60;

		if (!wrapper.size()) {
			return;
		}

		//スクロール追従エリアにウイジェットが入っていないときはスルー
		if (side.css('clear') === 'both') {
			return;
		}

		//レスポンシブでサイドバーをページ下に表示しているときはスルー
		if (main.length === 0 || side.length === 0 || wrapper.length === 0) {
			return;
		}

		var w = $(window);
		wrapperHeight = wrapper.outerHeight();
		wrapperTop = wrapper.offset().top; //とりあえずドキュメントを読み込んだ時点でスクロール追従領域の高さを取得
		var sideLeft = side.offset().left;
		//console.log(wrapperTop);

		var sideMargin = {
			top: side.css('margin-top') ? side.css('margin-top') : 0,
			right: side.css('margin-right') ? side.css('margin-right') : 0,
			bottom: side.css('margin-bottom') ? side.css('margin-bottom') : 0,
			left: side.css('margin-left') ? side.css('margin-left') : 0
		};

		var winLeft,
			pos;

		var scrollAdjust = function() {
			/*
			 *	Q. sideHeight,mainHeight,mainAbs ってグローバル変数?
			 *	   ファンクションの中ですし、ローカル変数かなとは思うんですが、ここらで若干
			 *	   warningが出ています。
			 */
			sideHeight = side.outerHeight();
			mainHeight = main.outerHeight();
			mainAbs = main.offset().top + mainHeight;
			var winTop = w.scrollTop() + side_top_margin;
			winLeft = w.scrollLeft();
			var winHeight = w.height();

			var nf = (winTop > wrapperTop) && (mainHeight > sideHeight) ? true : false;

			pos = !nf ? 'static' : (winTop + wrapperHeight) > mainAbs ? 'absolute' : 'fixed';

			if (pos === 'fixed') {
				side
					.css({
						position: pos,
						top: '',
						bottom: winHeight - wrapperHeight,
						left: sideLeft - winLeft,
						margin: 0,
						marginBottom: '-' + side_top_margin + 'px'
					});

			} else if (pos === 'absolute') {
				side
					.css({
						position: pos,
						top: mainAbs - sideHeight,
						bottom: '',
						left: sideLeft,
						margin: 0,
						marginBottom: '-' + side_top_margin + 'px'
					});

			} else {
				side
					.css({
						position: pos,
						marginTop: sideMargin.top,
						marginRight: sideMargin.right,
						marginBottom: sideMargin.bottom,
						marginLeft: sideMargin.left
					});
			}
		};

		var resizeAdjust = function() {
			side
				.css({
					position: 'static',
					marginTop: sideMargin.top,
					marginRight: sideMargin.right,
					marginBottom: sideMargin.bottom,
					marginLeft: sideMargin.left
				});

			sideLeft = side.offset().left;
			winLeft = w.scrollLeft();

			if (pos === 'fixed') {
				side
					.css({
						position: pos,
						left: sideLeft - winLeft,
						margin: 0,
						marginBottom: '-' + side_top_margin + 'px'
					});

			} else if (pos === 'absolute') {
				side
					.css({
						position: pos,
						left: sideLeft,
						margin: 0,
						marginBottom: '-' + side_top_margin + 'px'
					});
			}
		};

		w.on('load scroll', scrollAdjust);
		w.on('resize', resizeAdjust);
	});

});
/////////////////////////////////
// メニューボタンの開閉
/////////////////////////////////
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

jQuery(function($) {
	$(function() {
		var click = ('ontouchstart' in document) ? 'touchstart' : 'click';
		$("#mobile-menu-toggle").on(click, function() {
			var header_menu = $("#navi ul");
			if (header_menu.is(":hidden")) {
				header_menu.slideDown();
			} else {
				header_menu.slideUp();
			}
		});
	});
});

///////////////////////////////////
// ソーシャルボタンカウントの非同期取得
///////////////////////////////////
jQuery(function($) {
	var sharebar = $('#sharebar'),
		main = $('#main');
	$(window).scroll(function() {
		//console.log($('#sidebar').css('clear'));
		//最上部から現在位置までの距離を取得して、変数[now]に格納
		var now = $(window).scrollTop();

		if (!sharebar.size()) {
			return;
		}

		var sharebar_top = sharebar.offset().top,
			sharebar_h = sharebar.outerHeight(),
			main_top = main.offset().top,
			main_h = main.outerHeight();

		var bottom_line = main_h - 400;

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
});

var count;

function outputSelector(selector, count) {
	jQuery(selector).text(count);
}

// Twitterのシェア数を取得
function get_social_count_twitter(url, selector) {
	jQuery.ajax({
		url: '//urls.api.twitter.com/1/urls/count.json',
		dataType: 'jsonp',
		data: {
			url: url
		},
		success: function(res) {
			count = res.count || 0;
			outputSelector(selector, count);
		},
		error: function() {
			outputSelector(selector, 0);
		}
	});
}

//Facebookのシェア数を取得
function get_social_count_facebook(url, selector) {
	jQuery.ajax({
		url: 'https://graph.facebook.com/',
		dataType: 'jsonp',
		data: {
			id: url
		},
		success: function(res) {
			count = res.shares || 0;
			outputSelector(selector, 0);
		},
		error: function() {
			outputSelector(selector, 0);
		}
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
		},
		success: function(data) {
			var content = jQuery(data).find("content").text();
			var match = content.match(/window\.__SSR[\s*]=[\s*]{c:[\s*](\d+)/i);
			var count = (match !== null) ? match[1] : 0;

			outputSelector(selector, count);
		}
	});
}

//はてなブックマークではてブ勝を取得
function get_social_count_hatebu(url, selector) {
	jQuery.ajax({
		url: '//api.b.st-hatena.com/entry.count?callback=?',
		dataType: 'jsonp',
		data: {
			url: url
		},
		success: function(res) {
			count = res || 0;
			outputSelector(selector, count);
		},
		error: function() {
			outputSelector(selector, 0);
		}
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
		},
		success: function(data) {
			var content = jQuery(data).find("content").text();
			var match = content.match(/<em id="cnt">(\d+)<\/em>/i);
			var count = (match !== null) ? match[1] : 0;

			outputSelector(selector, 0);
		}
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
		},
		success: function(data) {
			//console.log(data);
			count = data.query.results.resources.content.json.subscribers;

			outputSelector(selector, count);
		}
	});
}


jQuery(function($) {
	$(function() {
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
});

jQuery(function($) {
	function doMasonry() {
		$('#list').masonry({ //<!-- #listは記事一覧を囲んでる部分 -->
			itemSelector: '.entry', //<!--.entryは各記事を囲んでる部分-->
			isAnimated: true //<!--アニメーションON-->
		});
	}

	$(window).load(function() {
		if (typeof do_masonry !== 'undefined') {
			doMasonry();
		}
	});
	$(function() {
		if (typeof do_masonry !== 'undefined') {
			doMasonry();
		}
	});
});
///////////////////////////////////
// レスポンス表示時のメニューの挙動
// メニューのスタイル表示崩れの防止
///////////////////////////////////

jQuery(function($) {
	$(function() {
		$(window).resize(function() {
			if ($(window).width() > 1110) {
				$('#navi-in ul').removeAttr('style');
			}
		});
	});
});

///////////////////////////////////
// Facebookページいいねエリアのリサイズ（Androidブラウザ対応用）
///////////////////////////////////
jQuery(function($) {
	function adjast_article_like_arrow_box() {
		var w = $('#main').width(),
			ws = $('#sidebar').width();
		$('#main .article-like-arrow-box').css('width', (w - 114) + 'px');
		$('#sidebar .article-like-arrow-box').css('width', (ws - 114) + 'px');
		//console.log(w);
	}

	$(window).resize(function() {
		adjast_article_like_arrow_box();
	});

	$(document).ready(function() {
		adjast_article_like_arrow_box();
	});
});
