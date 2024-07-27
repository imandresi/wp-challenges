<?php

namespace Imandresi\TailorMailPlus\Core;

use Imandresi\TailorMailPlus\Models\ContactEntriesModel;
use Imandresi\TailorMailPlus\System\Helper;
use const Imandresi\TailorMailPlus\PLUGIN_NAME;
use const Imandresi\TailorMailPlus\PLUGIN_ENTRY;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class PluginManager {

	const ACTIVATION_FLAG_FIELD_NAME = PLUGIN_NAME . '_activate';

	public static function activate() {
		// no activation if the table wp_tailormailplus_entries exists
		if ( Helper::table_exists( ContactEntriesModel::ENTRIES_TABLE_NAME ) ) {
			return;
		}

		// activate
		ContactEntriesModel::create_tables();

	}

	public static function deactivate() {
		// Put the plugin deactivation code here
	}

	public static function uninstall() {
		if ( ! Helper::table_exists( ContactEntriesModel::ENTRIES_TABLE_NAME ) ) {
			return;
		}

		Helper::delete_table(ContactEntriesModel::ENTRIES_TABLE_NAME);

	}

	public static function action_hook_activate() {
		update_option( self::ACTIVATION_FLAG_FIELD_NAME, 1 );
	}

	public static function check_activation() {
		$to_be_activated = get_option( self::ACTIVATION_FLAG_FIELD_NAME );
		if ( $to_be_activated ) {
			self::activate();
			delete_option( self::ACTIVATION_FLAG_FIELD_NAME );
		}
	}

	/**
	 * Initialization
	 */
	public static function setup() {
		register_activation_hook( PLUGIN_ENTRY, array( self::class, 'action_hook_activate' ) );
		register_deactivation_hook( PLUGIN_ENTRY, array( self::class, 'deactivate' ) );
		register_uninstall_hook( PLUGIN_ENTRY, array( self::class, 'uninstall' ) );

		// checks if an activation is to be done
		add_action( 'init', array( self::class, 'check_activation' ) );

	}

}

