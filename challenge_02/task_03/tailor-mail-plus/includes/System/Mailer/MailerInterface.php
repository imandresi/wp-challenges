<?php

namespace Imandresi\TailorMailPlus\System\Mailer;

interface MailerInterface {

	public static function get_name() : string;

	public static function settings_panel($settings): string;

	public function send_mail( $to, $subject, $message, $headers = '', $attachments = [] ): bool;

}