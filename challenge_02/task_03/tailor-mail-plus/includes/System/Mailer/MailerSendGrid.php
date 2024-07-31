<?php

namespace Imandresi\TailorMailPlus\System\Mailer;

use Imandresi\TailorMailPlus\System\Mailer\MailerInterface;
use Imandresi\TailorMailPlus\Views\MailerSendGridView;
use SendGrid\Mail\Mail;

class MailerSendGrid implements MailerInterface {
	private string $api_key;

	public function __construct( $api_key ) {
		$this->api_key = $api_key;
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

	public function send_mail( $to, $subject, $message, $headers = '', $attachments = [] ): bool {
		$headers_array = self::raw_headers_to_array( $headers );

		// process FROM header
		if ( isset( $headers_array['From'] ) ) {
			$from = self::parse_email( $headers_array['From'] );
			unset($headers_array['From']);
		} else {
			$from = [
				get_option( 'admin_email' ),
				get_option( 'blogname' )
			];
		}

		// process TO email
		$to = self::parse_email($to);

		// process REPLY-TO header
		$reply_to = '';
		if ( isset( $headers_array['Reply-To'] ) ) {
			$reply_to = self::parse_email( $headers_array['Reply-To'] );
			unset($headers_array['Reply-To']);
		}

		// prepare email
		$email = new Mail();
		$email->setFrom($from[0], $from[1] ?? null);

		if ($reply_to) {
			$email->setReplyTo( $reply_to[0], $reply_to[1] ?? null );
		}

		$email->addTo( $to[0], $to[1] ?? null );
		$email->addHeaders( $headers_array );
		$email->setSubject( $subject );
		$email->addContent( 'text/plain', strip_tags( $message ) );
		$email->addContent( 'text/html', nl2br( $message ) );

		$sendgrid = new \SendGrid( $this->api_key );
		$status = false;
		try {
			$response = $sendgrid->send( $email );
			$status = $response->statusCode() == 202;
		} catch ( \Exception $e ) {

		}

		return $status;

	}
}