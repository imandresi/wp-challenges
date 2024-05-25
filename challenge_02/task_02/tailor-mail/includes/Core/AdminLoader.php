<?php

namespace Imandresi\TailorMail\Core;

use Imandresi\TailorMail\Core\Admin\AdminMenu;
use Imandresi\TailorMail\Models\ContactForms;
use Imandresi\TailorMail\System\Singleton;

class AdminLoader extends Singleton {

	public function init(): void {
		if ( ! is_admin() ) {
			return;
		}

		AdminMenu::load();
		ContactForms::init();

	}

	public static function load() {
		self::get_instance();
	}

}