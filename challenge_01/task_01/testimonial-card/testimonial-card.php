<?php
/**
 * Plugin Name:       Testimonial Card
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Tanjaka Mandresi
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       testimonial-card
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

function imandresi_create_custom_block_category($categories) {
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

}

function imandresi_testimonial_block_init() {
	add_filter('block_categories_all', 'imandresi_create_custom_block_category');
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'imandresi_testimonial_block_init' );
