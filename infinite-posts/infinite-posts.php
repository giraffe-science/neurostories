<?php
/**
 * Plugin Name:     Infinite Posts
 * Description:     Block to add infinite scrolling blog posts
 * Version:         0.1.0
 * Author:          Scientific Giraffe
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     infinite-posts
 *
 * @package         create-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_infinite_posts_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/infinite-posts" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );

	wp_register_script(
		'create-block-infinite-posts-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'create-block-infinite-posts-block-editor', 'infinite-posts' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'create-block-infinite-posts-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-infinite-posts-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	// see https://github.com/Oberhauser-Dev/gb-fullcalendar/blob/master/gb-fullcalendar.php
	$client_js = 'build/client.js';
	wp_register_script(
		'infinite-posts-block-client',
		plugins_url($client_js, __FILE__),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	register_block_type( 'create-block/infinite-posts', array(
		'editor_script' => 'create-block-infinite-posts-block-editor',
		'editor_style'  => 'create-block-infinite-posts-block-editor',
		'style'         => 'create-block-infinite-posts-block',
		 'script' => 'infinite-posts-block-client',
	) );

	wp_enqueue_script('infinite-posts', $index_js, array( 'wp-api' ) );

}
add_action( 'init', 'create_block_infinite_posts_block_init' );
