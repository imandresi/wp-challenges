<?php

namespace Imandresi\TailorMail\Core\Classes;

use Imandresi\TailorMail\Core\Classes\Controls\AbstractControl;
use Imandresi\TailorMail\Core\Classes\Controls\ButtonControl;
use Imandresi\TailorMail\Core\Classes\Controls\SubmitButtonControl;
use Imandresi\TailorMail\Core\Classes\Controls\TextareaControl;
use Imandresi\TailorMail\Core\Classes\Controls\TextControl;
use Imandresi\TailorMail\Models\ContactFormsModel;
use Imandresi\TailorMail\Views\ControlsView;
use const Imandresi\TailorMail\PLUGIN_SLUG;
use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class ShortcodeManager {
	const CONTACT_FORM_SHORTCODE_TAG = PLUGIN_SLUG;
	const CONTROL_PREFIX = PLUGIN_SLUG . '-';

	// Fill this with the controls to be initialized
	const CONTROLS_PSEUDO_CODE_NAMES = [ 'text', 'textarea', 'button', 'submit' ];

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
		$attributes = [
			'id' => ''
		];

		$attributes = shortcode_atts(
			$attributes,
			$atts
		);

		$contact_form_id = (int) $attributes['id'];

		if ( ! $contact_form_id ) {
			return '';
		}

		$form_data = ContactFormsModel::get_data( $contact_form_id );
		$content   = $form_data['meta'][ ContactFormsModel::POST_META_DATA_SLUG ]['form_code'];
		$content   = self::pseudo_to_shortcode( $content );
		$content   = do_shortcode( $content );

		$attributes = [
			'id'      => PLUGIN_SLUG . '-form-' . $contact_form_id,
			'content' => $content
		];

		$output = ControlsView::render_contact_form( $attributes );

		return $output;

	}

	public static function control_factory( $pseudo_code_name ): AbstractControl {
		$control = null;

		/*
		 * Add control initialization here
		 */
		switch ( $pseudo_code_name ) {
			case 'text':
				$control = new TextControl();
				break;

			case 'textarea':
				$control = new TextareaControl();
				break;

			case 'button':
				$control = new ButtonControl();
				break;

			case 'submit':
				$control = new SubmitButtonControl();
				break;

		}

		return $control;

	}

	public static function load() {
		// initialize shortcode for contact form
		add_shortcode( self::CONTACT_FORM_SHORTCODE_TAG, [ self::class, 'contact_form_render_shortcode' ] );

		// initialize shortcode for form fields
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