<?php

namespace Imandresi\TailorMailPlus\Core\Admin;

use Imandresi\TailorMailPlus\Controllers\ContactEntriesController;
use Imandresi\TailorMailPlus\Models\ContactEntriesModel;
use Imandresi\TailorMailPlus\Models\ContactFormsModel;
use Imandresi\TailorMailPlus\System\Mailer\MailerProvider;
use Imandresi\TailorMailPlus\System\Singleton;
use Imandresi\TailorMailPlus\Views\ContactEntriesView;
use const Imandresi\TailorMailPlus\PLUGIN_IDENTIFIER;
use const Imandresi\TailorMailPlus\PLUGIN_TEXT_DOMAIN;

class AdminMenu extends Singleton {
	const MENU_CAPABILITY = 'edit_posts';
	const SLUG_MAIN_MENU = PLUGIN_IDENTIFIER . '_main_menu';
	const SLUG_ENTRIES_MENU = PLUGIN_IDENTIFIER . '_entries_menu';

	const SLUG_MAILER_SETTINGS_MENU = PLUGIN_IDENTIFIER . '_mailer_settings_menu';

	public bool $active_page;

	public function action_admin_menu() {
		global $menu, $submenu;

		add_menu_page(
			__( 'TAILOR MAIL - Dashboard', PLUGIN_TEXT_DOMAIN ),
			'TAILOR MAIL PLUS',
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
			'edit.php?post_type=' . ContactFormsModel::POST_TYPE_SLUG
		);

		add_submenu_page(
			self::SLUG_MAIN_MENU,
			__( 'Add New Form', PLUGIN_TEXT_DOMAIN ),
			__( 'Add New Form', PLUGIN_TEXT_DOMAIN ),
			self::MENU_CAPABILITY,
			'post-new.php?post_type=' . ContactFormsModel::POST_TYPE_SLUG
		);

		add_submenu_page(
			self::SLUG_MAIN_MENU,
			__( 'Contact Form Entries', PLUGIN_TEXT_DOMAIN ),
			__( 'Contact Form Entries', PLUGIN_TEXT_DOMAIN ),
			self::MENU_CAPABILITY,
			self::SLUG_ENTRIES_MENU,
			function () {
				$action = $_GET['action'] ?? false;

				switch ( $action ) {
					case 'view':
						$entry_id = $_GET['entry_id'] ?? false;

						if ( ! $entry_id ) {
							break;
						}

						ContactEntriesView::display_entry( $entry_id );

						return;

				}

				$page_index = $_GET['page_index'] ?? 1;
				ContactEntriesView::display_entries( $page_index );

			}

		);

		add_submenu_page(
			self::SLUG_MAIN_MENU,
			__( 'Mailer Settings', PLUGIN_TEXT_DOMAIN ),
			__( 'Mailer Settings', PLUGIN_TEXT_DOMAIN ),
			self::MENU_CAPABILITY,
			self::SLUG_MAILER_SETTINGS_MENU,
			[ MailerProvider::class, 'display_settings_panel' ]
		);

		unset( $submenu[ self::SLUG_MAIN_MENU ][0] );

		add_action( 'parent_file', function ( $parent_file ) {
			if ( $this->active_page ) {
				$parent_file = self::SLUG_MAIN_MENU;
			}

			return $parent_file;
		}, 10, 1 );

	}

	function define_active_page() {
		$current_screen    = get_current_screen();
		$this->active_page =
			( $current_screen->post_type == ContactFormsModel::POST_TYPE_SLUG );
	}

	public function init(): void {
		$this->active_page = false;
		add_action( 'admin_menu', [ $this, 'action_admin_menu' ] );
		add_action( 'current_screen', [ $this, 'define_active_page' ] );

	}

	public static function load(): void {
		self::get_instance();

	}

}