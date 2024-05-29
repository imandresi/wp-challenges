<?php

namespace Imandresi\TailorMail\Controllers;

use Imandresi\TailorMail\Models\ContactEntriesModel;
use Imandresi\TailorMail\Models\ContactFormsModel;
use Imandresi\TailorMail\Views\ContactEntriesView;
use Imandresi\TailorMail\Views\ContactFormsView;
use const Imandresi\TailorMail\ACTION_HOOK_CONTACT_FORM_MAIL_SENT;
use const Imandresi\TailorMail\PLUGIN_TEXT_DOMAIN;

class ContactEntriesController {

	public static function remove_all_entries() {
		// TODO: to be implemented for plugin uninstallation
	}

	public static function save_entry( $form_data, $mail_fields_data, $contact_form_id ) {
		$data = [
			'mail' => [
				'subject' => $form_data['subject'],
				'message' => $mail_fields_data['message'],
				'custom'  => $form_data,
				'owner'   => $contact_form_id
			]
		];

		$post_id = ContactEntriesModel::save_entry( $data );

	}

	public static function filter_contact_entries_list( $query ) {
		global $pagenow, $post_type;

		if ( 'edit.php' != $pagenow || ! $query->is_admin ) {
			return $query;
		}

		if ( ContactEntriesModel::POST_TYPE_SLUG != $post_type ) {
			return $query;
		}

		if ( $_GET['owner'] ) {
			$query->set( 'meta_key', ContactEntriesModel::POST_META_OWNER_SLUG );
			$query->set( 'meta_value', $_GET['owner'] );
		}

		return $query;

	}

	/**
	 * @param $actions
	 * @param \WP_Post $post
	 *
	 * @return mixed
	 */
	public static function filter_page_row_actions( $actions, \WP_Post $post ) {
		global $post_type;

		switch ( $post_type ) {
			case ContactFormsModel::POST_TYPE_SLUG:
				$url = admin_url( add_query_arg( [
					'post_type' => ContactEntriesModel::POST_TYPE_SLUG,
					'owner'     => $post->ID
				], 'edit.php' ) );

				$actions['entries'] = "<a href=\"{$url}\">View Entries</a>";

				break;

			case ContactEntriesModel::POST_TYPE_SLUG:
				unset( $actions['inline hide-if-no-js'] );
				unset( $actions['view'] );

				$entry = ContactEntriesModel::get_entry( $post->ID );
				$owner = $entry['mail']['owner'] ?? false;

				if ( $owner ) {
					$url = admin_url( add_query_arg( [
						'post'   => $owner,
						'action' => 'edit'
					], 'post.php' ) );

					$actions['owner'] = "<a href=\"{$url}\">View Owner</a>";
				}
				break;

			default:
				return $actions;
		}

		return $actions;
	}

	public static function customize_contact_forms_list_table_display() {

		// Customize the columns header
		add_filter( 'manage_' . ContactEntriesModel::POST_TYPE_SLUG . '_posts_columns', function ( $columns ) {
			$columns = array(
				'cb'    => $columns['cb'],
				'title' => $columns['title'],
				'owner' => 'Owner',
				'date'  => $columns['date'],
			);

			return $columns;
		} );

		// Customize the columns content
		$action_name = 'manage_' . ContactEntriesModel::POST_TYPE_SLUG . '_posts_custom_column';
		add_action( $action_name, function ( $column, $post_id ) {
			switch ( $column ) {
				case 'owner':
					$entry = ContactEntriesModel::get_entry( $post_id );
					$owner = $entry['mail']['owner'] ?? false;

					if ( $owner ) {
						$url = admin_url( add_query_arg( [
							'post'   => $owner,
							'action' => 'edit'
						], 'post.php' ) );

						$contact_form = ContactFormsModel::get_data( $owner );
						$title        = $contact_form['post']->post_title;

						print "<a href=\"$url\">$title</a>";

					}

					break;
			}
		}, 10, 2 );

	}

	private static function prepare_ui(): void {
		add_action( 'add_meta_boxes', function () {
			add_meta_box(
				'tailor-mail-metabox-mail-fields',
				__( 'Mail Fields', PLUGIN_TEXT_DOMAIN ),
				[ ContactEntriesView::class, 'mail_fields_metabox' ],
				[ ContactEntriesModel::POST_TYPE_SLUG ],
				'advanced',
				'core'
			);
		} );

	}


	public static function init(): void {

		self::prepare_ui();

		add_action( ACTION_HOOK_CONTACT_FORM_MAIL_SENT, [ self::class, 'save_entry' ], 10, 3 );

		add_filter( 'pre_get_posts', [ self::class, 'filter_contact_entries_list' ] );

		add_filter( 'post_row_actions', [ self::class, 'filter_page_row_actions' ], 10, 2 );

		add_action('admin_menu', function() {
			remove_meta_box('submitdiv', ContactEntriesModel::POST_TYPE_SLUG, 'side');
		});

		self::customize_contact_forms_list_table_display();

	}

}