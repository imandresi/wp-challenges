<?php

namespace Imandresi\TailorMail\Controllers;

use Imandresi\TailorMail\Models\ContactFormsModel;
use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class ContactFormManagerController {

	const SHORTCODE_TAG = 'tailor-mail';

	public static function render_shortcode( $atts ): string {
		$attributes = [
			'id'    => '',
			'title' => __( 'Contact Us', PLUGIN_TEXT_DOMAIN )
		];

		$attributes = shortcode_atts(
			$attributes,
			$atts
		);

		if ( ! isset( $attributes['id'] ) ) {
			return '';
		}

		$form_data = ContactFormsModel::get_data( (int)$attributes['id'] );

		$content = $form_data['meta'][ContactFormsModel::POST_META_DATA_SLUG]['form_code'];

		$output = do_shortcode($content);

		return $output;


	}

	public static function load(): void {
		add_shortcode( self::SHORTCODE_TAG, [ self::class, 'render_shortcode' ] );
	}

}