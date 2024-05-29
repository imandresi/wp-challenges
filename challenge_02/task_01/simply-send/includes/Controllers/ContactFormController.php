<?php

namespace Imandresi\SimplySend\Controllers;

use Imandresi\SimplySend\Loader;
use Imandresi\SimplySend\System\Singleton;
use Imandresi\SimplySend\Views\ContactFormView;
use const Imandresi\SimplySend\PLUGIN_SHORTCODE_NAME;
use const Imandresi\SimplySend\PLUGIN_TEXT_DOMAIN;

class ContactFormController extends Singleton {
	private const NONCE_FIELD = '_wpnonce';
	private const NONCE_ACTION = 'submit';
	private const FORM_TRANSIENT_NAME = 'simply_send_form_state';
	private const SHORTCODE_NAME = 'simply-send';


	public function process_shortcode( $atts ): string {

		$form_state = get_transient( self::FORM_TRANSIENT_NAME );
		$form_state = $form_state ?: [
			'status'         => '',
			'status_message' => '',
			'form_data'      => [],
			'errors'         => []
		];

		// put field values here
		$attributes = array_merge( $form_state,
			[
				'nonce' => wp_nonce_field(
					self::NONCE_ACTION,
					self::NONCE_FIELD,
					true,
					false
				),
			]
		);

		// clear transient data
		delete_transient( self::FORM_TRANSIENT_NAME );

		return ContactFormView::show_contact_form( $attributes );

	}

	public function submit_form() {
		$_POST = stripslashes_deep( $_POST );

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

		// data sanitization
		$safe['subject'] = trim( sanitize_text_field( $_POST['subject'] ) );
		$safe['email']   = trim( sanitize_email( $_POST['email'] ) );
		$safe['message'] = trim( sanitize_textarea_field( $_POST['message'] ) );

		// data validation
		if ( ! $safe['subject'] ) {
			$form_state['errors']['subject'] = esc_html__( 'The subject of the message is required.', PLUGIN_TEXT_DOMAIN );
		}

		if ( ! is_email( $safe['email'] ) ) {
			$form_state['errors']['email'] = esc_html__( 'The email address is not valid.', PLUGIN_TEXT_DOMAIN );
		}

		if ( ! $safe['message'] ) {
			$form_state['errors']['message'] = esc_html__( 'Please type the message you want to send', PLUGIN_TEXT_DOMAIN );
		}

		// preparing data to be returned
		if ( $form_state['errors'] ) {
			$form_state['status']         = 'errors';
			$form_state['status_message'] = esc_html__( 'Some fields are not valid. Please verify them.', PLUGIN_TEXT_DOMAIN );
		} else {

			// send the email
			$to      = get_bloginfo( 'admin_email' );
			$subject = $safe['subject'];
			$message = $safe['message'];

			$headers = "From: {$safe['email']}\r\n" .
			           "Reply-To: {$safe['email']}";

			$mail_status = wp_mail( $to, $subject, $message, $headers );

			if ( $mail_status ) {
				$form_state['status']         = 'success';
				$form_state['status_message'] = esc_html__( 'Your message is sent successfully', PLUGIN_TEXT_DOMAIN );
				$form_state['form_data']      = [];
				$form_state['errors']         = [];
			} else {
				$form_state['status']         = 'error';
				$form_state['status_message'] = esc_html__( 'An error occured. The message could not be sent.', PLUGIN_TEXT_DOMAIN );
			}

		}

		set_transient( self::FORM_TRANSIENT_NAME, $form_state, 120 );

		// return to the form
		$redirect_url = $_SERVER['HTTP_REFERER'];
		wp_redirect( $redirect_url );
		exit;

	}

	public function load_scripts() {
		global $post;

		$content = $post->post_content;
		if ( has_shortcode( $content, self::SHORTCODE_NAME ) ) {
			Loader::load_scripts();
		}

	}

	public function init() {
		add_shortcode( self::SHORTCODE_NAME, [ $this, 'process_shortcode' ] );

		add_action( 'admin_post_simply_send_form_submit', [ $this, 'submit_form' ] );
		add_action( 'admin_post_nopriv_simply_send_form_submit', [ $this, 'submit_form' ] );

		add_action( 'wp_enqueue_scripts', [ $this, 'load_scripts' ] );
	}

	public static function load() {
		self::get_instance();
	}

}