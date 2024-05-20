# Senior Challenge: Custom Table & API

**Points: 3**

## Task:

Create a custom table for saving entries instead of CPT and a 3rd party service for sending emails.

## Requirements:

- Create a custom table with columns: subject, message, email & custom (TEXT type and saving other data
  as [serialized](https://www.w3schools.com/php/func_var_serialize.asp?utm_source=wpchallenges.beehiiv.com&utm_medium=referral&utm_campaign=wordpress-challenge-2-contact-form-plugin)
  JSON)

- Admin page to display data from the custom table + delete button to delete the row

- Use **SendGrid** or another service of your choice to send emails (filter out `wp_mail` with SendGrid smtp details OR use
  the SendGrid API to send email directly)

## Starting Tips:

1. Check how you can
   create [custom tables](https://wpmudev.com/blog/creating-database-tables-for-plugins/?utm_source=wpchallenges.beehiiv.com&utm_medium=referral&utm_campaign=wordpress-challenge-2-contact-form-plugin)

2. Check code from https://wordpress.org/plugins/post-smtp/ to see how `wp_mail` is being filtered out to send emails
   through different services 