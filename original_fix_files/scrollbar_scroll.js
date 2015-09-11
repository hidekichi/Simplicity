(function($) {
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
	function offsetCheck(tgt) {
		return tgt.get(0).offsetTop;
	}

	// heightを調べる関数
	function heightCheck(tgt) {
		return tgt.height();
	}

	/**
	 * parseColor rgb(255,255,255)のような値から16進数の色を返します
	 * @param  {string} rgb [rgb(r,g,b)]
	 * @return {array}    [rgb(255,255,255)→(Array)["ff","ff","ff"]]
	 */
	function parseColor(rgb) {
		var bgColor = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),
			color = [];
		bgColor.splice(0, 1);

		for (var i in bgColor) {
			bgColor[i] = parseInt(bgColor[i]).toString(16);
			if (bgColor[i].length === 1) {
				bgColor[i] = "0" + bgColor[i];
			}
		}
		//console.log("color: ", bgColor);

		return bgColor;

	}

	/**
	 * 入力された色より明度を調査して薄い色の場合は#333を濃い色の場合は#fffを返す関数
	 *     背景色によっては読みにくくなる場合もある
	 * @param  {array} rgb [(Array)[r,b,g] の形式で16進数 → ["ff","ff","ff"] ]
	 * @return {string}     [description]
	 *
	 * http://qiita.com/fnobi/items/d3464ba0e4b6596863cb
	 */
	function colorBright(rgb) {

		if (rgb.length > 0) {
			//補正値
			var mod = {
				r: 0.9,
				g: 0.8,
				b: 0.4
			};
			var rmod = mod.r || 1,
				gmod = mod.g || 1,
				bmod = mod.b || 1,
				bright = Math.max(rgb[0] * rmod, rgb[1] * gmod, rgb[2] * bmod) / 255;

			if (bright > 0.5) {
				return "#333";
			} else {
				return "#fff";
			}
		} else {
			return false;
		}
	}

	/**
	 * [bgColorCheck sidebarの背景に色が付いていた場合の処理をする関数]
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
			isBgcolor = (sidebar.css("background-color") !== "transparent") ? true : false,
			isFontcolor333 = (sidebar.find("h4").css("color") === "#333") ? true : false;

		// サイドバー・追従エリアの文字色チェック
		// .custom-backgroundが存在して、サイドバーのbackground-colorに色が着いていない場合に
		// サイドバーのinputとa以外の文字にcolorBright()で判断した色を付ける
		if ($(".custom-background").length > 0 && !isBgcolor) {
			checkColor = parseColor($(".custom-background").css("background-color"));
			fontColor = colorBright(checkColor);

			tgt.css("color", fontColor);
			sidebar.find("*:not('a, input')").css("color", fontColor);
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

				$(window).on("load scroll", function() {

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
