<?php

namespace Imandresi\TailorMail\Controllers;

use Imandresi\TailorMail\Models\ContactFormsModel;
use Imandresi\TailorMail\Views\ContactFormsView;
use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class ContactFormsController {

	public static function is_editing_form(): bool {
		return ( get_post_type() == ContactFormsModel::POST_TYPE_SLUG ) && is_admin();
	}

	private static function prepare_ui(): void {
		global $post;

		add_filter( 'enter_title_here', function ( $title ) {
			if ( self::is_editing_form() ) {
				$title = "choose a name for your contact form";
			}

			return $title;
		} );

		add_action( 'add_meta_boxes', function () {
			add_meta_box(
				'tailor-mail-metabox-1',
				__( 'Form', PLUGIN_TEXT_DOMAIN ),
				[ ContactFormsView::class, 'form_meta_box' ],
				[ ContactFormsModel::POST_TYPE_SLUG ],
				'advanced',
				'core'
			);
		} );

		add_action( 'add_meta_boxes', function () {
			add_meta_box(
				'tailor-mail-metabox-2',
				__( 'Mail', PLUGIN_TEXT_DOMAIN ),
				[ ContactFormsView::class, 'mail_meta_box' ],
				[ ContactFormsModel::POST_TYPE_SLUG ],
				'advanced',
				'core'
			);
		} );

	}

	public static function pre_post_update_hook( $post_id, $data ) {

	}

	public static function save_post_hook( int $post_id, \WP_Post $post, bool $update ) {
		if ( wp_is_post_revision( $post_id ) ) {
			return;
		}

		$meta_value = [
			'form_code' => trim($_POST['tailor_mail_form_code'])
		];

		update_post_meta(
			$post_id,
			ContactFormsModel::POST_META_DATA_SLUG,
			$meta_value
		);

	}

	public static function get_form_unique_id( \WP_Post $post = null ): int {
		$unique_id = $post ? $post->ID : 1;

		return $unique_id;
	}

	public static function init(): void {
		self::prepare_ui();

		add_action( 'pre_post_update', [ self::class, 'pre_post_update_hook' ], 10, 2 );

		add_filter( 'default_title', function ( string $post_title, \WP_Post $post ) {
			if ( $post->post_type !== ContactFormsModel::POST_TYPE_SLUG ) {
				return $post_title;
			}

			return sprintf( __( 'Contact Form %d', PLUGIN_TEXT_DOMAIN ), self::get_form_unique_id( $post ) );

		}, 10, 2 );

		add_filter(
			'save_post_' . ContactFormsModel::POST_TYPE_SLUG,
			[ self::class, 'save_post_hook' ],
			10, 3
		);

	}

}