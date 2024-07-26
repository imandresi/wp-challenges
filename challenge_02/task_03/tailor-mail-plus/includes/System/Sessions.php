<?php

namespace Imandresi\TailorMailPlus\System;

use Imandresi\TailorMailPlus\System\Singleton;
use const Imandresi\TailorMailPlus\PLUGIN_IDENTIFIER;

class Sessions extends Singleton {
	const SESSION_NAME = 'imandresi/' . PLUGIN_IDENTIFIER;

	private $session;

	public static function &get_session_var() {
		self::get_instance();

		return $_SESSION[ self::SESSION_NAME ];
	}

	public function init() {
		if ( ! session_id() ) {
			session_start();
		}

		if (!isset($_SESSION[self::SESSION_NAME])) {
			$_SESSION[ self::SESSION_NAME ] = [];
		}
	}

	public static function load(): void {
		self::get_instance();
	}

}