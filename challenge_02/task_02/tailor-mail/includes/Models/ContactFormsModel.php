<?php

namespace Imandresi\TailorMail\Models;

use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class ContactFormsModel {

	const POST_TYPE_SLUG = 'tailor_mail_forms';
	const POST_META_DATA_SLUG = 'tailor_mail_forms_data';

	public static function init_data_model() {
		register_post_type( self::POST_TYPE_SLUG,
			[
				'labels'             => [
					'name'          => __( 'Contact Forms', PLUGIN_TEXT_DOMAIN ),
					'singular_name' => __( 'Contact Form', PLUGIN_TEXT_DOMAIN ),
					'add_new'       => __( 'Add New Form', PLUGIN_TEXT_DOMAIN ),
					'add_new_item'  => __( 'Add New Form', PLUGIN_TEXT_DOMAIN ),
				],
				'public'             => true,
				'hierarchical'       => false, // To be changed if necessary
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