<?php

namespace Imandresi\TailorMail\Models;

use const Imandresi\TailorMail\PLUGIN_IDENTIFIER;
use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class ContactEntriesModel {

	const POST_TYPE_SLUG = PLUGIN_IDENTIFIER . '_entries';
	const POST_META_DATA_SLUG = PLUGIN_IDENTIFIER . '_entries_data';
	const POST_META_OWNER_SLUG = PLUGIN_IDENTIFIER . '_entries_owner';

	public static function get_entry( $post_id ) {
		$data = [];
		$post = get_post( $post_id, ARRAY_A );

		if ( ! $post ) {
			return false;
		}

		$data['post'] = $post;
		$meta         = get_post_meta( $post_id, self::POST_META_DATA_SLUG, true );
		$owner        = get_post_meta( $post_id, self::POST_META_OWNER_SLUG, true );

		if ( ! $meta ) {
			return false;
		}

		$data = [
			'post' => $post,
			'mail' => [
				'subject' => $post['post_title'],
				'message' => $post['post_content'],
				'custom'  => $meta,
				'owner'   => $owner
			]
		];

		return $data;

	}

	public static function save_entry( $data ) {

		/*
				$data = [
					'post' => [
						'ID' => 0,
					],
					'mail' => [
						'subject' => '',
						'message' => '',
						'custom'  => [
							'email'           => '',  // for example
							'name'            => '',  // for example
						],
						'owner' => 0                  // contact_form_id
					]
				];
		*/

		if ( ! $data['mail'] ) {
			return false;
		}

		// build the post to be saved
		$post = $data['post'] ?: [];

		$post['post_status']  = 'publish';
		$post['post_type']    = self::POST_TYPE_SLUG;
		$post['post_title']   = $data['mail']['subject'];
		$post['post_content'] = $data['mail']['message'];

		$post_id = wp_insert_post( $post );

		if ( ! $post_id ) {
			return false;
		}

		// save post meta
		$contact_form_id = $data['mail']['owner'];
		update_post_meta( $post_id, self::POST_META_DATA_SLUG, $data['mail']['custom'] );
		update_post_meta( $post_id, self::POST_META_OWNER_SLUG, $contact_form_id );

		return $post_id;

	}

	public static function init_data_model() {

		register_post_type( self::POST_TYPE_SLUG,
			[
				'labels'             => [
					'name'          => __( 'Contact Entries', PLUGIN_TEXT_DOMAIN ),
					'singular_name' => __( 'Contact Entry', PLUGIN_TEXT_DOMAIN ),
					'edit_item'     => __( 'Contract Entry', PLUGIN_TEXT_DOMAIN ),
				],
				'public'             => true,
				'hierarchical'       => false,
				'publicly_queryable' => false,
				'show_ui'            => true,
				'show_in_menu'       => false,
				'capabilities'       => [
					'create_posts' => false
				],
				'map_meta_cap'       => true,
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