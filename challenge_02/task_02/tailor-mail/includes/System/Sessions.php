<?php

namespace Imandresi\TailorMail\System;

use Imandresi\TailorMail\System\Singleton;
use const Imandresi\TailorMail\PLUGIN_IDENTIFIER;

class Sessions extends Singleton {
	const SESSION_NAME = 'imandresi/' . PLUGIN_IDENTIFIER;

	private $session;

	public static function &get_session_var() {
		$instance = self::get_instance();

		return $_SESSION[ self::SESSION_NAME ];
	}

	public function init() {
		if ( ! session_id() ) {
			session_start();
		}

		$_SESSION[ self::SESSION_NAME ] = [];
	}

	public static function load(): void {
		self::get_instance();
	}

}