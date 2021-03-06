<?php
/**
* コメントボタンを表示するか
*/

if ( is_comments_btn_visible() && is_single() ):

	//コメントがある場合は、コメント一覧に、ない場合はコメント投稿欄に飛ばすためのアンカー
	$comment_count_anchor = ( get_comments_number() > 0 ) ? '#comments' : '#reply-title';

?>
	<li class="comment">
		<a href="#reply-title" rel="nofollow">
			<span class="icon">
				<span class="fa fa-comment"></span>
			</span>
		</a>
		<a href="<?php echo $comment_count_anchor; ?>" rel="nofollow">
			<span class="social-count"><?php echo get_comments_number(); ?></span>
		</a>

	</li>

<?php endif; //is_comments_btn_visible?>
