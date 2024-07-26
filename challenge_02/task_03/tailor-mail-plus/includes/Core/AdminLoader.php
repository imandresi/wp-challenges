<?php

namespace Imandresi\TailorMailPlus\Core;

use Imandresi\TailorMailPlus\Controllers\ContactEntriesController;
use Imandresi\TailorMailPlus\Controllers\ContactFormsController;
use Imandresi\TailorMailPlus\Core\Admin\AdminMenu;
use Imandresi\TailorMailPlus\Models\ContactEntriesModel;
use Imandresi\TailorMailPlus\Models\ContactFormsModel;
use Imandresi\TailorMailPlus\System\Singleton;
use const Imandresi\TailorMailPlus\PLUGIN_ASSETS_CSS_DIR;
use const Imandresi\TailorMailPlus\PLUGIN_ASSETS_CSS_URI;
use const Imandresi\TailorMailPlus\PLUGIN_ASSETS_PLUGINS_DIR;
use const Imandresi\TailorMailPlus\PLUGIN_ASSETS_PLUGINS_URI;
use const Imandresi\TailorMailPlus\PLUGIN_ASSETS_SCRIPTS_DIR;
use const Imandresi\TailorMailPlus\PLUGIN_ASSETS_SCRIPTS_URI;
use const Imandresi\TailorMailPlus\PLUGIN_VERSION;

class AdminLoader extends Singleton {

	public function load_scripts() {
		add_action( 'admin_enqueue_scripts', function () {
			$screen = get_current_screen();

			// only loads contact form toolbar react script/styles in contact form admin edit page
			if ( $screen->id == ContactFormsModel::POST_TYPE_SLUG ) {

				// loads style
				$css_version = PLUGIN_VERSION . '_' . filemtime( PLUGIN_ASSETS_PLUGINS_DIR . 'contact-form-toolbar/app.css' );
				wp_enqueue_style( 'tailor-mail-plus-contact-form-toolbar', PLUGIN_ASSETS_PLUGINS_URI . 'contact-form-toolbar/app.css', [], $css_version );

				// loads script
				$script_dependencies = array(
					'dependencies' => null,
					'version'      => null,
				);

				if ( file_exists( PLUGIN_ASSETS_PLUGINS_DIR . 'contact-form-toolbar/app.asset.php' ) ) {
					$script_dependencies = require PLUGIN_ASSETS_PLUGINS_DIR . 'contact-form-toolbar/app.asset.php';
				}

				wp_enqueue_script(
					'tailor-mail-plus-contact-form-toolbar',
					PLUGIN_ASSETS_PLUGINS_URI . 'contact-form-toolbar/app.js',
					$script_dependencies['dependencies'],
					$script_dependencies['version'],
					true
				);

			}

			$css_version = PLUGIN_VERSION . '_' . filemtime( PLUGIN_ASSETS_CSS_DIR . 'admin-styles.css' );
			wp_enqueue_style( 'tailor-mail-plus-admin', PLUGIN_ASSETS_CSS_URI . 'admin-styles.css', [], $css_version );

			$js_version = PLUGIN_VERSION . '_' . filemtime( PLUGIN_ASSETS_SCRIPTS_DIR . 'admin-script.js' );
			wp_enqueue_script( 'tailor-mail-plus-admin', PLUGIN_ASSETS_SCRIPTS_URI . 'admin-script.js', [], $js_version );
		} );
	}

	public function init(): void {
		if ( ! is_admin() ) {
			return;
		}

		AdminMenu::load();
		ContactFormsModel::init();
		ContactEntriesModel::init();
		ContactFormsController::init();
		ContactEntriesController::init();

		$this->load_scripts();

	}

	public static function load() {
		self::get_instance();
	}

}