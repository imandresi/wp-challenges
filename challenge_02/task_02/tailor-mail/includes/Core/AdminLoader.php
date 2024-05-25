<?php

namespace Imandresi\TailorMail\Core;

use Imandresi\TailorMail\Controllers\ContactFormsController;
use Imandresi\TailorMail\Core\Admin\AdminMenu;
use Imandresi\TailorMail\Models\ContactFormsModel;
use Imandresi\TailorMail\System\Singleton;
use const Imandresi\TailorMail\PLUGIN_ASSETS_CSS_DIR;
use const Imandresi\TailorMail\PLUGIN_ASSETS_CSS_URI;
use const Imandresi\TailorMail\PLUGIN_VERSION;

class AdminLoader extends Singleton {

	public function load_styles() {
		add_action( 'admin_enqueue_scripts', function () {
			$css_version = PLUGIN_VERSION . '_' . filemtime( PLUGIN_ASSETS_CSS_DIR . 'admin-styles.css' );
			wp_enqueue_style( 'tailor-mail-admin', PLUGIN_ASSETS_CSS_URI . 'admin-styles.css', [], $css_version );
		} );
	}

	public function init(): void {
		if ( ! is_admin() ) {
			return;
		}

		AdminMenu::load();
		ContactFormsModel::init();
		ContactFormsController::init();

		$this->load_styles();

	}

	public static function load() {
		self::get_instance();
	}

}