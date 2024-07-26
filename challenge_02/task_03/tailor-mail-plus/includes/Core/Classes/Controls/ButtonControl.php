<?php

namespace Imandresi\TailorMailPlus\Core\Classes\Controls;

use Imandresi\TailorMailPlus\Core\Classes\Controls\AbstractControl;
use Imandresi\TailorMailPlus\Views\ControlsView;

class ButtonControl extends AbstractControl {

	public function __construct() {
		parent::__construct();

		$this->attributes = array_merge( [
			'type'    => 'button',
			'variant' => 'secondary',
			'label'   => 'Click',
			'name'    => '',
			'id'      => '',
			'class'   => ''
		], $this->attributes );

	}

	public function build_shortcode(): string {
		// TODO: Implement build_shortcode() method.
	}

	public function do_render_shortcode( $atts, $content = null ): string {
		$attributes = shortcode_atts(
			$this->attributes,
			$atts
		);

		if ( ! $attributes['id'] ) {
			$attributes['id'] = $this->control_id;
		}

		$btn_class = "btn" .
		             ( $attributes['variant'] ? " btn-{$attributes['variant']}" : '' ) .
		             ( $attributes['class'] ? " {$attributes['class']}" : "" );

		$attributes['class'] = $btn_class;

		return ControlsView::render_control(
			'controls/button-control.html.twig',
			[ 'control' => $attributes ]
		);

	}
}