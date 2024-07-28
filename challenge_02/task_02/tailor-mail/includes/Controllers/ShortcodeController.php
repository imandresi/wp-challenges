<?php

namespace Imandresi\TailorMail\Controllers;

use Imandresi\TailorMail\Core\Classes\Controls\AbstractControl;
use Imandresi\TailorMail\Core\Classes\Controls\ButtonControl;
use Imandresi\TailorMail\Core\Classes\Controls\SubmitButtonControl;
use Imandresi\TailorMail\Core\Classes\Controls\TextareaControl;
use Imandresi\TailorMail\Core\Classes\Controls\TextControl;
use Imandresi\TailorMail\Core\FrontLoader;
use Imandresi\TailorMail\Models\ContactFormsModel;
use Imandresi\TailorMail\System\Sessions;
use Imandresi\TailorMail\Views\ControlsView;
use Rakit\Validation\Validator;
use const Imandresi\TailorMail\ACTION_HOOK_PROCESS_CONTACT_FORM_DATA;
use const Imandresi\TailorMail\PLUGIN_IDENTIFIER;
use const Imandresi\TailorMail\PLUGIN_SLUG;
use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class ShortcodeController {
	const CONTACT_FORM_SHORTCODE_TAG = PLUGIN_SLUG;
	const CONTROL_PREFIX = PLUGIN_SLUG . '-';
	private const NONCE_FIELD = '_wpnonce';
	private const NONCE_ACTION = 'submit';
	private const FORM_ACTION = PLUGIN_IDENTIFIER . '_form_submit';
	private const FORM_SESSION_NAME = 'contact_form';
	private const ALERT_SESSION_NAME = 'alert';

	// Fill this with the controls to be initialized
	private const PSEUDO_CONTROLS = [
		'text'     => TextControl::class,
		'textarea' => TextareaControl::class,
		'button'   => ButtonControl::class,
		'submit'   => SubmitButtonControl::class
	];

	private static function has_field_shortcode( $content ): bool {
		foreach ( array_keys( self::PSEUDO_CONTROLS ) as $pseudo_shortcode ) {
			$shortcode = self::CONTROL_PREFIX . $pseudo_shortcode;
			if ( has_shortcode( $content, $shortcode ) ) {
				return true;
			}
		}

		return false;
	}

	private static function pseudo_to_shortcode( $content ) {

		// Replace open tags
		$regex = "/\[([\w\-]+)/is";

		$content = preg_replace_callback(
			$regex,
			function ( $matches ) {
				$replacement = $matches[0];


				if ( in_array( $matches[1], array_keys( self::PSEUDO_CONTROLS ) ) ) {
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

				if ( in_array( $matches[1], array_keys( self::PSEUDO_CONTROLS ) ) ) {
					$replacement = '[/' . self::CONTROL_PREFIX . $matches[1] . ']';
				}

				return $replacement;
			},
			$content
		);

		return $content;

	}

	public static function sanitize_fields(): array {
		if ( ! $_POST['_controls'] ) {
			return [];
		}

		$safe = [];

		foreach ( $_POST['_controls'] as $field_name => $attributes ) {
			if ( ! isset( $_POST[ $field_name ] ) ) {
				continue;
			}

			$attributes = wp_unslash( $attributes );
			$attributes = json_decode( $attributes, true );
			$field_type = $attributes['type'];

			if ( ! $field_type ) {
				continue;
			}

			$field_value = $_POST[ $field_name ];
			$field_class = self::PSEUDO_CONTROLS[ $field_type ] ?? null;

			if ( ! $field_class ) {
				continue;
			}

			if ( is_callable( [ $field_class, 'sanitize_field' ] ) ) {
				$safe[ $field_name ] = call_user_func( [ $field_class, 'sanitize_field' ], $field_value, $attributes );
			}
		}

		return $safe;

	}

	public static function build_validation_data(): array {

		if ( ! $_POST['_controls'] ) {
			return [];
		}

		$constraints = [];

		foreach ( $_POST['_controls'] as $field_name => $attributes ) {

			if ( ! isset( $_POST[ $field_name ] ) ) {
				continue;
			}

			$attributes = wp_unslash( $attributes );
			$attributes = json_decode( $attributes, true );
			$field_type = $attributes['type'];

			if ( ! $field_type ) {
				continue;
			}

			// parse validator attribute
			$validators = explode( '|', strtolower( $attributes['validator'] ) );
			$rules      = array_combine( $validators, $validators );

			if ( $attributes['required'] ) {
				$rules['required'] = 'required';
			}

			// build constraints
			$constraints[ $field_name ] = join( '|', array_keys( $rules ) );

		}

		return $constraints;

	}

	public static function validate_fields( $fields, &$form_state ) {
		$validator   = new Validator();
		$constraints = self::build_validation_data();
		$validation  = $validator->validate( $fields, $constraints );

		if ( $validation->fails() ) {
			$form_state['status']         = 'errors';
			$form_state['status_message'] = esc_html__( 'Some fields are not valid. Please verify them.', PLUGIN_TEXT_DOMAIN );
			$form_state['errors']         = $validation->errors->firstOfAll();
		}

	}

	public static function contact_form_submit_process() {
		$form_state = [
			'status'         => '',
			'status_message' => '',
			'form_data'      => $_POST,
			'errors'         => [],
		];

		$safe_data = [];

		// verify nonce
		if ( ! wp_verify_nonce( $_POST[ self::NONCE_FIELD ], self::NONCE_ACTION ) ) {
			wp_die( esc_html__( 'Sorry! You are not allowed to send that message.', PLUGIN_TEXT_DOMAIN ) );
		}

		// sanitize fields
		$_POST = stripslashes_deep($_POST);
		$safe_data = self::sanitize_fields();

		// validate fields
		self::validate_fields( $safe_data, $form_state );

		if ( ! $form_state['status'] ) {

			/**
			 * Send the mail or process the safe form data in another way
			 *
			 * @param array $safe_data
			 * @param int $contact_form_id
			 *
			 */
			do_action( ACTION_HOOK_PROCESS_CONTACT_FORM_DATA, $safe_data, $_POST['contact_form_id'] );

			// set success status
			$form_state['status']         = 'success';
			$form_state['status_message'] = esc_html__( 'Your message is sent successfully', PLUGIN_TEXT_DOMAIN );
			$form_state['form_data']      = [];
			$form_state['errors']         = [];

		}

		$session = &Sessions::get_session_var();

		$session[ self::ALERT_SESSION_NAME ] = [
			'type'    => $form_state['status'] == 'success' ? 'success' : 'danger',
			'message' => $form_state['status_message']
		];

		$session[ self::FORM_SESSION_NAME ] = $form_state;

		// return to the form
		$redirect_url = $_SERVER['HTTP_REFERER'];
		wp_redirect( $redirect_url );
		exit;

	}

	public static function contact_form_render_shortcode( $atts ): string {
		$shortcode_attributes = [
			'id' => ''
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

		while ( self::has_field_shortcode( $content ) ) {
			$content = do_shortcode( $content );
			$content = self::pseudo_to_shortcode( $content );
		}

		$form_slug = PLUGIN_SLUG . '-form-' . $contact_form_id;

		$attributes = [
			'contact_form_id' => $contact_form_id,
			'id'              => $form_slug,
			'name'            => $shortcode_attributes['name'] ?? $form_slug,
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

		// clear alert messages and contact form previous data
		unset ( Sessions::get_session_var()[ self::ALERT_SESSION_NAME ] );
		unset ( Sessions::get_session_var()[ self::FORM_SESSION_NAME ] );

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
		foreach ( array_keys( self::PSEUDO_CONTROLS ) as $pseudo_code_name ) {
			add_shortcode(
				self::CONTROL_PREFIX . $pseudo_code_name,
				function ( $atts, $content = null ) use ( $pseudo_code_name ) {
					$control = self::control_factory( $pseudo_code_name );

					return $control->render_shortcode( $atts, $content );
				}
			);
		}

		// initialize contact form submit process
		add_action( 'admin_post_' . self::FORM_ACTION, [ self::class, 'contact_form_submit_process' ] );
		add_action( 'admin_post_nopriv_' . self::FORM_ACTION, [ self::class, 'contact_form_submit_process' ] );

	}

}