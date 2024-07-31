<?php

namespace Imandresi\TailorMailPlus\Controllers;

use Imandresi\TailorMailPlus\Models\ContactFormsModel;
use Imandresi\TailorMailPlus\System\Mailer\MailerInterface;
use Imandresi\TailorMailPlus\System\Mailer\MailerProvider;
use Imandresi\TailorMailPlus\System\Mailer\MailerWpMail;
use const Imandresi\TailorMailPlus\ACTION_HOOK_CONTACT_FORM_MAIL_SENT;
use const Imandresi\TailorMailPlus\ACTION_HOOK_PROCESS_CONTACT_FORM_DATA;
use const Imandresi\TailorMailPlus\FILTER_HOOK_DEFINE_MAILER_SERVICE;
use const Imandresi\TailorMailPlus\PLUGIN_TEXT_DOMAIN;

class SendMailController {

	protected static function prepare_mail_fields( array $form_data, array $mail_template ): array {
		$global_fields = [
			'_site_title'       => get_bloginfo( 'name' ),
			'_site_url'         => get_site_url(),
			'_site_admin_email' => get_bloginfo( 'admin_email' ),
		];

		$fields = array_merge( $global_fields, $form_data );

		$mail_fiels_data = array_map( function ( $template ) use ( $fields ) {
			foreach ( $fields as $field_name => $field_value ) {
				$field_name = "[{$field_name}]";
				$template   = str_replace( $field_name, $field_value, $template );
			}

			return $template;
		}, $mail_template );

		return $mail_fiels_data;

	}

	protected static function send_mail( $mail_data, int $contact_form_id, &$mailing_status ): bool {

		$mailer = MailerProvider::get_active_mailer_instance();

		/**
		 * Filter used to change the current Mailer Service
		 *
		 * @param string[] $mail_data
		 * @param int $contact_form_id
		 *
		 * @var MailerInterface $mailer
		 */
		$mailer = apply_filters( FILTER_HOOK_DEFINE_MAILER_SERVICE, $mailer, $mail_data, $contact_form_id );

		$mail_headers = trim( $mail_data['headers'] );
		if ( $mail_data['from'] ) {
			$mail_headers .= "\nFrom: " . $mail_data['from'];
		}

		$mailing_status = [];

		$is_sent = $mailer->send_mail(
			$mail_data['to'],
			$mail_data['subject'],
			$mail_data['message'],
			$mail_headers
		);

		$mailing_status = $mailer->last_status();

		return $is_sent;
	}

	public static function process_contact_form_data( $form_data, int $contact_form_id, $form_state ) {
		$contact_form  = ContactFormsModel::get_data( $contact_form_id );
		$mail_template = $contact_form['meta'][ ContactFormsModel::POST_META_DATA_SLUG ]['mail_template'];

		if ( ! $mail_template ) {
			$form_state['status']         = 'errors';
			$form_state['status_message'] = esc_html__( 'Mail template error', PLUGIN_TEXT_DOMAIN );
			$form_state['errors']         = [];

			return $form_state;
		}

		$mail_fields_data = self::prepare_mail_fields( $form_data, $mail_template );

		// sending the mail
		$mail_is_sent = self::send_mail( $mail_fields_data, $contact_form_id, $mailing_status );

		if ( $mail_is_sent ) {
			$form_state['status']         = 'success';
			$form_state['status_message'] = esc_html__( 'Your message is sent successfully', PLUGIN_TEXT_DOMAIN );
			$form_state['form_data']      = [];
			$form_state['errors']         = [];

			/**
			 * Action called after the contact form is sent by mail
			 *
			 * @param string[] $form_data Array of each form field name/value pairs
			 * @param string[] $mail_fields_data Array of mail data (to/from/subject/message) to be sent
			 *
			 */
			do_action( ACTION_HOOK_CONTACT_FORM_MAIL_SENT, $form_data, $mail_fields_data, $contact_form_id );

		}
		else {
			$form_state['status']         = 'errors';
			$form_state['status_message'] = $mailing_status['status_message'];
			$form_state['errors']         = [];
		}

		return $form_state;

	}

	public static function load(): void {
		add_filter( ACTION_HOOK_PROCESS_CONTACT_FORM_DATA, [ self::class, 'process_contact_form_data' ], 10, 3 );

	}

}