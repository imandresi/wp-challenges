<?php

namespace Imandresi\TailorMail\System\Mailer;

interface MailerInterface {

	public function send_mail( $to, $subject, $message, $headers = '', $attachments = [] ): bool;

	public function last_status(): array;


}