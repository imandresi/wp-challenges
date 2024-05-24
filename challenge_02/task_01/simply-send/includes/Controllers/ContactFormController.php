<?php

namespace Imandresi\SimplySend\Controllers;

use Imandresi\SimplySend\System\Singleton;
use Imandresi\SimplySend\Views\ContactFormView;
use const Imandresi\SimplySend\PLUGIN_SHORTCODE_NAME;

class ContactFormController extends Singleton {
	private const NONCE_FIELD = '_wpnonce';
	private const NONCE_ACTION = 'submit';
	private const FORM_TRANSIENT_NAME = 'simply_send_form_state';


	public function process_shortcode( $atts ): string {
		$form_state = get_transient( self::FORM_TRANSIENT_NAME );
		$form_state = $form_state ? $form_state : [
			'status'         => '',
			'status_message' => '',
			'form_data'      => [],
			'errors'         => []
		];

		// put field values here
		$attributes = array_merge( $form_state,
			[
				'nonce'     => wp_nonce_field( self::NONCE_ACTION, self::NONCE_FIELD ),
			]
		);

		// clear transient data
		delete_transient( self::FORM_TRANSIENT_NAME );

		return ContactFormView::show_contact_form( $attributes );

	}

	public function submit_form() {

		$form_state = [
			'status'         => '',
			'status_message' => '',
			'form_data'      => $_POST,
			'errors'         => [],
		];

		$safe_data = [];

		// verify nonce
		if ( ! wp_verify_nonce( $_POST[ self::NONCE_FIELD ], self::NONCE_ACTION ) ) {
			wp_die( 'Sorry! You are not allowed to send that message.' );
		}

		// data sanitization
		$safe['subject'] = trim( sanitize_text_field( $_POST['subject'] ) );
		$safe['email']   = trim( sanitize_email( $_POST['email'] ) );
		$safe['message'] = trim( sanitize_textarea_field( $_POST['message'] ) );

		// data validation
		if ( ! $safe['subject'] ) {
			$form_state['errors']['subject'] = 'The subject of the message is required.';
		}

		if ( ! is_email( $safe['email'] ) ) {
			$form_state['errors']['email'] = 'The email address is not valid.';
		}

		if ( ! $safe['message'] ) {
			$form_state['errors']['message'] = 'Please type the message you want to send';
		}

		// preparing data to be returned
		if ( $form_state['errors'] ) {
			$form_state['status']         = 'errors';
			$form_state['status_message'] = 'An error occured. Please verify your fields.';
		} else {

			// send the email
			$to          = $safe['email'];
			$subject     = $safe['subject'];
			$message     = $safe['message'];
			$mail_status = wp_mail( $to, $subject, $message );

			if ( $mail_status ) {
				$form_state['status']         = 'success';
				$form_state['status_message'] = 'Your message is sent successfully';
			} else {
				$form_state['status']         = 'error';
				$form_state['status_message'] = 'The message could not be sent.';
			}

		}

		set_transient( self::FORM_TRANSIENT_NAME, $form_state, 120 );

		// return to the form
		$redirect_url = $_SERVER['HTTP_REFERER'];
		wp_redirect( $redirect_url );
		exit;

	}

	public function init() {
		add_shortcode( PLUGIN_SHORTCODE_NAME, [ $this, 'process_shortcode' ] );
		add_action( 'admin_post_simply_send_form_submit', [ $this, 'submit_form' ] );
		add_action( 'admin_post_nopriv_simply_send_form_submit', [ $this, 'submit_form' ] );
	}

	public static function load() {
		self::get_instance();
	}

}