<?php
    /**
     *	SNSシェアボタン用テンプレート、シェアボタンが表示されるときは全てこのテンプレートが呼び出されます
     */

?>
<?php
    if ( is_all_sns_share_btns_visible() ):
        global $g_is_small;
?>
    <div class="sns-buttons">
        <?php
            /**
             * シェアボタン用のメッセージを取得
             */
            if ( get_share_msg() ):
        ?>
            <p><?php echo esc_html( get_share_msg() ) ?></p>

        <?php endif; ?>

        <ul class="snsb clearfix">

            <?php
                /**
                 * Twitterボタンを表示するか
                 */
                if ( is_twitter_btn_visible() ):
            ?>
                    <li class="twitter-btn">
                        <a
                            href        = "https://twitter.com/share"
                            class       = "twitter-share-button"
                            data-via    = ""
                            data-url    = "<?php the_permalink(); ?>"
                            data-text   = "<?php the_title(); ?>"
                            data-count  = "<?php echo ($g_is_small ? 'horizontal' : 'vertical') ?>">Tweet
                        </a>
                        <script type="text/javascript" src="//platform.twitter.com/widgets.js"></script>
                    </li>

                <?php endif; ?>

            <?php
                /**
                 * Facebookボタンを表示するか
                 */
                if ( is_facebook_btn_visible() ):
            ?>
                    <li class="facebook-btn">
                        <div id="fb-root"></div>
                        <div
                            class="fb-like"
                            data-href="<?php the_permalink(); ?>"
                            data-layout="<?php echo ($g_is_small ? 'button_count' : 'box_count') ?>"
                            data-action="like"
                            data-show-faces="false"
                            data-share="false">
                        </div>
                    </li>
                    <script>
                        (function(d, s, id) {
                            var js, fjs = d.getElementsByTagName(s)[0];
                            if (d.getElementById(id)) return;
                            js = d.createElement(s); js.id = id;
                            js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.0";
                            fjs.parentNode.insertBefore(js, fjs);
                        }(document, 'script', 'facebook-jssdk'));
                    </script>
                <?php endif; //独自シェアボタン終了?>

    <?php endif; //Facebook  <------ need? ?>

    <?php
        /**
         * Google＋ボタンを表示するか
         */
        if ( is_google_plus_btn_visible() ):
    ?>

            <li class="google-plus-btn">
                <script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>
                <div class="g-plusone"<?php echo ($g_is_small ? '' : ' data-size="tall"') ?> data-href="<?php the_permalink(); ?>"></div>
            </li>

        <?php endif;?>

    <?php
        /**
         * はてなボタンを表示するか
         */
        if ( is_hatena_btn_visible() ):
    ?>
            <li class="hatena-btn">
                <a
                    href="http://b.hatena.ne.jp/entry/<?php the_permalink(); ?>"
                    class="hatena-bookmark-button"
                    data-hatena-bookmark-title="<?php the_title(); ?>｜<?php bloginfo('name'); ?>"
                    data-hatena-bookmark-layout="<?php echo ($g_is_small ? 'standard' : 'vertical-balloon') ?>"
                    title="このエントリーをはてなブックマークに追加">
                    <img
                        src="http://b.st-hatena.com/images/entry-button/button-only.gif"
                        alt="このエントリーをはてなブックマークに追加"
                        width="20" height="20"
                        style="border: none;" />
                </a>
                <script type="text/javascript" src="http://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>
            </li>

        <?php endif; ?>

    <?php
        /**
         * pocketボタンを表示するか
         */
        if ( is_pocket_btn_visible() ):
     ?>
            <li class="pocket-btn">
                <a
                    data-pocket-label="pocket"
                    data-pocket-count="<?php echo ($g_is_small ? 'horizontal' : 'vertical') ?>"
                    class="pocket-btn"
                    data-lang="en">
                </a>
                <script type="text/javascript">!function(d,i){if(!d.getElementById(i)){var j=d.createElement("script");j.id=i;j.src="https://widgets.getpocket.com/v1/j/btn.js?v=1";var w=d.getElementById(i);d.body.appendChild(j);}}(document,"pocket-btn-js");</script>
            </li>

        <?php endif; ?>

    <?php
        /**
         * Evernoteボタンを表示するか
         */
        if ( is_evernote_btn_visible() ):
    ?>
            <li class="evernote-btn">
                <a
                    href="#"
                    onclick="Evernote.doClip({url:'<?php the_permalink();?>',
                        providerName:'<?php bloginfo('name'); ?>',
                        title:'<?php the_title();?>',
                        contentId:'the-content',
                        }); return false;"
                    class="evernote-btn-link">
                    <img
                        src="<?php echo get_template_directory_uri();?>/images/article-clipper-vert.png"
                        alt="Evernoteに保存"
                        class="evernote-btn-img" />
                        <img
                            src="<?php echo get_template_directory_uri();?>/images/article-clipper.png"
                            alt="Evernoteに保存"
                            class="evernote-btn-img-mini" />
                </a>
            </li>

        <?php endif; ?>

        <?php
            /**
             * feedlyボタンを表示するか
             */
            if ( is_feedly_btn_visible() ):
        ?>
            <?php
                //  横型の小さいfeedlyボタン
                if ($g_is_small):
            ?>
                    <li class="feedly-btn feedly-btn-horizontal">
                        <a
                            href='http://feedly.com/index.html#subscription%2Ffeed%2F<?php urlencode(bloginfo('rss2_url')); ?>'
                            target='blank'>
                            <img
                                id='feedly-follow'
                                src='http://s3.feedly.com/img/follows/feedly-follow-rectangle-flat-medium_2x.png'
                                alt="">
                        </a>
                        <span class="arrow_box">
                            <a
                                href='http://feedly.com/index.html#subscription%2Ffeed%2F<?php urlencode(bloginfo('rss2_url')); ?>'
                                target='blank'><?php echo get_feedly_count(); ?>
                            </a>
                        </span>
                    </li>

            <?php
                //縦型の大きなfeedlyボタン
                else:
            ?>

                    <li class="feedly-btn feedly-btn-vertical">
                        <div id="feedly-followers">
                            <span id="feedly-count" class="fdly-count">
                                <a
                                    href='http://feedly.com/index.html#subscription%2Ffeed%2F<?php urlencode(bloginfo('rss2_url')); ?>'
                                    target='blank'><?php echo get_feedly_count(); ?>
                                </a>
                            </span>
                            <a href='http://feedly.com/index.html#subscription%2Ffeed%2F<?php urlencode(bloginfo('rss2_url')); ?>' target='blank'>
                                <img id='feedly-follow' src='http://s3.feedly.com/img/follows/feedly-follow-rectangle-flat-medium_2x.png' alt="">
                            </a>
                        </div>
                    </li>

                <?php endif; ?>

            <?php
                //is_feedly_btn_visible
                endif;
            ?>

        </ul>
    </div>

<?php endif; ?>
