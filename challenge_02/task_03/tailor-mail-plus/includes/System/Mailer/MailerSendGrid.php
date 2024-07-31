<?php

namespace Imandresi\TailorMailPlus\System\Mailer;

use Imandresi\TailorMailPlus\System\Mailer\MailerInterface;
use Imandresi\TailorMailPlus\Views\MailerSendGridView;

class MailerSendGrid implements MailerInterface {
	private string $api_key;

	public function __construct($api_key) {
		$this->api_key = $api_key;
	}

	public static function get_name(): string {
		return 'SendGrid';
	}

	public static function settings_panel($settings): string {
		return MailerSendGridView::settings_panel($settings);
	}

	public function send_mail( $to, $subject, $message, $headers = '', $attachments = [] ): bool {
		// TODO: Implement send_mail() method.
	}
}