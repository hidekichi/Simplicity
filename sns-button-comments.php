<?php
	if ( is_comments_btn_visible() && is_single() )://コメントボタンを表示するか

	//コメントがある場合は、コメント一覧に、ない場合はコメント投稿欄に飛ばすためのアンカー
	$comment_count_anchor = ( get_comments_number() > 0 ) ? '#comments' : '#reply-title';
?>
<?php /*<li class="balloon-btn comments-balloon-btn">*/ ?>
<li class="comments">
	<?php /*<span class="balloon-btn-set">*/ ?>
		<a href="#reply-title" rel="nofollow">
			<span class="icon">
				<span class="fa fa-comment"></span>
			</span>
		</a>
		<?php /*<span class="arrow-box">*/ ?>
		<a href="<?php echo $comment_count_anchor; ?>" rel="nofollow">
			<span class="social-count comments-count"><?php echo get_comments_number(); ?></span>
		</a>
		<?php /*</span>*/ ?>
	<?php /*</span>*/?>
</li>
<?php endif; //is_comments_btn_visible?>