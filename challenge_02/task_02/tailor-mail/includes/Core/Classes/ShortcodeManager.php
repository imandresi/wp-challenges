<?php

namespace Imandresi\TailorMail\Core\Classes;

use Imandresi\TailorMail\Core\Classes\Controls\AbstractControl;
use Imandresi\TailorMail\Core\Classes\Controls\TextareaControl;
use Imandresi\TailorMail\Core\Classes\Controls\TextControl;
use Imandresi\TailorMail\Models\ContactFormsModel;
use const Imandresi\TailorMail\PLUGIN_SLUG;
use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class ShortcodeManager {
	const CONTACT_FORM_SHORTCODE_TAG = PLUGIN_SLUG;
	const CONTROL_PREFIX = PLUGIN_SLUG . '-';
	const CONTROLS_PSEUDO_CODE_NAMES = [ 'text', 'textarea' ];

	private static function pseudo_to_shortcode( $content ) {

		// Replace open tags
		$regex = "/\[([\w\-]+)/is";

		$content = preg_replace_callback(
			$regex,
			function ( $matches ) {
				$replacement = $matches[0];

				if ( in_array( $matches[1], self::CONTROLS_PSEUDO_CODE_NAMES ) ) {
					$replacement = '[' . self::CONTROL_PREFIX . $matches[1];
				}

				return $replacement;
			},
			$content
		);

		// Replace close tags
		$regex   = "/\[\/([\w\-]+)]/is";
		$content = preg_replace_callback(
			$regex,
			function ( $matches ) {
				$replacement = $matches[0];

				if ( in_array( $matches[1], self::CONTROLS_PSEUDO_CODE_NAMES ) ) {
					$replacement = '[/' . self::CONTROL_PREFIX . $matches[1] . ']';
				}

				return $replacement;
			},
			$content
		);

		return $content;

	}

	public static function contact_form_render_shortcode( $atts ): string {
		// TODO: is it really necessary ?
		$attributes = [
			'id' => ''
		];

		$attributes = shortcode_atts(
			$attributes,
			$atts
		);

		if ( ! isset( $attributes['id'] ) ) {
			return '';
		}

		$form_data = ContactFormsModel::get_data( (int) $attributes['id'] );
		$content   = $form_data['meta'][ ContactFormsModel::POST_META_DATA_SLUG ]['form_code'];
		$content   = self::pseudo_to_shortcode( $content );
		$output    = do_shortcode( $content );

		return $output;

	}

	public static function control_factory( $pseudo_code_name ): AbstractControl {
		$control = null;

		switch ( $pseudo_code_name ) {
			case 'text':
				$control = new TextControl();
				break;

			case 'textarea':
				$control = new TextareaControl();
				break;

		}

		return $control;

	}

	public static function load() {
		add_shortcode( self::CONTACT_FORM_SHORTCODE_TAG, [ self::class, 'contact_form_render_shortcode' ] );

		foreach ( self::CONTROLS_PSEUDO_CODE_NAMES as $pseudo_code_name ) {
			add_shortcode(
				self::CONTROL_PREFIX . $pseudo_code_name,
				function ( $atts, $content = null ) use ( $pseudo_code_name ) {
					$control = self::control_factory( $pseudo_code_name );

					return $control->render_shortcode( $atts, $content );
				}
			);
		}

	}

}