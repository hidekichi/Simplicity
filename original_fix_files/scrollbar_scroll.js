(function($){
	/**
	 *
	 * follow scrool widget, wordpress theme Simplicity専用
	 * ※ 使用時には助長なコメントは削除して下さい。説明用です。
	 *
	 * 2015/09/09 23:18 今現在までにわかっている問題をすべて修正完了
	 * 2015/09/09 new
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

			//
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

					//
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
									width: sidebarWidth,
									top: offsetCheck(ft) - ( heightCheck(followArea) + betweenMargin)
								});

							} else {

								/**
								 * footerに追従エリアが到達し、追従エリアの高さを超えるということは
								 * 画面上辺に追従エリアが達したと言うことなのでfixedにしてtop:0になってます
								 */

								followArea.css({
									position:"fixed",
									width: sidebarWidth,
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

							followArea.removeAttr("style");
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
