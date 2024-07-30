<?php

namespace Imandresi\TailorMailPlus\System;

class Helper {

	/**
	 * Normalizes a path
	 *
	 * Converts all backslashes "\" to slashes "/"
	 * Removes all doubloons of slashes
	 * If $add_trailing_slash is TRUE, adds a trailing slash at the end of the path
	 *
	 * This is an enhanced version of the WordPress function wp_normalize_path()
	 * because it also checks the path for '.' and '..' directories and cleans them
	 * according found results.
	 *
	 * @param string $path
	 * @param bool|FALSE $add_trailing_slash Adds a trailing slash at the end of the path if TRUE
	 *
	 * @return string
	 */
	public static function normalize_path( $path, $add_trailing_slash = false ) {

		// checks if the $path is in fact a url
		// if this is the case, the scheme is extracted before processing
		$scheme = '';
		$regexp = "/^((http|https|ftp)\:\/\/)(.+)/is";
		if ( preg_match( $regexp, $path, $matches ) ) {
			$scheme = $matches[1];
			$path   = $matches[3];
		}

		$path = str_replace( '\\', '/', $path );
		$path = preg_replace( '|/+|', '/', $path );

		$parts = array();

		foreach ( explode( '/', $path ) as $i => $fold ) {
			if ( ( '' == $fold ) || ( '.' == $fold ) ) {
				continue;
			}
			if ( ( '..' == $fold ) && ( $i > 0 ) && ( end( $parts ) != '..' ) ) {
				array_pop( $parts );
			} else {
				$parts[] = $fold;
			}
		}

		$path = ( '/' == $path[0] ? '/' : '' ) . join( '/', $parts );

		if ( $add_trailing_slash ) {
			$path .= '/';
		}

		return $scheme . $path;
	}

	public static function is_bootstrap_enqueued(): bool {
		global $wp_styles, $wp_scripts;

		// Check for Bootstrap CSS
		foreach ( $wp_styles->queue as $handle ) {
			$src = $wp_styles->registered[ $handle ]->src;
			if ( strpos( $src, 'bootstrap' ) !== false ) {
				return true;
			}
		}

		// Check for Bootstrap JS
		foreach ( $wp_scripts->queue as $handle ) {
			$src = $wp_scripts->registered[ $handle ]->src;
			if ( strpos( $src, 'bootstrap' ) !== false ) {
				return true;
			}
		}

		return false;
	}

	public static function get_table_prefix(): string {
		global $wpdb;

		if ( ! ( $wpdb instanceof \wpdb ) ) {
			$root = realpath( $_SERVER["DOCUMENT_ROOT"] );
			require "$root/wp-blog-header.php";
		}

		$table_prefix = $wpdb->prefix;

		return $table_prefix;
	}

	public static function table_exists( $table_name ): bool {
		global $wpdb;

		$sql  = $wpdb->prepare( "SHOW TABLES LIKE %s", $table_name );
		$rows = $wpdb->query( $sql );

		return boolval( $rows );

	}

	public static function delete_table( $table_name ): void {
		global $wpdb;

		// language=text
		$sql = "DROP TABLE IF EXISTS %s;";

		$sql = sprintf( $sql, $table_name );
		$wpdb->query( $sql );

	}

	public static function format_datetime( $datetime ): string {
		$date_format     = get_option( 'date_format' );
		$time_format     = get_option( 'time_format' );
		$datetime_format = "$date_format $time_format";
		$unix_timestamp  = is_numeric( $datetime ) ? (int) $datetime : strtotime( $datetime );

		return date_i18n( $datetime_format, $unix_timestamp );
	}


}