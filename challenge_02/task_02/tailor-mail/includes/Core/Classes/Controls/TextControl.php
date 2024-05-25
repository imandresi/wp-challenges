<?php

namespace Imandresi\TailorMail\Core\Classes\Controls;

use Imandresi\TailorMail\Core\Classes\Controls\AbstractControl;
use Imandresi\TailorMail\Views\ControlsView;

class TextControl extends InputControl {

	public function build_shortcode(): string {
		// TODO: Implement build_shortcode() method.
		return '';
	}

	public static function render_shortcode( $atts ): string {
		$instance   = self::get_instance();
		$attributes = shortcode_atts(
			$instance->attributes,
			$atts
		);

		if ( ! $attributes['id'] ) {
			$attributes['id'] = 'text-control-' . $instance->current_control_index;
		}

		$attributes['value'] = $attributes['value'] ?: $attributes['default'];

		return ControlsView::render_text_control( [ 'control' => $attributes ] );

	}
}