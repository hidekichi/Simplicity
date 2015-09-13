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
			flwAreaTop = followArea.get(0).offsetTop,
			flwAreaBottom = flwAreaTop + flwAreaHeight,
			ftTopMargin = parseInt($(ft).css('margin-top'), 10),
			mBottomMargin = parseInt($("#main").css('margin-bottom'), 10),
			betweenMargin = ftTopMargin + mBottomMargin;

		// 追従エリアの前にdummyブロックを挿入
		$(followArea).before("<div class='dummy'></div>");
		var dummy = $("#sidebar .dummy"),
			dyOffset = dummy.get(0).offsetTop;

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
