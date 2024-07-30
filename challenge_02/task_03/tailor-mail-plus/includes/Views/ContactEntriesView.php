<?php

namespace Imandresi\TailorMailPlus\Views;

use Imandresi\TailorMailPlus\Models\ContactEntriesModel;
use Imandresi\TailorMailPlus\Models\ContactFormsModel;
use Imandresi\TailorMailPlus\System\Helper;
use Imandresi\TailorMailPlus\Views\AbstractView;
use const Imandresi\TailorMailPlus\PLUGIN_TEXT_DOMAIN;

class ContactEntriesView extends AbstractView {

	const ENTRIES_LIST_LIMIT = 20;

	public static function display_entry( $entry_id ): void {
		$entry = ContactEntriesModel::get_entry( $entry_id );

		if ( ! $entry ) {
			print "<p>Unknown contact form entry</p>";

			return;
		}

		$fields = [];

		// Contact Form
		$contact_form_id = $entry->contact_form_id ?? false;
		$contact_form = [];
		if ( $contact_form_id ) {
			$contact_form_data = ContactFormsModel::get_data( $contact_form_id );
			if ( $contact_form_data ) {
				$contact_form           = [
					'name' => $contact_form_data['post']->post_title,
					'href' => admin_url( "post.php?post={$contact_form_id}&action=edit" )
				];
			}
		}

		// Date
		$fields [ __( 'Date', PLUGIN_TEXT_DOMAIN ) ] = Helper::format_datetime( $entry->submission_date );

		// Name
		$value = $entry->custom['name'] ?? '';
		if ( $value ) {
			$fields[ __( 'Name', PLUGIN_TEXT_DOMAIN ) ] = $value;
			unset( $entry->custom['name'] );
		}

		// Email
		$fields[ __( 'Email', PLUGIN_TEXT_DOMAIN ) ] = $entry->email ?? '';
		if ( isset( $entry->custom['email'] ) ) {
			unset( $entry->custom['email'] );
		}

		// Subject
		$fields[ __( 'Subject', PLUGIN_TEXT_DOMAIN ) ] = $entry->subject;
		if ( isset( $entry->custom['subject'] ) ) {
			unset( $entry->custom['subject'] );
		}

		// Message
		$fields[ __( 'Message', PLUGIN_TEXT_DOMAIN ) ] = $entry->message;

		// Custom
		foreach ( $entry->custom as $key => $value ) {
			$key            = "#{$key}";
			$fields[ $key ] = $value;
		}

		$output = self::render( 'contact-entries/entry-details.html.twig', [
			'contact_form' => $contact_form,
			'fields' => $fields,
			'http_referer' => $_SERVER['HTTP_REFERER']

		] );

		print $output;


	}

	public static function display_entries( $page_index = 1 ): void {
		$page_index = max( $page_index, 1 );

		$offset  = ( $page_index - 1 ) * self::ENTRIES_LIST_LIMIT;
		$entries = ContactEntriesModel::get_entries( $offset, self::ENTRIES_LIST_LIMIT );

		// Prepare entries
		$rows = [];
		foreach ( $entries['results'] as $row ) {
			$row->submission_date = Helper::format_datetime( $row->submission_date );

			// Get the name of the associated contact form
			$contact_form_id = $row->contact_form_id;
			$contact_form    = [];
			if ( $post = get_post( $contact_form_id ) ) {
				$contact_form['title'] = $post->post_title;
				$contact_form['href']  = admin_url( "post.php?post={$contact_form_id}&action=edit" );
			}
			$row->contact_form = $contact_form;

			// Set the href to view the entry
			$row->href = admin_url( 'admin.php?' . http_build_query( [
					'page'     => 'tm_plus_entries_menu',
					'action'   => 'view',
					'entry_id' => $row->entry_id
				] ) );

			// Set the href to delete the entry
			$row->delete_href = 'javascript:delete_entry(' .
			                    $row->entry_id .
			                    ', \'' .
			                    str_replace( [ '"', "'" ], '', $row->subject ) .
			                    '\')';

			$rows[] = $row;
		}

		// prepare url
		$request_uri = preg_replace( "/&?page_index=\d+/is", "", $_SERVER['REQUEST_URI'] );
		error_log( $request_uri );


		if ( ! $entries ) {
			_e( '<p>There is no contact form entries yet.</p>', PLUGIN_TEXT_DOMAIN );

			return;
		}

		$total_pages = ceil( $entries['count'] / self::ENTRIES_LIST_LIMIT );

		$output = self::render( 'contact-entries/entries-list.html.twig', [
			'rows'           => $rows,
			'page_index'     => $page_index,
			'total_pages'    => $total_pages,
			'request_uri'    => $request_uri,
			'admin_post_url' => admin_url( 'admin-post.php' )
		] );

		print $output;

	}

}