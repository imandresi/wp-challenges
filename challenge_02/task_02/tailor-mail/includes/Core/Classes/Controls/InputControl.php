<?php

namespace Imandresi\TailorMail\Core\Classes\Controls;

use Imandresi\TailorMail\Core\Classes\Controls\AbstractControl;
use Imandresi\TailorMail\Views\ControlsView;

abstract class InputControl extends AbstractControl {
	protected int $current_control_index;
	protected string $control_id;
	protected string $template_filename;

	public function __construct() {
		self::$CONTROL_INDEX ++;
		$this->current_control_index = self::$CONTROL_INDEX;

		$this->attributes            = array_merge( [
			'label'       => '',
			'required'    => 'false',
			'default'     => '',
			'value'       => '',
			'placeholder' => '',
			'name'        => '',
			'id'          => '',
			'class'       => ''
		], $this->attributes );

		$this->control_id        = 'control-' . uniqid();
		$this->template_filename = '';

	}

	public function render_shortcode( $atts ): string {
		$attributes = shortcode_atts(
			$this->attributes,
			$atts
		);

		if ( ! $attributes['id'] ) {
			$attributes['id'] = $this->control_id;
		}

		$attributes['value'] = $attributes['value'] ?: $attributes['default'];

		if ( ! $this->template_filename ) {
			return '';
		}

		return ControlsView::render_text_control(
			$this->template_filename,
			[ 'control' => $attributes ]
		);

	}


}