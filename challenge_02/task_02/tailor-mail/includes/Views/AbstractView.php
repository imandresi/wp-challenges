<?php

namespace Imandresi\TailorMail\Views;

use Imandresi\TailorMail\System\Singleton;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use const Imandresi\TailorMail\PLUGIN_TEMPLATES_DIR;

class AbstractView extends Singleton {
	protected Environment $twig;

	public function init() {
		$instance       = self::get_instance();
		$instance->twig = new Environment( new FilesystemLoader( PLUGIN_TEMPLATES_DIR ) );

	}

}