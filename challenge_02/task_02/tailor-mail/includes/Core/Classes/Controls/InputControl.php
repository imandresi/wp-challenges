<?php

namespace Imandresi\TailorMail\Core\Classes\Controls;

use Imandresi\TailorMail\Core\Classes\Controls\AbstractControl;

abstract class InputControl extends AbstractControl {
	protected int $current_control_index;

	public function init() {
		$this->current_control_index = ++ self::$CONTROL_INDEX;
		$this->attributes            = [
			'label'       => "Control {$this->current_control_index}",
			'required'    => 'false',
			'default'     => '',
			'value'       => '',
			'placeholder' => '',
			'name'        => '',
			'id'          => '',
			'class'       => ''
		];
	}

}