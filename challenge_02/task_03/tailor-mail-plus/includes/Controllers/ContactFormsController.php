<?php

namespace Imandresi\TailorMail\Controllers;

use Imandresi\TailorMail\Models\ContactFormsModel;
use Imandresi\TailorMail\Views\ContactFormsView;
use const Imandresi\TailorMail\PLUGIN_IDENTIFIER;
use const Imandresi\TailorMail\PLUGIN_SLUG;
use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class ContactFormsController {

	public static function is_editing_form(): bool {
		return ( get_post_type() == ContactFormsModel::POST_TYPE_SLUG ) && is_admin();
	}

	public static function customize_contact_forms_list_table_display() {

		// Customize the columns header
		add_filter( 'manage_' . ContactFormsModel::POST_TYPE_SLUG . '_posts_columns', function ( $columns ) {
			$columns = array(
				'cb'        => $columns['cb'],
				'title'     => $columns['title'],
				'shortcode' => 'Shortcode',
				'date'      => $columns['date'],
			);

			return $columns;
		} );

		// Customize the columns content
		$action_name = 'manage_' . ContactFormsModel::POST_TYPE_SLUG . '_posts_custom_column';
		add_action( $action_name, function ( $column, $post_id ) {
			switch ( $column ) {
				case 'shortcode':
					print "<pre>";
					print self::get_shortcode( $post_id );
					print "</pre>";
					break;
			}
		}, 10, 2 );


	}


	public static function get_shortcode( $post ): string {
		if ( $post instanceof \WP_Post ) {
			$post = $post->ID;
		}

		if ( ! is_numeric( $post ) ) {
			return '';
		}

		return '[' . PLUGIN_SLUG . " id=\"{$post}\"]";
	}

	private static function prepare_ui(): void {

		add_filter( 'enter_title_here', function ( $title ) {
			if ( self::is_editing_form() ) {
				$title = "choose a name for your contact form";
			}

			return $title;
		} );

		add_action( 'add_meta_boxes', function () {
			add_meta_box(
				'tailor-mail-metabox-shortcode',
				__( 'Shortcode', PLUGIN_TEXT_DOMAIN ),
				[ ContactFormsView::class, 'shortcode_meta_box' ],
				[ ContactFormsModel::POST_TYPE_SLUG ],
				'advanced',
				'core'
			);
		} );

		add_action( 'add_meta_boxes', function () {
			add_meta_box(
				'tailor-mail-metabox-form',
				__( 'Form', PLUGIN_TEXT_DOMAIN ),
				[ ContactFormsView::class, 'form_meta_box' ],
				[ ContactFormsModel::POST_TYPE_SLUG ],
				'advanced',
				'core'
			);
		} );

		add_action( 'add_meta_boxes', function () {
			add_meta_box(
				'tailor-mail-metabox-mail',
				__( 'Mail', PLUGIN_TEXT_DOMAIN ),
				[ ContactFormsView::class, 'mail_meta_box' ],
				[ ContactFormsModel::POST_TYPE_SLUG ],
				'advanced',
				'core'
			);
		} );

	}


	public static function save_post_hook( int $post_id, \WP_Post $post, bool $update ) {
		if ( wp_is_post_revision( $post_id ) ) {
			return;
		}

		$meta_value = [
			'form_code'     => trim( $_POST[ PLUGIN_IDENTIFIER ]['form_code'] ),
			'mail_template' => $_POST[ PLUGIN_IDENTIFIER ]['template']
		];

		update_post_meta(
			$post_id,
			ContactFormsModel::POST_META_DATA_SLUG,
			$meta_value
		);

	}

	public static function get_form_unique_id( \WP_Post $post = null ): int {
		$unique_id = $post ? $post->ID : 1;

		return $unique_id;
	}

	public static function remove_all_forms() {
		// TODO: to be implemented for plugin uninstallation
	}

	public static function init(): void {
		self::prepare_ui();

		add_filter( 'default_title', function ( string $post_title, \WP_Post $post ) {
			if ( $post->post_type !== ContactFormsModel::POST_TYPE_SLUG ) {
				return $post_title;
			}

			return sprintf( __( 'Contact Form %d', PLUGIN_TEXT_DOMAIN ), self::get_form_unique_id( $post ) );

		}, 10, 2 );

		add_filter(
			'save_post_' . ContactFormsModel::POST_TYPE_SLUG,
			[ self::class, 'save_post_hook' ],
			10, 3
		);

		self::customize_contact_forms_list_table_display();

	}

}