<?php

namespace Imandresi\TailorMailPlus\Views;

use Imandresi\TailorMailPlus\Views\AbstractView;

class MailerSendGridView extends AbstractView {

	public static function settings_panel($settings): string {
		$output = self::render( 'mailers/mailer_sendgrid_settings_panel.html.twig', [
			'mailer_settings' => $settings

		] );

		return $output;
	}

}