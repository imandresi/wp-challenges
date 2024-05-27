<?php

namespace Imandresi\TailorMail\Core\Classes\Controls;

class TextControl extends InputControl {

	public function build_shortcode(): string {
		// TODO: Implement build_shortcode() method.
		return '';
	}

	public function __construct() {
		parent::__construct();

		$this->attributes = array_merge( $this->attributes, [
			'type' => 'text'
		] );

		$this->template_filename = 'controls/input-control.html.twig';
	}

}