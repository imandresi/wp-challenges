<?php
/*
 * Plugin Name:       Tailor Mail
 * Description:       Customizable contact form plugin for WordPress with code-defined fields, entry saving, and wp_mail support via shortcode.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Author:            Tanjaka Mandresi
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       tailor-mail
 * Domain Path:       /languages
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit; // silence is golden
}

require( __DIR__ . '/vendor/autoload.php' );
require (__DIR__ . '/includes/Constants.php');

\Imandresi\TailorMail\Core\Loader::run();





