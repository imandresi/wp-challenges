<?php

namespace Imandresi\SimplySend\Controllers;

use Imandresi\SimplySend\System\Singleton;
use Imandresi\SimplySend\Views\ContactFormView;
use const Imandresi\SimplySend\PLUGIN_SHORTCODE_NAME;

class ContactFormController extends Singleton {

	public function process_shortcode( $atts ): string {
		$attributes = [ 'name' => 'Tanjaka Mandresi' ];

		return ContactFormView::show_contact_form( $attributes );

	}

	public function init() {
		add_shortcode( PLUGIN_SHORTCODE_NAME, [ $this, 'process_shortcode' ] );
	}

	public static function load() {
		self::get_instance();
	}

}