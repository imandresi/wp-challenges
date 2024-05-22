<?php

namespace Imandresi\SimplySend;

use Imandresi\SimplySend\System\Singleton;

class Loader extends Singleton {

	public function load_dependencies() {

	}

	public function language_setup() {
		load_child_theme_textdomain( PLUGIN_TEXT_DOMAIN, PLUGIN_LANGUAGES_DIR );
	}
	public function init() {
		$this->language_setup();
		$this->load_dependencies();
	}

	public static function run() {
		self::get_instance();
	}

}
