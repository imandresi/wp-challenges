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
				[ContactFormsView::class, 'form_meta_box'],
				[ ContactFormsModel::POST_TYPE_SLUG ],
				'advanced',
				'core'
			);
		} );

		add_action( 'add_meta_boxes', function () {
			add_meta_box(
				'tailor-mail-metabox-2',
				__( 'Mail', PLUGIN_TEXT_DOMAIN ),
				[ContactFormsView::class, 'mail_meta_box'],
				[ ContactFormsModel::POST_TYPE_SLUG ],
				'advanced',
				'core'
			);
		} );

	}

	public static function init(): void {
		self::prepare_ui();
	}

}