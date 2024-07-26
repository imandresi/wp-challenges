<?php

namespace Imandresi\TailorMailPlus\Core\Classes\Controls;

use Imandresi\TailorMailPlus\Core\Classes\Controls\ButtonControl;

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