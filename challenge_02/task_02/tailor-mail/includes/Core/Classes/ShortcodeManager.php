<?php

namespace Imandresi\TailorMail\Core\Classes;

use Imandresi\TailorMail\Core\Classes\Controls\AbstractControl;
use Imandresi\TailorMail\Core\Classes\Controls\TextControl;
use Imandresi\TailorMail\Models\ContactFormsModel;
use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class ShortcodeManager {
	const CONTROL_PREFIX = 'tmf-';
	const CONTROLS_PSEUDO_CODE_NAMES = [ 'text' ];
	const CONTACT_FORM_SHORTCODE_TAG = 'tailor-mail';

	public static function contact_form_render_shortcode( $atts ): string {
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
	public static function control_factory( $pseudo_code_name ): AbstractControl {
		$control = null;

		switch ( $pseudo_code_name ) {
			case 'text':
				$control = new TextControl();
				break;
		}

		return $control;

	}

	public static function load() {
		add_shortcode( self::CONTACT_FORM_SHORTCODE_TAG, [ self::class, 'contact_form_render_shortcode' ] );

		foreach ( self::CONTROLS_PSEUDO_CODE_NAMES as $pseudo_code_name ) {
			add_shortcode( self::CONTROL_PREFIX . $pseudo_code_name, function ( $atts ) use ( $pseudo_code_name ) {
				$control = self::control_factory( $pseudo_code_name );

				return $control->render_shortcode( $atts );
			} );
		}
	}

}