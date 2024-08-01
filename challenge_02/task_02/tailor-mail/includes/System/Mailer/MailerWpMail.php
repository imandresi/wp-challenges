<?php

namespace Imandresi\TailorMail\System\Mailer;

use Imandresi\TailorMail\System\Mailer\MailerInterface;
use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class MailerWpMail implements MailerInterface {
	private array $_last_status;

	public function send_mail( $to, $subject, $message, $headers = '', $attachments = [] ): bool {
		$this->_last_status = [
			'status'         => 'errors',
			'status_message' => esc_html__( 'An error occurred when sending the mail', PLUGIN_TEXT_DOMAIN )
		];

		$is_sent = wp_mail( $to, $subject, $message, $headers, $attachments );

		if ($is_sent) {
			$this->_last_status = [
				'status'         => 'success',
				'status_message' => esc_html__( 'Your message is sent successfully', PLUGIN_TEXT_DOMAIN )
			];
		}

		return $is_sent;

	}

	public function last_status(): array {
		return $this->_last_status;
	}

}