<?php

namespace Imandresi\TailorMail\Core\Admin;

use Imandresi\TailorMail\System\Singleton;
use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class AdminMenu extends Singleton {
	const MENU_CAPABILITY = 'edit_posts';
	const SLUG_MAIN_MENU = 'tailor_mail_main_menu';

	public function action_admin_menu() {
		global $menu, $submenu;

		add_menu_page(
			__( 'TAILOR MAIL - Dashboard', PLUGIN_TEXT_DOMAIN ),
			'TAILOR MAIL',
			self::MENU_CAPABILITY,
			self::SLUG_MAIN_MENU,
			function () {
			},
			'dashicons-forms',
			3
		);

		add_submenu_page(
			self::SLUG_MAIN_MENU,
			__( 'Contact Forms', PLUGIN_TEXT_DOMAIN ),
			__( 'Contact Forms', PLUGIN_TEXT_DOMAIN ),
			self::MENU_CAPABILITY,
			'edit.php?post_type=tailor_mail_forms'
		);

		add_submenu_page(
			self::SLUG_MAIN_MENU,
			__( 'Add New Form', PLUGIN_TEXT_DOMAIN ),
			__( 'Add New Form', PLUGIN_TEXT_DOMAIN ),
			self::MENU_CAPABILITY,
			'post-new.php?post_type=tailor_mail_forms'
		);

		unset( $submenu[ self::SLUG_MAIN_MENU ][0] );

	}

	public function init(): void {
		add_action( 'admin_menu', [ $this, 'action_admin_menu' ] );

	}

	public static function load(): void {
		self::get_instance();

	}

}