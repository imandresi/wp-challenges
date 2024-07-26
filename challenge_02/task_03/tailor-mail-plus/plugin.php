<?php
/*
 * Plugin Name:       Tailor Mail Plus
 * Description:       Advanced contact form plugin with a custom table for entries, admin data management, and SendGrid email integration for WordPress.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Author:            Tanjaka Mandresi
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       tailor-mail-plus
 * Domain Path:       /languages
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit; // silence is golden
}

require( __DIR__ . '/vendor/autoload.php' );
require (__DIR__ . '/includes/Constants.php');

\Imandresi\TailorMailPlus\Core\Loader::run();





