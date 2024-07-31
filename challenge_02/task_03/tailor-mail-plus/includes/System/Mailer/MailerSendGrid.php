<?php

namespace Imandresi\TailorMailPlus\System\Mailer;

use Imandresi\TailorMailPlus\System\Mailer\MailerInterface;
use Imandresi\TailorMailPlus\Views\MailerSendGridView;
use SendGrid\Mail\Mail;
use const Imandresi\TailorMailPlus\PLUGIN_TEXT_DOMAIN;

class MailerSendGrid implements MailerInterface {
	private string $api_key;
	private array $_last_status;

	public function __construct( $api_key ) {
		$this->api_key      = $api_key;
		$this->_last_status = [];
	}

	public static function get_name(): string {
		return 'SendGrid';
	}

	public static function settings_panel( $settings ): string {
		return MailerSendGridView::settings_panel( $settings );
	}

	private static function raw_headers_to_array( $headers ): array {
		$rows = preg_split( "/\n+/", $headers );
		$rows = array_map( function ( $line ) {
			return preg_split( "/\s*:\s*/", $line, 2 );
		}, $rows );

		$rows = array_combine(
			array_column( $rows, 0 ),
			array_column( $rows, 1 )
		);

		return $rows;
	}

	private static function parse_email( $email ): array {
		$regexp = "/(.+?)\s+<(.+?@.+?)>/";
		if ( preg_match( $regexp, $email, $matches ) ) {
			return [
				$matches[2],
				$matches[1]
			];
		}

		return [
			$email
		];
	}

	public function last_status(): array {
		return $this->_last_status;
	}

	public function send_mail( $to, $subject, $message, $headers = '', $attachments = [] ): bool {
		$headers_array = self::raw_headers_to_array( $headers );

		// process FROM header
		if ( isset( $headers_array['From'] ) ) {
			$from = self::parse_email( $headers_array['From'] );
			unset( $headers_array['From'] );
		} else {
			$from = [
				get_option( 'admin_email' ),
				get_option( 'blogname' )
			];
		}

		// process TO email
		$to = self::parse_email( $to );

		// process REPLY-TO header
		$reply_to = '';
		if ( isset( $headers_array['Reply-To'] ) ) {
			$reply_to = self::parse_email( $headers_array['Reply-To'] );
			unset( $headers_array['Reply-To'] );
		}

		// prepare email
		$email = new Mail();
		$email->setFrom( $from[0], $from[1] ?? null );

		if ( $reply_to ) {
			$email->setReplyTo( $reply_to[0], $reply_to[1] ?? null );
		}

		$email->addTo( $to[0], $to[1] ?? null );
		$email->addHeaders( $headers_array );
		$email->setSubject( $subject );
		$email->addContent( 'text/plain', strip_tags( $message ) );
		$email->addContent( 'text/html', nl2br( $message ) );

		$sendgrid           = new \SendGrid( $this->api_key );
		$status             = false;
		$default_error_msg  = esc_html__( 'An error occured when sending the mail', PLUGIN_TEXT_DOMAIN );
		$this->_last_status = [
			'status'         => 'errors',
			'status_message' => $default_error_msg
		];

		try {
			$response = $sendgrid->send( $email );
			error_log( print_r( $response, true ) );
			$status = $response->statusCode() == 202;

			if ( $status ) {
				$this->_last_status = [
					'status'         => 'success',
					'status_message' => esc_html__( 'Your message is sent successfully', PLUGIN_TEXT_DOMAIN )
				];
			} else {
				$errors    = json_decode( $response->body() );
				$error_msg = $errors->errors[0]->message ?? $default_error_msg;

				$this->_last_status = [
					'status'         => 'errors',
					'status_message' => $error_msg
				];
			}

		} catch ( \Exception $e ) {
			$this->_last_status = [
				'status'         => 'errors',
				'status_message' => $e->getMessage()
			];
		}

		return $status;

	}
}