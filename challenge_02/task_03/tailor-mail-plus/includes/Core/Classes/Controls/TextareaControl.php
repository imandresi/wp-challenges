<?php

namespace Imandresi\TailorMail\Core\Classes\Controls;

use Imandresi\TailorMail\Core\Classes\Controls\InputControl;

class TextareaControl extends InputControl {

	public function build_shortcode(): string {
		// TODO: Implement build_shortcode() method.
	}

	public function __construct() {
		parent::__construct();

		$this->attributes = array_merge( $this->attributes, [
			'type' => 'textarea',
			'rows' => '5'
		] );

		$this->template_filename = 'controls/textarea-control.html.twig';

	}

}