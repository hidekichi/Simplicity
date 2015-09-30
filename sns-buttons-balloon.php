<?php
	/**
	 * SNSシェアボタン用テンプレート、シェアボタンが表示されるときは全てこのテンプレートが呼び出されます
	 */

	if ( is_all_sns_share_btns_visible() ):
		global $g_is_small;
?>

	<?php
		//シェアボタン用のメッセージを取得
		if ( get_share_msg() ):
	?>
	<p><?php echo esc_html( get_share_msg() ) ?></p>

	<?php endif; ?>

	<ul>

	<?php
		/**
		 * Twitterボタンを表示するか
		 */
		if ( is_twitter_btn_visible() ):
	?>

		<li class="twitter">
			<a
	            href    = "//twitter.com/share?text=<?php echo urlencode( get_the_title() ); ?>&amp;url=<?php echo urlencode( get_the_permalink() ); ?><?php echo get_twitter_via_param(); //ツイートにTwitter ID ?><?php echo get_twitter_related_param();//ツイート後にフォローを促す ?>"
	            target  = "blank"
	            rel     = "nofollow">
				<span class="icon">
					<span class="icon-twitter"></span>
				</span>
			</a>
			<a
	            href    = "//twitter.com/search?q=<?php echo urlencode( punycode_encode( get_permalink() ) ); ?>"
	            target  = "_blank"
	            rel     = "nofollow">
				<span class="social-count">
					<span class="fa fa-spinner fa-pulse"></span>
				</span>
			</a>
		</li>

	<?php endif; ?>

	<?php
		/**
		 * Facebookボタンを表示するか
		 */
		if ( is_facebook_btn_visible() ):
	?>
		<li class="facebook">
			<a
				href    = "//www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>&amp;t=<?php echo urlencode( get_the_title() ); ?>"
				target  = "_blank"
				rel     = "nofollow">
				<span class="icon">
					<span class="icon-facebook"></span>
				</span>
			</a>
			<a
				href    = "//www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>&amp;t=<?php the_title(); ?>"
				target  = "_blank"
				rel     = "nofollow">
				<span class="social-count">
					<span class="fa fa-spinner fa-pulse"></span>
				</span>
			</a>
		</li>

	<?php endif;?>

	<?php
		/**
		 * Google＋ボタンを表示するか
		 */
		if ( is_google_plus_btn_visible() ):
	?>
		<li class="googleplus">
			<a
				href        = "//plus.google.com/share?url=<?php echo rawurlencode(get_permalink($post->ID)); ?>"
				onclick     = "javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"
				target      = "blank"
				rel         = "nofollow">
				<span class="icon">
					<span class="icon-googleplus"></span>
				</span>
			</a>
			<a
	            href        = "//plus.google.com/share?url=<?php echo rawurlencode(get_permalink($post->ID)); ?>"
	            onclick     = "javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"
	            target      = "_blank"
	            rel         = "nofollow">
				<span class="social-count">
					<span class="fa fa-spinner fa-pulse"></span>
				</span>
			</a>
		</li>

	<?php endif;?>

	<?php
		/**
		 * はてなボタンを表示するか
		 */
		if ( is_hatena_btn_visible() ):
	?>

		<li class="hatena">
			<a
	            href    = "//b.hatena.ne.jp/add?mode=confirm&amp;url=<?php the_permalink(); ?>&amp;title=<?php echo get_encoded_title( trim( wp_title( '', false) ) ); ?>"
	            target  = "blank"
	            rel     = "nofollow">
				<span class="icon">
					<span class="icon-hatena"></span>
				</span>
			</a>
			<a
	            href    = "<?php echo get_hatebu_url(get_permalink()); ?>"
	            target  = "blank"
	            rel     = "nofollow">
				<span class="social-count">
					<span class="fa fa-spinner fa-pulse"></span>
				</span>
			</a>
		</li>

	<?php endif; ?>

	<?php
		/**
		 * pocketボタンを表示するか
		 */
		if ( is_pocket_btn_visible() ):
	?>

		<li class="pocket">
			<a
	            href    = "//getpocket.com/edit?url=<?php the_permalink(); ?>"
	            target  = "blank"
	            rel     = "nofollow">
				<span class="icon">
					<span class="icon-pocket"></span>
				</span>
			</a>
			<a
	            href    = "//getpocket.com/edit?url=<?php the_permalink(); ?>"
	            target  = "_blank"
	            rel     = "nofollow">
				<?php /*<span class="social-count pocket-count">*/ ?>
				<span class="social-count">
					<span class="fa fa-spinner fa-pulse"></span>
				</span>
			</a>
		</li>

	<?php endif; ?>

	<?php
		/**
		 * LINEボタンを表示するか
		 */
		if ( is_line_btn_visible() && is_mobile()):
	?>

		<li class="line">
			<a
	            href    = "//line.me/R/msg/text/?<?php the_title(); ?>%0D%0A<?php the_permalink(); ?>"
	            target  = "_blank"
	            rel     = "nofollow">
				<span class="icon">
					<span class="icon-line"></span>
				</span>
			</a>
			<a
	            href    = "//line.me/R/msg/text/?<?php the_title(); ?>%0D%0A<?php the_permalink(); ?>"
	            target  = "blank"
	            rel     = "nofollow">
				<span class="social-count">LINE!</span>
			</a>
		</li>

	<?php endif; ?>

	<?php
		/**
		 * Evernoteボタンを表示するか
		 */
		if ( is_evernote_btn_visible() ):
	?>

		<li class="evernote">
			<a
				href 	="#"
				onclick	="Evernote.doClip({url:'<?php the_permalink();?>',
				  providerName:'<?php bloginfo('name'); ?>',
				  title:'<?php the_title();?>',
				  contentId:'the-content',
				}); return false;"
				target 	="blank"
				rel 	="nofollow">
				<span class="icon">
					<span class="icon-evernote"></span>
				</span>
			</a>
			<a
				href 	= "#"
				onclick = "Evernote.doClip({url:'<?php the_permalink();?>',
						providerName:'<?php bloginfo('name'); ?>',
						title:'<?php the_title();?>',
						contentId:'the-content',
					}); return false;"
				target ="blank"
				rel 	="nofollow">
				<span class="social-count">CLIP!</span>
			</a>
		</li>

	<?php endif; ?>

	<?php
		/**
		 * feedlyボタンを表示するか
		 */
		if ( is_feedly_btn_visible() ):
	?>

		<li class="feedly">
			<a
	            href    = "//feedly.com/index.html#subscription%2Ffeed%2F<?php urlencode(bloginfo('rss2_url')); ?>"
	            target  = "blank"
	            rel     = "nofollow">
				<span class="icon">
					<span class="icon-feedly"></span>
				</span>
			</a>
			<a
	            href    = "//feedly.com/index.html#subscription%2Ffeed%2F<?php urlencode(bloginfo('rss2_url')); ?>"
	            target  = "blank"
	            rel     = "nofollow">
				<span class="social-count">
					<span class="fa fa-spinner fa-pulse"></span>
					<?php //echo get_feedly_count(); ?>
				</span>
			</a>
		</li>

	<?php endif; //is_feedly_btn_visible?>

  <?php get_template_part('sns-button-comments'); ?>

</ul>
<?php endif; ?>
