<?php

namespace Imandresi\SimplySend\Views;

use Imandresi\SimplySend\System\Singleton;
use Twig\Loader\FilesystemLoader;
use Twig\Environment;
use const Imandresi\SimplySend\PLUGIN_TEMPLATES_DIR;
use const Imandresi\SimplySend\PLUGIN_TEXT_DOMAIN;

class ContactFormView extends Singleton {

	protected Environment $twig;

	public static function show_contact_form( $attributes ): string {
		$instance = self::get_instance();
		$attributes = array_merge($attributes, [
			'unique_id' => uniqid(),
			'form_action_url' => admin_url('admin-post.php'),
			'title' => esc_html__('Contact Us', PLUGIN_TEXT_DOMAIN)
		]);

		$output   = $instance->twig->render( 'contact-form/shortcode.html.twig', $attributes );

		return $output;
	}

	public function init() {
		$instance       = self::get_instance();
		$instance->twig = new Environment( new FilesystemLoader( PLUGIN_TEMPLATES_DIR ) );

	}

}