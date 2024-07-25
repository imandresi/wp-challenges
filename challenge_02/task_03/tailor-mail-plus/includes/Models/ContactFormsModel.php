<?php

namespace Imandresi\TailorMail\Models;

use const Imandresi\TailorMail\PLUGIN_IDENTIFIER;
use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class ContactFormsModel {

	const POST_TYPE_SLUG = PLUGIN_IDENTIFIER . '_forms';
	const POST_META_DATA_SLUG = PLUGIN_IDENTIFIER . '_forms_data';

	public static function get_data( int $id ): ?array {
		$result = [];

		$post = get_post( $id );

		if ( ! $post || ( $post->post_type != self::POST_TYPE_SLUG ) || ( $post->post_status != 'publish' ) ) {
			return null;
		}

		$post_meta = [
			self::POST_META_DATA_SLUG => get_post_meta( $post->ID, self::POST_META_DATA_SLUG, true )
		];

		$result = [
			'post' => $post,
			'meta' => $post_meta
		];

		return $result;

	}

	public static function init_data_model() {
		register_post_type( self::POST_TYPE_SLUG,
			[
				'labels'             => [
					'name'          => __( 'Contact Forms', PLUGIN_TEXT_DOMAIN ),
					'singular_name' => __( 'Contact Form', PLUGIN_TEXT_DOMAIN ),
					'add_new'       => __( 'Add New Form', PLUGIN_TEXT_DOMAIN ),
					'add_new_item'  => __( 'Add New Form', PLUGIN_TEXT_DOMAIN ),
					'edit_item'     => __( 'Edit Contact Form', PLUGIN_TEXT_DOMAIN ),
				],
				'public'             => true,
				'hierarchical'       => false,
				'publicly_queryable' => false,
				'show_ui'            => true,
				'show_in_menu'       => false,
				'supports'           => [ 'title' ]
			]
		);

		register_post_meta(
			self::POST_TYPE_SLUG,
			self::POST_META_DATA_SLUG,
			[
				'type'         => 'array',
				'single'       => true,
				'show_in_rest' => false
			]
		);

	}

	public static function init(): void {
		add_action( 'init', [ self::class, 'init_data_model' ] );
	}

}