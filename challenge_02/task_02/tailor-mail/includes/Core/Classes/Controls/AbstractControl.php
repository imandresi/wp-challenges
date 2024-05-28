<?php

namespace Imandresi\TailorMail\Core\Classes\Controls;

use Imandresi\TailorMail\System\Singleton;
use const Imandresi\TailorMail\FILTER_HOOK_AFTER_RENDER_CONTACT_FORM_FIELD;
use const Imandresi\TailorMail\FILTER_HOOK_BEFORE_RENDER_CONTACT_FORM_FIELD;
use const Imandresi\TailorMail\FILTER_HOOK_RENDER_CONTACT_FORM_FIELD;

abstract class AbstractControl {

	protected static int $CONTROL_INDEX = 0;
	protected array $attributes = [];
	protected int $current_control_index;
	protected string $control_id;

	public function __construct() {
		self::$CONTROL_INDEX ++;
		$this->current_control_index = self::$CONTROL_INDEX;
		$this->control_id            = 'control-' . uniqid();

	}

	/**
	 * @throws \Exception
	 */
	public function set_attribute( string $key, string $value ): void {
		if ( ! isset( $this->attributes[ $key ] ) ) {
			throw new \Exception( 'Attribute does not exist.' );
		}
		$this->attributes[ $key ] = $value;
	}

	/**
	 * @throws \Exception
	 */
	public function get_attribute( string $key ): string {
		if ( ! isset( $this->attributes[ $key ] ) ) {
			throw new \Exception( 'Attribute does not exist.' );
		}

		return $this->attributes[ $key ];
	}

	public abstract function build_shortcode(): string;

	public abstract function do_render_shortcode( $atts, $content = null ): string;

	public function render_shortcode( $atts, $content = null ): string {
		$html = '';

		/**
		 * Filter used to add some data before the control
		 *
		 * @param string[] $atts
		 * @param string $content
		 */
		$html = apply_filters(
			FILTER_HOOK_BEFORE_RENDER_CONTACT_FORM_FIELD,
			$html,
			$atts, $content
		);

		// renders the control
		$control_html = $this->do_render_shortcode( $atts, $content );

		/**
		 * Filter to update the rendered data of the control
		 *
		 * @param string[] $atts
		 * @param string $content
		 */
		$html .= apply_filters(
			FILTER_HOOK_RENDER_CONTACT_FORM_FIELD,
			$control_html,
			$atts, $content
		);

		/**
		 * Filter to add some data after the control.
		 *
		 * @param string[] $atts
		 * @param string $content
		 */
		$html = apply_filters(
			FILTER_HOOK_AFTER_RENDER_CONTACT_FORM_FIELD,
			$html,
			$atts, $content
		);

		return $html;

	}

}