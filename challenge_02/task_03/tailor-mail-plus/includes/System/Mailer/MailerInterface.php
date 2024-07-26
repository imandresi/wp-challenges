<?php

namespace Imandresi\TailorMailPlus\System\Mailer;

interface MailerInterface {

	public function send_mail( $to, $subject, $message, $headers = '', $attachments = [] ): bool;

}