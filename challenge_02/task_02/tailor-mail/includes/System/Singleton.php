<?php

namespace Imandresi\TailorMail\System;

abstract class Singleton {

	private static $_instances = array();

	private $data = array();

	public function &__get( $name ) {

		$value = NULL;

		if ( isset( $this->data[ $name ] ) ) {
			$value = $this->data[ $name ];
		}

		return $value;
	}

	public function __set( $name, $value ) {
		$this->data[ $name ] = $value;
	}

	public function __isset( $name ) {
		return isset( $this->data[ $name ] );
	}

	public function __unset( $name ) {
		if ( isset( $this->data[ $name ] ) ) {
			unset( $this->data[ $name ] );
		}
	}

	public static function get_instance(...$args) {

		$class_name = get_called_class();
		$instance   = &self::$_instances[ $class_name ];

		$using_get_instance = $instance['using_get_instance'] ?? FALSE;

		if ( $using_get_instance ) {
			return $instance['instance'];
		}

		$instance['using_get_instance'] = TRUE;

		if ( ! isset( $instance['instance'] ) ) {

			$instance['instance'] = new static();

			if ( method_exists( $instance['instance'], 'init' ) ) {
				$instance['instance']->init($args);
			}

		}

		$instance['using_get_instance'] = FALSE;

		return $instance['instance'];

	}

	protected function __construct() {
		// do nothing
	}

	private function __clone() {
		// do nothing
	}

}