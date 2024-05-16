<?php
/**
 * Plugin Name:       Blockordion
 * Description:       An accordion block where you can add multiple items that can be toggled.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Tanjaka Mandresi
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blockordion
 *
 * @package Imandresi
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function imandresi_blockordion_block_init() {

	add_filter('block_categories_all', function ($categories) {
		$category_slug = 'wp_challenge';

		// checks if the slug already exist
		foreach ($categories as $category) {
			if ($category['slug'] == $category_slug) {
				return $categories;
			}
		}

		$categories[] = [
			'slug'  => $category_slug,
			'title' => 'WordPress Challenge'
		];

		return $categories;

	});

	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'imandresi_blockordion_block_init' );
