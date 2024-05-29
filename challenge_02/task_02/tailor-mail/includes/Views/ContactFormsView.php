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

	public static function mail_meta_box( \WP_Post $post, array $meta_box ): void {
		$contact_form_data = get_post_meta( $post->ID, ContactFormsModel::POST_META_DATA_SLUG, true );

		$default_values = [
			'to'      => '[_site_admin_email]',
			'from'    => '[_site_title] <[_site_admin_email]>',
			'subject' => '[_site_title] "[subject]"',
			'headers' => 'Reply-To: [email]',
			'message' => ContactFormsView::mail_template_default_message()
		];

		$mail = [
			'to'      => $contact_form_data['mail_template']['to'] ?: $default_values['to'],
			'from'    => $contact_form_data['mail_template']['from'] ?: $default_values['from'],
			'subject' => $contact_form_data['mail_template']['subject'] ?: $default_values['subject'],
			'headers' => $contact_form_data['mail_template']['headers'] ?: $default_values['headers'],
			'message' => $contact_form_data['mail_template']['message'] ?: $default_values['message'],
		];

		$attributes = [
			'template' => $mail
		];

		$output = self::render( 'contact-forms/meta-box-mail.html.twig', $attributes );
		print $output;

	}

	public static function mail_template_default_message(): string {
		return self::render( 'contact-forms/default-mail-template.html.twig' );

	}

}