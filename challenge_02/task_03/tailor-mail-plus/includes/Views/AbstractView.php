<?php

namespace Imandresi\TailorMail\Views;

use Imandresi\TailorMail\System\Sessions;
use Imandresi\TailorMail\System\Singleton;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use const Imandresi\TailorMail\PLUGIN_IDENTIFIER;
use const Imandresi\TailorMail\PLUGIN_SLUG;
use const Imandresi\TailorMail\PLUGIN_TEMPLATES_DIR;

abstract class AbstractView extends Singleton {
	protected Environment $twig;

	public function init() {
		$instance       = self::get_instance();
		$instance->twig = new Environment( new FilesystemLoader( PLUGIN_TEMPLATES_DIR ) );
	}

	protected static function render( $template_filename, $attributes = [] ): string {
		$instance = self::get_instance();

		$attributes = array_merge(
			$attributes,
			[
				'PLUGIN_IDENTIFIER' => PLUGIN_IDENTIFIER,
				'PLUGIN_SLUG'       => PLUGIN_SLUG,
				'SESSIONS'          => Sessions::get_session_var()
			]
		);

		// render template
		$output = $instance->twig->render( $template_filename, $attributes );

		return $output;

	}

}