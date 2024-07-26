<?php

namespace Imandresi\TailorMailPlus\Core\Classes\Controls;

use Imandresi\TailorMailPlus\Core\Classes\Controls\AbstractControl;
use Imandresi\TailorMailPlus\Views\ControlsView;
use const Imandresi\TailorMailPlus\PLUGIN_TEXT_DOMAIN;

abstract class InputControl extends AbstractControl {
	protected string $template_filename;

	public function __construct() {
		parent::__construct();

		$this->attributes = array_merge( [
			'label'       => '',
			'required'    => '',
			'default'     => '',
			'value'       => '',
			'placeholder' => '',
			'name'        => '',
			'id'          => '',
			'class'       => '',
			'validator'   => ''
		], $this->attributes );

		$this->template_filename = '';

	}

	public static function sanitize_field( $value, $attributes ): string {
		return $value;
	}

	public function do_render_shortcode( $atts, $content = null ): string {
		$attributes = shortcode_atts(
			$this->attributes,
			$atts
		);

		if ( ! $attributes['id'] ) {
			$attributes['id'] = $this->control_id;
		}

		$attributes['value']   = $attributes['value'] ?: $attributes['default'];
		$attributes['content'] = $content;

		if ( ! $this->template_filename ) {
			return '';
		}

		return ControlsView::render_control(
			$this->template_filename,
			[
				'control'    => $attributes,
				'attributes' => json_encode( $attributes )
			]
		);

	}


}