<?php

namespace Imandresi\TailorMailPlus\Core;

use Imandresi\TailorMailPlus\Controllers\ContactFormManagerController;
use Imandresi\TailorMailPlus\Controllers\ShortcodeController;
use Imandresi\TailorMailPlus\System\Helper;
use const Imandresi\TailorMailPlus\PLUGIN_ASSETS_CSS_DIR;
use const Imandresi\TailorMailPlus\PLUGIN_ASSETS_CSS_URI;
use const Imandresi\TailorMailPlus\PLUGIN_ASSETS_PLUGINS_URI;
use const Imandresi\TailorMailPlus\PLUGIN_ASSETS_SCRIPTS_DIR;
use const Imandresi\TailorMailPlus\PLUGIN_ASSETS_SCRIPTS_URI;
use const Imandresi\TailorMailPlus\PLUGIN_VERSION;

class FrontLoader {

	public static function load_scripts() {
		global $post;

		$content = $post->post_content ?? '';
		if ( ! has_shortcode( $content, ShortcodeController::CONTACT_FORM_SHORTCODE_TAG ) ) {
			return;
		}

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

	public static function load() {
		if ( is_admin() ) {
			return;
		}

		add_action( 'wp_enqueue_scripts', [ self::class, 'load_scripts' ] );

	}

}