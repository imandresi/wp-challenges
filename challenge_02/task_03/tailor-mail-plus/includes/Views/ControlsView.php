<?php

namespace Imandresi\TailorMailPlus\Views;

use Imandresi\TailorMailPlus\Views\AbstractView;

class ControlsView extends AbstractView {

	public static function render_contact_form( $attributes ): string {
		return self::render( 'controls/contact-form.html.twig', $attributes );
	}

	public static function render_control( $control_view_filename, $attributes ): string {
		return self::render( $control_view_filename, $attributes );
	}

}