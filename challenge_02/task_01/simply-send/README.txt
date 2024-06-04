=== Simply Send Plugin ===
Contributors: imandresi
Tags: contact form, shortcode, email, wp_mail
Requires at least: 5.0
Tested up to: 6.0
Stable tag: 1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

== Description ==

Simply Send is a WordPress plugin that provides a simple contact form via a shortcode. The form includes fields for Subject, Email, and Message. Upon submission, it uses `wp_mail` to send the email. This plugin is part of a Junior Challenge proposed by [WP Challenges](https://www.wpchallenges.com).

== Installation ==

1. Download the ZIP file of the plugin from the `./dist` folder.
2. Log in to your WordPress admin dashboard.
3. Go to Plugins > Add New and click on the "Upload Plugin" button.
4. Choose the downloaded ZIP file from your computer and click "Install Now".
5. After installation, click on the "Activate Plugin" for the Simply Send plugin.

== Usage ==

1. Log in to the WordPress dashboard.
2. Click on "Pages" or "Posts" and then "Add New" or choose an existing page/post to edit.
3. From the Gutenberg editor, add a new "Block", search for "Shortcode", and select the Shortcode block from the list.
4. In the Shortcode block, enter `[simply-send/]`.
5. Save your changes by clicking "Publish" or "Update".
6. View the page/post to see the contact form.

== Features ==

* Contact Form: A simple contact form with fields for Subject, Email, and Message.
* Data Validation: All form data is sanitized and validated server-side.
* Success Notification: A success notification is displayed on top of the form when the message is sent correctly.
* Styles: Custom styles are enqueued only on pages where the shortcode is used.

== Frequently Asked Questions ==

= How do I install the plugin? =

Follow the installation steps provided above to install and activate the Simply Send plugin.

= How do I use the shortcode? =

Insert the `[simply-send/]` shortcode into any post or page to display the contact form.

== License ==

This plugin is licensed under the GPLv2 or later. See the LICENSE file for details.
