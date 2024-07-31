<?php

namespace Imandresi\TailorMailPlus\System\Mailer;

use Imandresi\TailorMailPlus\System\Mailer\MailerInterface;
use Imandresi\TailorMailPlus\Views\MailerWpMailView;

class MailerWpMail implements MailerInterface {

	public function send_mail( $to, $subject, $message, $headers = '', $attachments = [] ): bool {
		return wp_mail( $to, $subject, $message, $headers, $attachments );

	}

	public static function get_name(): string {
		return 'WP Mail';
	}

	public static function settings_panel($settings): string {
		return MailerWpMailView::settings_panel($settings);
	}

}