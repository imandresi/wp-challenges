# Tailor Mail - Customizable Contact Forms Plugin

**Tailor Mail** is a powerful and flexible WordPress plugin designed to help you create and manage customizable contact forms with ease. 

## Key Features:

- **Easy Form Creation**: Create contact forms directly from the WordPress admin by navigating to the "TAILOR MAIL" menu and clicking "Add New Form". Design your forms using the intuitive HTML editor and add control fields effortlessly.

- **Shortcode Integration**: Each contact form is accessible through a shortcode in the format `[tailor-mail id="..."]`, where `id` is the ID of the "Contact Forms" custom post type. Simply insert the shortcode into any page or post to display the form to your visitors.

- **Pseudo-Shortcodes for Simplicity**: Use simplified pseudo-shortcodes for each field in your contact form. 

- **Form Field Wizard**: The Form Field Wizard provides an easy-to-use interface to generate pseudo-shortcodes, making it simple to manage syntax and attributes.

- **Validation Rules**: Add multiple validation rules to control fields using the `validator` attribute, separating each rule with the `|` symbol. Tailor Mail's integration with the rakit/validation package ensures robust validation.

- **Flexible Form Rendering**: Utilize three filters to alter the rendered code of your contact form:
  - `tailor_mail_before_render_contact_form_field`: Adds HTML or fields before an existing field.
  - `tailor_mail_render_contact_form_field`: Replaces an existing field.
  - `tailor_mail_after_render_contact_form_field`: Adds HTML or fields after an existing field.

- **Contact Entries Management**: All submitted forms are saved as "contact entries" in a custom post type. View all entries by clicking on the "Contact Entries" link in the "TAILOR MAIL" menu. Filter entries for specific forms using the "View Entries" link associated with each form.

- **Email Notifications**: Receive email notifications containing the content submitted by visitors. Customize the email template and information using the "Mail" metabox section.

## How to Use:

1. **Create a New Form**: Navigate to "TAILOR MAIL" in the WordPress admin and click "Add New Form".
2. **Design Your Form**: Use the "Form" metabox to design your form with HTML and add control fields.
3. **Set Up Email Template**: Customize the email template in the "Mail" metabox to define the message you receive when a form is submitted.
4. **Insert Shortcode**: Copy the generated shortcode for your form and paste it into any page or post.
5. **Manage Entries**: Access and filter submitted contact entries via the "Contact Entries" link in the "TAILOR MAIL" menu.

Tailor Mail simplifies the creation and management of contact forms, providing a seamless experience for both site administrators and visitors. Whether you need a simple contact form or a complex form with multiple validation rules, Tailor Mail has you covered.

## More Information

For more detailed information about the Tailor Mail plugin, including comprehensive documentation and usage examples, please visit our GitHub repository.

https://github.com/imandresi/wp-challenges/tree/main/challenge_02/task_02