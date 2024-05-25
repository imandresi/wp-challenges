<?php

namespace Imandresi\TailorMail\Views;

use Imandresi\TailorMail\Views\AbstractView;

class ControlsView extends AbstractView {

	public static function render_text_control( $attributes ): string {
		$instance = self::get_instance();

		$output = $instance->twig->render( 'controls/input-control.html.twig', $attributes );

		return $output;
	}

}