<?php

namespace Imandresi\TailorMail\Views;

use Imandresi\TailorMail\Models\ContactFormsModel;

class ContactFormsView extends AbstractView {
	public static function form_meta_box( \WP_Post $post, array $meta_box ): void {
		$instance = self::get_instance();

		$contact_form_data = get_post_meta( $post->ID, ContactFormsModel::POST_META_DATA_SLUG, true );

		$attributes = [
			'is_new_post' => $post->post_status == 'auto-draft'
		];

		$attributes = array_merge( $attributes, $contact_form_data );

		$output = $instance->twig->render( 'contact-forms/meta-box-form.html.twig', $attributes );

		print $output;
	}

	public static function mail_meta_box( $post, $meta_box ): void {
		$instance = self::get_instance();

		$attributes = array();

		$output = $instance->twig->render( 'contact-forms/meta-box-mail.html.twig', $attributes );

		print $output;

	}

}