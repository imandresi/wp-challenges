<?php

namespace Imandresi\TailorMail\Core\Classes\Controls;

use Imandresi\TailorMail\Core\Classes\Controls\ButtonControl;

class SubmitButtonControl extends ButtonControl {

	public function __construct() {
		parent::__construct();

		$this->attributes = array_merge(
			$this->attributes,
			[
				'type' => 'submit',
				'label' => 'Submit',
				'variant' => 'primary'
			]
		);

	}

}