<?php

namespace Imandresi\TailorMail\Views;

class ContactFormsView extends AbstractView {
	public static function form_meta_box( $post, $meta_box ): void {
		$instance = self::get_instance();

		$attributes = array();

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