<?php

namespace Imandresi\TailorMail\Views;

use Imandresi\TailorMail\Models\ContactFormsModel;
use const Imandresi\TailorMail\PLUGIN_IDENTIFIER;
use const Imandresi\TailorMail\PLUGIN_SLUG;

class ContactFormsView extends AbstractView {

	public static function shortcode_meta_box( \WP_Post $post, array $meta_box ): void {


		$attributes = [
			'post_id' => $post->ID,
			'PLUGIN_IDENTIFIER',
			PLUGIN_IDENTIFIER,
			'PLUGIN_SLUG',
			PLUGIN_SLUG,
		];

		$output = self::render( 'contact-forms/meta-box-shortcode.html.twig', $attributes );
		print $output;
	}

	public static function form_meta_box( \WP_Post $post, array $meta_box ): void {
		$contact_form_data = get_post_meta( $post->ID, ContactFormsModel::POST_META_DATA_SLUG, true );

		$attributes = [
			'is_new_post' => $post->post_status == 'auto-draft'
		];

		$attributes = array_merge( $attributes, $contact_form_data );
		$output     = self::render( 'contact-forms/meta-box-form.html.twig', $attributes );
		print $output;
	}

	public static function mail_meta_box( $attributes ): void {
		$output = self::render( 'contact-forms/meta-box-mail.html.twig', $attributes );
		print $output;

	}

	public static function mail_template_default_message(): string {
		return self::render( 'contact-forms/default-mail-template.html.twig' );

	}

}