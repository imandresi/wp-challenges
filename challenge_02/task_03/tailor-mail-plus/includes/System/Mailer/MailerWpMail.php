<?php

namespace Imandresi\TailorMailPlus\System\Mailer;

use Imandresi\TailorMailPlus\System\Mailer\MailerInterface;

class MailerWpMail implements MailerInterface {

	public function send_mail( $to, $subject, $message, $headers = '', $attachments = [] ): bool {
		return wp_mail( $to, $subject, $message, $headers, $attachments );

	}
}