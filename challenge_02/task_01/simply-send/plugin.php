<?php
/*
 * Plugin Name:       Simply Send
 * Description:       This plugin is a simple contact form.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Author:            Tanjaka Mandresi
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       simply-send
 * Domain Path:       /languages
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit; // silence is golden
}

require( __DIR__ . '/vendor/autoload.php' );
require (__DIR__ . '/includes/constants.php');

\Imandresi\SimplySend\Loader::run();


