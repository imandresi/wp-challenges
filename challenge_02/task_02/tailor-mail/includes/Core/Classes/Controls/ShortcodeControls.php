<?php

namespace Imandresi\TailorMail\Core\Classes\Controls;

class ShortcodeControls {
	const CONTROL_PREFIX = 'tmf-';

	public static function load() {
		add_shortcode(self::CONTROL_PREFIX . 'text', [TextControl::class, 'render_shortcode']);
	}

}