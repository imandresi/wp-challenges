<?php

namespace Imandresi\TailorMail\Views;

use Imandresi\TailorMail\Models\ContactEntriesModel;
use Imandresi\TailorMail\Views\AbstractView;

class ContactEntriesView extends AbstractView {

	public static function mail_fields_metabox( \WP_Post $post, array $meta_box ) {
		$post_id = $post->ID;
		$entry   = ContactEntriesModel::get_entry( $post_id );

		if (!$entry['mail']['custom']) {
			return;
		}

		$custom_fields = $entry['mail']['custom'];
		$custom_fields['content'] = $entry['post']['post_content'];
		$output = self::render('contact-entries/meta-box-mail-fields.html.twig', [
			'fields' => $custom_fields
		]);

		print $output;

	}

}