<?php

namespace Imandresi\TailorMail\Models;

use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class ContactForms {

	const POST_TYPE_SLUG = 'tailor_mail_forms';

	public static function init_data_model() {
		register_post_type( self::POST_TYPE_SLUG,
			[
				'labels'             => [
					'name'          => __( 'Contact Forms', PLUGIN_TEXT_DOMAIN ),
					'singular_name' => __( 'Contact Form', PLUGIN_TEXT_DOMAIN ),
					'add_new'       => __( 'Add New Form', PLUGIN_TEXT_DOMAIN )
				],
				'public'             => true,
				'hierarchical'       => false, // To be changed if necessary
				'publicly_queryable' => false,
				'show_ui'            => true,
				'show_in_menu'       => false
			]
		);

	}

	public static function init(): void {
		add_action( 'init', [ self::class, 'init_data_model' ] );

	}

}