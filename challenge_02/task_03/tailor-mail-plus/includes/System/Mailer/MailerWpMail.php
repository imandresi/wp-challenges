<?php

namespace Imandresi\TailorMailPlus\System\Mailer;

use Imandresi\TailorMailPlus\System\Mailer\MailerInterface;
use Imandresi\TailorMailPlus\Views\MailerWpMailView;
use const Imandresi\TailorMailPlus\PLUGIN_TEXT_DOMAIN;

class MailerWpMail implements MailerInterface {
	private array $_last_status;

	public function send_mail( $to, $subject, $message, $headers = '', $attachments = [] ): bool {
		$this->_last_status = [
			'status'         => 'errors',
			'status_message' => esc_html__( 'An error occured when sending the mail', PLUGIN_TEXT_DOMAIN )
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

	public static function get_name(): string {
		return 'WP Mail';
	}

	public static function settings_panel( $settings ): string {
		return MailerWpMailView::settings_panel( $settings );
	}

	public function last_status(): array {
		return $this->_last_status;
	}


}