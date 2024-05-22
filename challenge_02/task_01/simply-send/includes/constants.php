<?php

namespace Imandresi\SimplySend;

use Imandresi\SimplySend\System\Helper;

define( __NAMESPACE__ . '\PLUGIN_VERSION', '1.0' );
define( __NAMESPACE__ . '\PLUGIN_SLUG', 'simply-send' );
define( __NAMESPACE__ . '\PLUGIN_TEXT_DOMAIN', PLUGIN_SLUG );

define( __NAMESPACE__ . '\PLUGIN_ROOT_DIR', Helper::normalize_path( dirname( __DIR__ ), true ) );
define( __NAMESPACE__ . '\PLUGIN_ENTRY', PLUGIN_ROOT_DIR . 'plugin.php' );
define( __NAMESPACE__ . '\PLUGIN_URI', plugin_dir_url( PLUGIN_ENTRY ) );

define( __NAMESPACE__ . '\PLUGIN_TEMPLATES_DIR', PLUGIN_ROOT_DIR . 'templates/' );
define( __NAMESPACE__ . '\PLUGIN_LANGUAGES_DIR', PLUGIN_ROOT_DIR . 'languages/' );

define( __NAMESPACE__ . '\PLUGIN_ASSETS', 'assets/' );
define( __NAMESPACE__ . '\PLUGIN_ASSETS_CSS_URI', PLUGIN_ASSETS . 'css/' );
define( __NAMESPACE__ . '\PLUGIN_ASSETS_SCRIPTS_URI', PLUGIN_ASSETS . 'js/' );

