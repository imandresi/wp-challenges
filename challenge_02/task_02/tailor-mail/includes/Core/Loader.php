<?php

namespace Imandresi\TailorMail\Core;

use Imandresi\TailorMail\Controllers\SendMailController;
use Imandresi\TailorMail\Core\Classes\ShortcodeManager;
use Imandresi\TailorMail\System\Sessions;
use Imandresi\TailorMail\System\Singleton;
use const Imandresi\TailorMail\PLUGIN_LANGUAGES_DIR;
use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class Loader extends Singleton {

	public function load_dependencies() {
		Sessions::load();
		AdminLoader::load();
		FrontLoader::load();
		ShortcodeManager::load();
		SendMailController::load();

	}

	public function language_setup() {
		load_plugin_textdomain(
			PLUGIN_TEXT_DOMAIN,
			false,
			PLUGIN_LANGUAGES_DIR
		);
	}

	public function init() {
		$this->language_setup();
		$this->load_dependencies();
	}

	public static function run() {
		add_action( 'plugins_loaded', function () {
			self::get_instance();
		} );
	}

}
