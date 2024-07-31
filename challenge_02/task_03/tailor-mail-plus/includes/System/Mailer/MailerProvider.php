<?php

namespace Imandresi\TailorMailPlus\System\Mailer;

use Imandresi\TailorMailPlus\Views\MailerProviderView;
use const Imandresi\TailorMailPlus\PLUGIN_IDENTIFIER;

class MailerProvider {

	const ACTION_MAILER_SETTINGS_SAVE = PLUGIN_IDENTIFIER . '_mailer_settings_save';
	const OPTION_NAME_MAILERS = PLUGIN_IDENTIFIER . '_mailers';

	const NONCE = PLUGIN_IDENTIFIER . '_mailer_settings_nonce';

	/**
	 * @var string[]
	 */
	private static array $mailers;

	public static function get_mailers(): array {
		return self::$mailers;
	}

	public static function display_settings_panel() {
		$settings = self::get_settings();
		MailerProviderView::display_settings_panel( $settings );

	}

	public static function get_settings(): array {
		$settings = get_option( self::OPTION_NAME_MAILERS, [] );

		return $settings;
	}

	public static function save_settings(): void {

		// verify nonce
		if ( ! wp_verify_nonce( $_POST['_wpnonce'],self::NONCE ) ) {
			wp_die( 'Your nonce could not be verified.' );
		}

		// save settings
		$mailer_settings = $_POST['mailer_settings'] ?? [];
		update_option( self::OPTION_NAME_MAILERS, $mailer_settings );

		// redirect
		$url = $_POST['_wp_http_referer'];
		wp_redirect($url);

	}

	public function get_active_mailer_instance(): MailerInterface {
		$mailer_classname = self::get_active_mailer_classname();
		$settings         = self::get_settings();

		switch ( $mailer_classname ) {
			case MailerSendGrid::class:
				$sendgrid_api_key = $settings['mailers']['sendgrid']['api_key'] ?? false;
				$mailer           = new MailerSendGrid( $sendgrid_api_key );
				break;

			case MailerWpMail::class:
			default:
				$mailer = new MailerWpMail();

		}

		return $mailer;

	}

	public static function init(): void {
		self::$mailers = [
			MailerWpMail::class,
			MailerSendGrid::class
		];

		$hook_name = 'admin_post_' . self::ACTION_MAILER_SETTINGS_SAVE;
		add_action( $hook_name, [ self::class, 'save_settings' ] );

	}

	private static function get_active_mailer_classname(): string {
		$settings = self::get_settings();
		$mailer   = $settings['active_mailer'] ?? false;

		if ( ! $mailer ) {
			$mailer = __NAMESPACE__ . '\\' . $mailer;
		}

		if ( ! $mailer instanceof MailerInterface ) {
			$mailer = false;
		}

		return $mailer;
	}

}