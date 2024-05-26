<?php

namespace Imandresi\TailorMail\Core\Classes\Controls;

use Imandresi\TailorMail\System\Singleton;

abstract class AbstractControl {

	protected static int $CONTROL_INDEX = 0;
	protected array $attributes = [];

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

	public abstract function render_shortcode( $atts ): string;

}