<?php

namespace Imandresi\TailorMailPlus\Views;

use Imandresi\TailorMailPlus\Models\ContactEntriesModel;
use Imandresi\TailorMailPlus\Models\ContactFormsModel;
use Imandresi\TailorMailPlus\Views\AbstractView;

class ContactEntriesView extends AbstractView {

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
			'Date'         => $entry['post']['post_date']
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

}