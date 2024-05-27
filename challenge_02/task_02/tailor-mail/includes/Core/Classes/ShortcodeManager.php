<?php

namespace Imandresi\TailorMail\Core\Classes;

use Imandresi\TailorMail\Core\Classes\Controls\AbstractControl;
use Imandresi\TailorMail\Core\Classes\Controls\ButtonControl;
use Imandresi\TailorMail\Core\Classes\Controls\SubmitButtonControl;
use Imandresi\TailorMail\Core\Classes\Controls\TextareaControl;
use Imandresi\TailorMail\Core\Classes\Controls\TextControl;
use Imandresi\TailorMail\Models\ContactFormsModel;
use Imandresi\TailorMail\System\Sessions;
use Imandresi\TailorMail\Views\ControlsView;
use const Imandresi\TailorMail\PLUGIN_IDENTIFIER;
use const Imandresi\TailorMail\PLUGIN_SLUG;
use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class ShortcodeManager {
	const CONTACT_FORM_SHORTCODE_TAG = PLUGIN_SLUG;
	const CONTROL_PREFIX = PLUGIN_SLUG . '-';
	private const NONCE_FIELD = '_wpnonce';
	private const NONCE_ACTION = 'submit';
	private const FORM_TRANSIENT_NAME = PLUGIN_IDENTIFIER . '_form_state';

	private const FORM_ACTION = PLUGIN_IDENTIFIER . '_form_submit';
	private const FORM_SESSION_NAME = 'contact_form';
	private const ALERT_SESSION_NAME = 'alert';

	// Fill this with the controls to be initialized
	private const CONTROLS_PSEUDO_CODE_NAMES = [ 'text', 'textarea', 'button', 'submit' ];

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
		$shortcode_attributes = [
			'id'   => '',
			'name' => '',
		];

		$shortcode_attributes = shortcode_atts(
			$shortcode_attributes,
			$atts
		);

		$contact_form_id = (int) $shortcode_attributes['id'];

		if ( ! $contact_form_id ) {
			return '';
		}

		$form_data = ContactFormsModel::get_data( $contact_form_id );
		$content   = $form_data['meta'][ ContactFormsModel::POST_META_DATA_SLUG ]['form_code'];
		$content   = self::pseudo_to_shortcode( $content );
		$content   = do_shortcode( $content );

		$form_slug = PLUGIN_SLUG . '-form-' . $contact_form_id;

		$attributes = [
			'contact_form_id' => $contact_form_id,
			'id'              => $form_slug,
			'name'            => $shortcode_attributes['name'] ? $shortcode_attributes : $form_slug,
			'form_action_url' => admin_url( 'admin-post.php' ),
			'form_action'     => self::FORM_ACTION,
			'nonce'           => wp_nonce_field(
				self::NONCE_ACTION,
				self::NONCE_FIELD,
				true,
				false
			),
			'content'         => $content
		];

		$output = ControlsView::render_contact_form( $attributes );

		// clear alert messages
		unset (Sessions::get_session_var()[self::ALERT_SESSION_NAME]);

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