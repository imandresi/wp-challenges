<?php

namespace Imandresi\SimplySend;

use Imandresi\SimplySend\Controllers\ContactFormController;
use Imandresi\SimplySend\System\Helper;
use Imandresi\SimplySend\System\Singleton;

class Loader extends Singleton {

	public function load_dependencies() {
		ContactFormController::load();

	}

	public function language_setup() {
		load_plugin_textdomain(
			PLUGIN_TEXT_DOMAIN,
			false,
			PLUGIN_LANGUAGES_DIR
		);
	}

	public static function load_scripts() {

		// load bootstrap
		if ( ! Helper::is_bootstrap_enqueued() ) {
			wp_enqueue_style(
				'bootstrap',
				PLUGIN_ASSETS_PLUGINS_URI . 'bootstrap/css/bootstrap.min.css'
			);

			wp_enqueue_script(
				'bootstrap',
				PLUGIN_ASSETS_PLUGINS_URI . 'bootstrap/js/bootstrap.bundle.min.js'
			);
		}

		// enqueue styles.css
		$styles_filename = PLUGIN_ASSETS_CSS_DIR . 'styles.css';

		wp_enqueue_style(
			'simply-send',
			PLUGIN_ASSETS_CSS_URI . 'styles.css',
			[ 'bootstrap' ],
			PLUGIN_VERSION . '_' . filemtime( $styles_filename ),
			'all'
		);

		// enqueue scripts.js
		$script_filename = PLUGIN_ASSETS_SCRIPTS_DIR . 'script.js';

		wp_enqueue_script(
			'simply-send',
			PLUGIN_ASSETS_SCRIPTS_URI . 'script.js',
			[ 'bootstrap' ],
			PLUGIN_VERSION . '_' . filemtime( $script_filename )
		);

	}

	public function init() {
		$this->load_dependencies();
		$this->language_setup();
	}

	public static function run() {
		add_action( 'plugins_loaded', function () {
			self::get_instance();
		} );
	}

}
