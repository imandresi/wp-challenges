<?php

namespace Imandresi\TailorMailPlus\Controllers;

use Imandresi\TailorMailPlus\Models\ContactEntriesModel;
use const Imandresi\TailorMailPlus\ACTION_HOOK_CONTACT_FORM_MAIL_SENT;

class ContactEntriesController {

	public static function save_entry( $form_data, $mail_fields_data, $contact_form_id ) {
		$data = [
			'subject'         => $form_data['subject'],
			'message'         => $mail_fields_data['message'],
			'custom'          => $form_data,
			'contact_form_id' => $contact_form_id
		];

		$entry_id = ContactEntriesModel::save_entry( $data );

	}

	public static function delete_contact_entry() {
		$entry_id = $_GET['entry_id'] ?? false;
		ContactEntriesModel::delete_entry( $entry_id );

		// redirect to list of contact entries
		$http_referer = $_SERVER['HTTP_REFERER'];
		wp_redirect( $http_referer );
	}

	public static function init(): void {
		add_action( ACTION_HOOK_CONTACT_FORM_MAIL_SENT, [ self::class, 'save_entry' ], 10, 3 );
		add_action( 'admin_post_delete_contact_entry', [ self::class, 'delete_contact_entry' ] );
	}

}