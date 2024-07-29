<?php

namespace Imandresi\TailorMailPlus\Views;

use Imandresi\TailorMailPlus\Models\ContactEntriesModel;
use Imandresi\TailorMailPlus\Models\ContactFormsModel;
use Imandresi\TailorMailPlus\Views\AbstractView;
use const Imandresi\TailorMailPlus\PLUGIN_TEXT_DOMAIN;

class ContactEntriesView extends AbstractView {

	const ENTRIES_LIST_LIMIT = 20;

	public static function mail_fields_metabox( \WP_Post $post, array $meta_box ) {
		$post_id = $post->ID;
		$entry   = ContactEntriesModel::get_entry( $post_id );

		if ( ! $entry['mail']['custom'] ) {
			return;
		}

		// get info on owner
		$owner_id    = $entry['mail']['owner'];
		$owner       = ContactFormsModel::get_data( $owner_id );
		$owner_title = $owner['post']->post_title;
		$owner_href  = add_query_arg( [
			'post'   => $owner_id,
			'action' => 'edit'
		] );

		$custom_fields            = $entry['mail']['custom'];
		$custom_fields['content'] = $entry['post']['post_content'];
		$custom_fields            = array_merge( [
			'Date' => $entry['post']['post_date']
		], $custom_fields );
		$output                   = self::render( 'contact-entries/meta-box-mail-fields.html.twig', [
			'fields' => $custom_fields,
			'owner'  => [
				'title' => $owner_title,
				'href'  => $owner_href
			]
		] );

		print $output;

	}

	public static function display_entries( $page_index = 1 ): void {
		$page_index = max( $page_index, 1 );

		$offset  = ( $page_index - 1 ) * self::ENTRIES_LIST_LIMIT;
		$entries = ContactEntriesModel::get_entries( $offset, self::ENTRIES_LIST_LIMIT );

		// Prepare entries
		$date_format     = get_option( 'date_format' );
		$time_format     = get_option( 'time_format' );
		$datetime_format = "$date_format $time_format";

		$rows = [];
		foreach ( $entries['results'] as $row ) {
			$unix_timestamp       = strtotime( $row->submission_date );
			$row->submission_date = date_i18n( $datetime_format, $unix_timestamp );

			// Get the name of the associated contact form
			$contact_form_id = $row->contact_form_id;
			$contact_form    = [];
			if ( $post = get_post( $contact_form_id ) ) {
				$contact_form['title'] = $post->post_title;
				$contact_form['href']  = admin_url("post.php?post={$contact_form_id}&action=edit");
			}
			$row->contact_form = $contact_form;

			// Set the href to view the entry
			$row->href = "#";

			// Set the href to delete the entry
			$row->delete_href = 'javascript:delete_entry(' .
			                    $row->entry_id .
			                    ', \'' .
			                    str_replace(['"', "'"], '', $row->subject) .
			                    '\')';

			$rows[] = $row;
		}

		// prepare url
		$request_uri = preg_replace("/&?page_index=\d+/is", "", $_SERVER['REQUEST_URI']);
		error_log($request_uri);


		if ( ! $entries ) {
			_e( '<p>There is no contact form entries yet.</p>', PLUGIN_TEXT_DOMAIN );

			return;
		}

		$total_pages = ceil( $entries['count'] / self::ENTRIES_LIST_LIMIT );

		$output = self::render( 'contact-entries/entries-list.html.twig', [
			'rows'        => $rows,
			'page_index'  => $page_index,
			'total_pages' => $total_pages,
			'request_uri' => $request_uri,
			'admin_post_url' => admin_url('admin-post.php')
		] );

		print $output;

	}

}