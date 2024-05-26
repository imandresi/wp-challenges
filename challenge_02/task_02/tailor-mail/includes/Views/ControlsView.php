<?php

namespace Imandresi\TailorMail\Views;

use Imandresi\TailorMail\Views\AbstractView;

class ControlsView extends AbstractView {

	public static function render_control( $control_view_filename, $attributes ): string {
		$instance = self::get_instance();

		$output = $instance->twig->render( $control_view_filename, $attributes );

		return $output;
	}

}