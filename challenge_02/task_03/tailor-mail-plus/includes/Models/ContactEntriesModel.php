<?php

namespace Imandresi\TailorMailPlus\Models;

use const Imandresi\TailorMailPlus\PLUGIN_IDENTIFIER;
use const Imandresi\TailorMailPlus\PLUGIN_TABLE_PREFIX;
use const Imandresi\TailorMailPlus\PLUGIN_TEXT_DOMAIN;

class ContactEntriesModel {

	const ENTRIES_TABLE_NAME = PLUGIN_TABLE_PREFIX . 'tailormailplus_entries';

	public static function create_tables(): void {
		global $wpdb;

		$charset_collate = $wpdb->get_charset_collate();

		// language=text
		$sql = <<<EOT
CREATE TABLE %s (
	entry_id INT(11) NOT NULL AUTO_INCREMENT ,
	contact_form_id INT(11) NOT NULL ,
	submission_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	subject VARCHAR(255) NOT NULL ,
	message TEXT NOT NULL ,
	email VARCHAR(128) NOT NULL ,
	custom TEXT NULL ,
	PRIMARY KEY  (entry_id)
) %s;
EOT;

		$sql = sprintf( $sql, self::ENTRIES_TABLE_NAME, $charset_collate );
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		dbDelta( $sql );

	}

	public static function get_entries( $offset = 0, $limit = '', $order_by = 'submission_date', $order_direction = 'DESC' ) {
		global $wpdb;

		if ( $limit ) {
			$limit = "LIMIT $limit";
		}

		/*
		 * Get count
		 */
		$table_name = self::ENTRIES_TABLE_NAME;

		// language=text
		$sql = <<<EOT
SELECT * FROM $table_name 
ORDER BY $order_by $order_direction
EOT;
		$wpdb->get_results( $sql );
		$count = $wpdb->num_rows;

		/*
		 * Get limited results
		 */

		// language=text
		$sql = <<<EOT
SELECT * FROM $table_name 
ORDER BY $order_by $order_direction
$limit
OFFSET $offset
EOT;

		$results = $wpdb->get_results( $sql );

		return [
			'count'   => $count,
			'results' => $results
		];

	}

	public static function get_entry( $entry_id ) {
		global $wpdb;

		// language=text
		$table_name = self::ENTRIES_TABLE_NAME;
		$sql        = $wpdb->prepare( "SELECT * FROM $table_name WHERE entry_id = %d", $entry_id );

		$data = $wpdb->get_row( $sql );

		return $data;

	}

	public static function delete_entry( $entry_id ) {
		global $wpdb;

		return $wpdb->delete( self::ENTRIES_TABLE_NAME, [ 'entry_id' => $entry_id ], [ '%d' ] );

	}

	public static function save_entry( $data ) {
		global $wpdb;

		if ( ! $data || ( ! isset( $data['contact_form_id'] ) ) ) {
			return false;
		}

		$result = $wpdb->insert(
			self::ENTRIES_TABLE_NAME,
			[
				'contact_form_id' => $data['contact_form_id'],
				'subject'         => $data['subject'] ?? '',
				'message'         => $data['message'] ?? '',
				'email'           => $data['custom']['email'] ?? '',
				'custom'          => serialize( $data['custom'] ?? '' )
			],
			[ '%d', '%s', '%s', '%s', '%s' ]
		);

		$entry_id = $result ? $wpdb->insert_id : false;

		return $entry_id;

	}


	public static function init(): void {
	}

}