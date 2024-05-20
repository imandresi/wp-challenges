# Medior Challenge: Customizable Form & Saving entries

**Points: 2**

## Task:

Create a customizable contact form so fields can be defined through code & all entries are saved before being sent. A
shortcode will output the contact form, and it will use `wp_mail` to send the email.

Requirements:

- Have a function that will return fields for the contact form

- Render fields from the function

- Add actions before and after rendering fields

- Create a custom post type “Contact Entries”

- Before sending entries, create a custom post type for it

- Change columns of the custom post type for contact entries 

## Starting Tips:

1. Use `apply_filters` when returning fields from the function

2. When saving entries:
   - `subject` = post title 
   - `message` = post content
   - `email` = custom meta

3. All other fields are also saved as custom meta

4. Creating [custom post type](https://developer.wordpress.org/plugins/post-types/registering-custom-post-types/?utm_source=wpchallenges.beehiiv.com&utm_medium=referral&utm_campaign=wordpress-challenge-2-contact-form-plugin)

5. Customizing [Admin Columns](https://www.smashingmagazine.com/2017/12/customizing-admin-columns-wordpress/?utm_source=wpchallenges.beehiiv.com&utm_medium=referral&utm_campaign=wordpress-challenge-2-contact-form-plugin)

