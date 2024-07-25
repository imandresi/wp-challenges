<?php

namespace Imandresi\TailorMail;

use Imandresi\TailorMail\System\Helper;

define( __NAMESPACE__ . '\PLUGIN_VERSION', '1.0' );

define( __NAMESPACE__ . '\PLUGIN_ROOT_DIR', Helper::normalize_path( dirname( __DIR__ ), true ) );
define( __NAMESPACE__ . '\PLUGIN_ENTRY', PLUGIN_ROOT_DIR . 'plugin.php' );
define( __NAMESPACE__ . '\PLUGIN_URI', plugin_dir_url( PLUGIN_ENTRY ) );

define( __NAMESPACE__ . '\PLUGIN_NAME', plugin_basename( PLUGIN_ROOT_DIR ) );
define( __NAMESPACE__ . '\PLUGIN_SLUG', PLUGIN_NAME );
define( __NAMESPACE__ . '\PLUGIN_IDENTIFIER', str_replace( '-', '_', PLUGIN_NAME ) );
define( __NAMESPACE__ . '\PLUGIN_TEXT_DOMAIN', PLUGIN_NAME );

define( __NAMESPACE__ . '\PLUGIN_TEMPLATES_DIR', PLUGIN_ROOT_DIR . 'templates/' );
define( __NAMESPACE__ . '\PLUGIN_LANGUAGES_DIR', PLUGIN_NAME . '/languages/' );

define( __NAMESPACE__ . '\PLUGIN_ASSETS', 'assets/' );
define( __NAMESPACE__ . '\PLUGIN_ASSETS_CSS', PLUGIN_ASSETS . 'css/' );
define( __NAMESPACE__ . '\PLUGIN_ASSETS_CSS_DIR', PLUGIN_ROOT_DIR . PLUGIN_ASSETS_CSS );
define( __NAMESPACE__ . '\PLUGIN_ASSETS_CSS_URI', PLUGIN_URI . PLUGIN_ASSETS_CSS );

define( __NAMESPACE__ . '\PLUGIN_ASSETS_SCRIPTS', PLUGIN_ASSETS . 'js/' );
define( __NAMESPACE__ . '\PLUGIN_ASSETS_SCRIPTS_DIR', PLUGIN_ROOT_DIR . PLUGIN_ASSETS_SCRIPTS );
define( __NAMESPACE__ . '\PLUGIN_ASSETS_SCRIPTS_URI', PLUGIN_URI . PLUGIN_ASSETS_SCRIPTS );

define( __NAMESPACE__ . '\PLUGIN_ASSETS_PLUGINS', PLUGIN_ASSETS . 'plugins/' );
define( __NAMESPACE__ . '\PLUGIN_ASSETS_PLUGINS_DIR', PLUGIN_ROOT_DIR . PLUGIN_ASSETS_PLUGINS );
define( __NAMESPACE__ . '\PLUGIN_ASSETS_PLUGINS_URI', PLUGIN_URI . PLUGIN_ASSETS_PLUGINS );

/**
 * Action Hooks
 */
const ACTION_HOOK_CONTACT_FORM_MAIL_SENT           = PLUGIN_IDENTIFIER . '_contact_form_mail_sent';
const ACTION_HOOK_PROCESS_CONTACT_FORM_DATA        = PLUGIN_IDENTIFIER . '_process_contact_form_data';
const FILTER_HOOK_BEFORE_RENDER_CONTACT_FORM_FIELD = PLUGIN_IDENTIFIER . '_before_render_contact_form_field';
const FILTER_HOOK_RENDER_CONTACT_FORM_FIELD        = PLUGIN_IDENTIFIER . '_render_contact_form_field';
const FILTER_HOOK_AFTER_RENDER_CONTACT_FORM_FIELD  = PLUGIN_IDENTIFIER . '_after_render_contact_form_field';
const FILTER_HOOK_DEFINE_MAILER_SERVICE            = PLUGIN_IDENTIFIER . '_define_mailer_service';