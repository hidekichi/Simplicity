//ここに追加したいJavaScript、jQueryを記入してください。
//このJavaScriptファイルは、親テーマのJavaScriptファイルのあとに呼び出されます。
//JavaScriptやjQueryで親テーマのjavascript.jsに加えて関数を記入したい時に使用します。

(function($){
	$(function(){
		$(".entry-card .entry-thumb img").each(function(){
			var imgSrc = $(this).attr("src");
			$(this).css({
				"background-image": "url("+imgSrc+")"
			});
		});
	});
})(jQuery);

(function ($) {
	$.fn.cutString = function (options) {
		var defaults = {
			length: 20,
			ellipsisText: "..."
		};
		var options = $.extend(defaults, options);
		return this.each(function () {
		   var obj = $(this);
			var str = $.trim(obj.html()),
				strLen = str.length,
				optLen = options.length,
				len = 0;
			function cut() {
				for (var i = 0; i < strLen; i++) {
					len += (str.charCodeAt(i) > 128) ? 2 : 1;
					if (len > optLen) return str.substring(0,i) + options.ellipsisText;
				}
				return str;
			}
			obj.html(cut());
		});
	};
})(jQuery);
(function($){
$(function(){
	$(".entry .post-meta").append("<div class='test' />");
	$(".entry").each(function(){
		var url = $(this).find("h2 a").attr("href");
		get_social_count_twitter(url, ".test");
		//console.log("e: ", get_social_count_twitter(url, ".test"));
	});


//    $(".entry h2 a").each(function(){
//       $(this).cutString({length: 40});
//    });
//    $(".entry .entry-snippet").each(function(){
//        $(this).cutString({length:62});
//    });

	/* 要素のリサイズ検知 */


/* 外部リンクのアイコンを付ける *//*
	var noUseSelector = "#sns-group li>a, .blog-card a";
	$(".article a[target='_blank']").not(noUseSelector).append("<i class='fa fa-external-link-square' style='margin-left:2px;'></i>");


	if ($(window).width() > 1150){

		//htmlを作る部分
		var imgcloud = "<div class='cloud'></div>";
		$("#main").before(imgcloud);
		$("#main").addClass("front");
		$("#main").after("<div id='main2'><h3>チラ裏へようこそ</h3></div>");
		$("#main2").addClass("back");

		var main = $("#main");
		$("#main").clone().attr("id", "#main2").after("#main");	//mainをcloneしてidを変えてからmainの下に配置

		//main2のサイズをmainと同じにする
		$("#main2").css({
			padding: 20 + "px " + 29 + "px",
			"border-radius": 4 + "px",
			border : 1 + "px solid #ddd"
		});

		$("#comment-area").clone().appendTo("#main2");
		$("#main,#main2").wrapAll("<div id='flip'></div>");

		var cloud = $("#body-in").find(".cloud"); //クラウドさんを変数にしておく

		//windowがロードされたら
		$(window).on("load", function(){
			var inEleHeight = main.get(0).clientHeight + 59; //59はフッター上の本来のマージン
			setTimeout(function(){
				var inEleHeight2 = main.get(0).clientHeight + 59;
				if (inEleHeight != inEleHeight2){
					inEleHeight = inEleHeight2;
				}
			},1000);

			var inSideHeight = $("#sidebar").get(0).clientHeight;
			if (inEleHeight > inSideHeight){
				$("#body-in").css({ height : inEleHeight });
			} else {
				$("#body-in").css({ height : inSideHeight });
			}


		//cloudをスクロールに追従させる
			var offset = cloud.offset();
			var limit = document.body.clientHeight - $("#footer").height();
		//var limit = inEleHeight - 74; //74はクラウドのサイズ
			var timer = null;
			$(window).scroll(function() {
				var wst = $(window).scrollTop();
				var imgCenter = offset.top + wst;
					if (limit < wst){
						return false;
					}

				clearTimeout( timer );
				timer = setTimeout(function() {

					//console.log("wst: ", wst);
					console.log("cloud: ", cloud.offset().top);
					console.log("document: ", $(document).scrollTop());
					if ( wst > offset.top) {
						$(".cloud").stop().animate(
							{ "margin-top": imgCenter },{queue :false, duration:'slow'});
					} else {
						$(".cloud").stop().animate(
							{ "margin-top" : 0 }, {queue :false, duration:'slow'});
					};
				}, 300 );
			});

		});


		//最初の位置をcloudの位置と#main.topを同じにする

		var mainOset = $("#main").offset().top;
		cloud.css({
			top: mainOset
		});

		var originalPoint = null;

		//画像をクリックした時の処理
		$(cloud).on("click",function (e) {
			e.preventDefault();

			//クリックされたら画像反転
			cloud.addClass("refrect");

			//フリップclassがあったらすでに背面を開いてる
			if (cloud.hasClass("fliped")){
				cloud.removeClass("refrect"); //画面反転を解除

				//divを元に戻す処理
				$(".front").css({
				  "transform": "rotateY(" + 0 + "deg)"
				});
				$(".back").css({
				  "transform": "rotateY(" + 180 + "deg)"
				});
				//戻し終わったら識別クラスを取り除く
				cloud.removeClass("fliped");

				if (originalPoint != null){
					setTimeout(function(){
						$("body,html").animate({ scrollTop: originalPoint }, 800);
					},1000);
				}
			} else {
				$(".front").css({
				  "transform": "rotateY(" + -180 + "deg)"
				});
				$(".back").css({
				  "transform": "rotateY(" + 0 + "deg)"
				});

				cloud.addClass("fliped"); //classにfliped追加

				//main2のcomment-areaの位置が現在のクラウドさんより上の場合はスクロールでコメント欄まで
				var commentOffset = $('#main2').find("#comment-area").offset();
				if (commentOffset.top < cloud.offset().top){
					//originalPoint = cloud.offset().top;
					originalPoint = $(document).scrollTop();
					setTimeout(function(){
						$("body,html").animate({ scrollTop: commentOffset.top }, 800);
					},1000);
				}
			}
		});
	*/




//追従topへ戻るボタンぶぶん
	/*
		$("#page-top").remove().clone().prependTo("#body-in");
		$("#page-top").removeAttr().css({
			"position" : "relative",
			"margin-left" : 735 + "px",
			"width" : 42 + "px",
			"height" : 50 + "px",
			"z-index" : 10
		});

		var initial_offset = $('#page-top').offset().top;
		$(window).scroll(function() {
			var offset = initial_offset + $(document).scrollTop() + 150;
			$(window).scrollTop() > 600 ? $("#page-top").fadeIn() : $('#page-top').css({"display":"none"});

			$('#page-top').animate({ top: offset }, { duration: 'slow', queue: false });
		});
	} else {
		jQuery(window).scroll(function(){
		//最上部から現在位置までの距離を取得して、変数[now]に格納
		var now = jQuery(window).scrollTop();

			//最上部から現在位置までの距離(now)が600以上
			if(now > 600){
			  //[#page-top]をゆっくりフェードインする
			  jQuery('#page-top').fadeIn('slow');
			  //それ以外だったらフェードアウトする
			}else{
			  jQuery('#page-top').fadeOut('slow');
			}
		//console.log(wrapperTop);
		});

		//ボタン(id:move-page-top)のクリックイベント
		jQuery('#move-page-top').click(function(){
			//ページトップへ移動する
			jQuery("body,html").animate({
				  scrollTop: 0
			  }, 800);
		});

	}
	$("#move-page-top").on("click",function(){
		jQuery('body,html').animate( { scrollTop : 0 }, 800 );
	});
	}
	*/
});
})(jQuery);


