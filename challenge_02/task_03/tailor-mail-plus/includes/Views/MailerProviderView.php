<?php

namespace Imandresi\TailorMailPlus\Views;

use Imandresi\TailorMailPlus\System\Mailer\MailerInterface;
use Imandresi\TailorMailPlus\System\Mailer\MailerProvider;
use Imandresi\TailorMailPlus\Views\AbstractView;

class MailerProviderView extends AbstractView {

	public static function display_settings_panel( $settings ) {
		$nonce_field = wp_nonce_field( MailerProvider::NONCE );

		$mailer_options   = [];
		$mailer_templates = [];
		$mailers          = MailerProvider::get_mailers();

		/**
		 * @var MailerInterface $mailer_class
		 */
		foreach ( $mailers as $mailer_class ) {
			$mailer_basename  = basename( $mailer_class );
			$mailer_options[] = [
				'name'     => $mailer_class::get_name(),
				'basename' => $mailer_basename,
				'value'    => $mailer_class
			];

			$mailer_templates[] = [
				'basename' => $mailer_basename,
				'template' => $mailer_class::settings_panel($settings),
			];

		}


		$output = self::render( 'mailers/mailer_provider_settings_panel.html.twig', [
			'form_action_url'  => admin_url( 'admin-post.php' ),
			'form_action'      => MailerProvider::ACTION_MAILER_SETTINGS_SAVE,
			'nonce_field'      => $nonce_field,
			'mailer_options'   => $mailer_options,
			'mailer_templates' => $mailer_templates,
			'mailer_settings'  => $settings,
		] );

		print $output;

	}
}