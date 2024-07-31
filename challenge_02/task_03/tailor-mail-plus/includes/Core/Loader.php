<?php

namespace Imandresi\TailorMailPlus\Core;

use Imandresi\TailorMailPlus\Controllers\SendMailController;
use Imandresi\TailorMailPlus\Controllers\ShortcodeController;
use Imandresi\TailorMailPlus\Models\ContactEntriesModel;
use Imandresi\TailorMailPlus\System\Helper;
use Imandresi\TailorMailPlus\System\Mailer\MailerSendGrid;
use Imandresi\TailorMailPlus\System\Sessions;
use Imandresi\TailorMailPlus\System\Singleton;
use const Imandresi\TailorMailPlus\FILTER_HOOK_AFTER_RENDER_CONTACT_FORM_FIELD;
use const Imandresi\TailorMailPlus\PLUGIN_LANGUAGES_DIR;
use const Imandresi\TailorMailPlus\PLUGIN_TEXT_DOMAIN;

class Loader extends Singleton {

	public function load_dependencies() {
		Sessions::load();
		AdminLoader::load();
		FrontLoader::load();
		ShortcodeController::load();
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
		PluginManager::setup();
		add_action( 'plugins_loaded', function () {
			self::get_instance();
		} );
	}

}
