<?php

namespace Imandresi\TailorMail\Core;

use Imandresi\TailorMail\Controllers\ContactEntriesController;
use Imandresi\TailorMail\Controllers\ContactFormsController;
use Imandresi\TailorMail\Core\Admin\AdminMenu;
use Imandresi\TailorMail\Models\ContactEntriesModel;
use Imandresi\TailorMail\Models\ContactFormsModel;
use Imandresi\TailorMail\System\Singleton;
use const Imandresi\TailorMail\PLUGIN_ASSETS_CSS_DIR;
use const Imandresi\TailorMail\PLUGIN_ASSETS_CSS_URI;
use const Imandresi\TailorMail\PLUGIN_ASSETS_SCRIPTS_DIR;
use const Imandresi\TailorMail\PLUGIN_ASSETS_SCRIPTS_URI;
use const Imandresi\TailorMail\PLUGIN_VERSION;

class AdminLoader extends Singleton {

	public function load_scripts() {
		add_action( 'admin_enqueue_scripts', function () {
			$css_version = PLUGIN_VERSION . '_' . filemtime( PLUGIN_ASSETS_CSS_DIR . 'admin-styles.css' );
			wp_enqueue_style( 'tailor-mail-admin', PLUGIN_ASSETS_CSS_URI . 'admin-styles.css', [], $css_version );

			$js_version = PLUGIN_VERSION . '_' . filemtime( PLUGIN_ASSETS_SCRIPTS_DIR . 'admin-script.js' );
			wp_enqueue_script( 'tailor-mail-admin', PLUGIN_ASSETS_SCRIPTS_URI . 'admin-script.js', [], $js_version );
		} );
	}

	public function init(): void {
		if ( ! is_admin() ) {
			return;
		}

		AdminMenu::load();
		ContactFormsModel::init();
		ContactEntriesModel::init();
		ContactFormsController::init();
		ContactEntriesController::init();

		$this->load_scripts();

	}

	public static function load() {
		self::get_instance();
	}

}