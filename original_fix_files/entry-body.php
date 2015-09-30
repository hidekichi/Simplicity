<?php //投稿本文 ?>
<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <div class="article<?php if ( !is_single() ) echo ' article-list'; ?>">

        <?php

            //
            // スクロール追従シェアバー

            if ( is_single() ) get_template_part('sns-buttons-sharebar');

        ?>

        <?php
            if ( !is_single() ){
                //
                // 投稿のタイトル
                //  echo '<a href="'.get_permalink().'">'; //投稿ページ以外ではタイトルにリンクを貼る
                //
                // the_titleでbeforeとafterにてリンク設定
                //
                the_title('<h1 class="entry-title"><a href="' . get_permalink() . '">','</a></h1>');
            } else {
                the_title("<h1 class=entry-title>","</h1>");
            }

            //if ( !is_single() ) echo '</a>'; //投稿ページ以外ではタイトルにリンクを貼る
        ?>
        <p class="post-meta">
            <?php
                get_template_part('datetime'); //投稿日と更新日

                /**
                 * カテゴリを表示する場合 投稿ページの場合
                 */

                if ( is_category_visible() && get_the_category() ):

            ?>
                <span class="category">
                    <span class="fa fa-folder fa-fw"></span><?php the_category(', ') ?>
                </span>

            <?php endif; //is_category_visible?>

            <?php

                /**
                 * コメント数
                 */

                 if ( is_comments_visible() && is_comment_count_visible() ):
                     $comment_count_anchor = ( get_comments_number() > 0 ) ? '#comments' : '#reply-title';

            ?>
                <span class="comments">
                    <span class="fa fa-comment"></span>
                    <span class="comment-count">
                        <a href="<?php echo $comment_count_anchor; ?>" class="comment-count-link"><?php echo get_comments_number(); ?></a>
                    </span>
                </span>

            <?php endif //is_comment_count_visible?>

            <?php
                /**
                 * 編集リンク
                 */

                get_template_part('edit-link');
                wlw_edit_post_link('WLWで編集', '<span class="wlw-edit"><span class="fa fa-pencil-square-o fa-fw"></span>', '</span>');
            ?>

        </p>

        <?php

            if ( is_single() ) get_template_part('ad-top');//記事トップ広告

            // 記事下タイトル下の小さなシェアボタン

            if ( is_single() ) get_template_part('sns-buttons-top');

            //投稿本文上ウイジェット
            if ( is_single() && is_active_sidebar( 'widget-over-article' ) ): ?>

                <div id="widget-over-article" class="widgets">
                    <?php dynamic_sidebar( 'widget-over-article' ); ?>
                </div>

            <?php endif; ?>

        <?php
            /**
             * サムネイルを持っているときの処理
             */

            if ( has_post_thumbnail() && is_eye_catch_visible() ):

        ?>
            <div class="eye-catch">
                <?php the_post_thumbnail('large'); ?>
            </div>

        <?php endif; ?>

        <div id="the-content" class="entry-content">
            <?php
                /**
                 * 記事本文の表示
                 */

                the_content( get_theme_text_read_more() ); //デフォルト：続きを読む
            ?>
        </div>

        <?php
            /**
             * ページリンクのページャー
             */

            if ( is_single() ) get_template_part('pager-page-links');

            //投稿本文下ウイジェット
            if ( is_single() && is_active_sidebar( 'widget-under-article' ) ):

        ?>
                <div id="widget-under-article" class="widgets">
                    <?php dynamic_sidebar( 'widget-under-article' ); ?>
                </div>
            <?php endif; ?>

        <?php

            if ( is_single() ) get_template_part('ad-article-footer');

            //投稿SNSボタン上ウイジェット
            if ( is_single() && is_active_sidebar( 'widget-over-sns-buttons' ) ):

        ?>
                <div id="widget-over-sns-buttons" class="widgets">
                    <?php dynamic_sidebar( 'widget-over-sns-buttons' ); ?>
                </div>

            <?php endif; ?>

                <?php
                    //<div id="sns-group" class="sns-group sns-group-bottom">

                    /**
                     * 記事下はバルーン表示にする(Simplicityデフォルト表示)
                     */
                ?>
                    <div class="sns-group balloon">
        <?php
                if ( is_single() && is_bottom_sns_btns_visible() )

                    // SNSシェアボタンの取得
                    // defalt: sns-buttons
                    // coustom: sns-buttons-balloon
                    get_template_part('sns-buttons-balloon'); //SNSシェアボタンの取得

                //記事下フォローボタン表示のとき SNSフォーローボタンの取得
                if ( is_single() && is_body_bottom_follows_visible() )
                    get_template_part('sns-pages');
        ?>
                </div>

        <?php

            //投稿SNSボタン下ウイジェット
            if ( is_single() && is_active_sidebar( 'widget-under-sns-buttons' ) ):

        ?>
                <div id="widget-under-sns-buttons" class="widgets">
                    <?php dynamic_sidebar( 'widget-under-sns-buttons' ); ?>
                </div>
        <?php endif; ?>

        <p class="footer-post-meta">

        <?php if (is_tag_visible()): ?>
            <span class="post-tag"><?php the_tags('<span class="fa fa-tag fa-fw"></span>',', '); ?></span>
        <?php endif; ?>

        <?php
            get_template_part('author-link'); //投稿者リンク
            get_template_part('edit-link'); //編集リンク
            wlw_edit_post_link('WLWで編集', '<span class="wlw-edit"><span class="fa fa-pencil-square-o fa-fw"></span>', '</span>');
        ?>

        </p>

    </div><!-- .article -->

    <?php
        //本文リストスタイルの時
        if ( is_list_style_bodies() ):

    ?>
        <hr class="sep" />

    <?php endif; ?>

</div><!-- .post -->
