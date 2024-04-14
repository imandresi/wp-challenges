# Junior Challenge: Create a Custom Gutenberg Block

**Points: 1**

## Task:

Develop a custom Gutenberg block that displays a testimonial card with fields for a testimonial quote, author name, and
author's job title.

## Requirements:

Create a custom block using `@wordpress/create-block`,

Implement a block that includes fields for testimonial quotes, author name, and job title,

Fields can be displayed either inside the block in the editor or on the side panel

Use Editor and Block Styles (editor if fields are displayed inside the block in the editor). Block Styles for the front.

## Starting Tips:

1. Complete Block Tutorial (with a custom field): https://developer.wordpress.org/block-editor/getting-started/tutorial/

2. Block Handbook: https://developer.wordpress.org/block-editor/

## MY SOLUTION:

### Installation

1. [Download](./dist/testimonial-card.zip) the ZIP file of the plugin
2. Log in to your WordPress admin dashboard
3. Go to `Plugins > Add New Plugin` and click on the "Upload Plugin" button
4. Choose the downloaded ZIP file from your computer and click "Install Now"
5. After installation, click on the "Activate Plugin"

### How to use

1. From the **Gutenberg editor**, open the block inserter tool to add a new Block.
2. You will see various options for different types of blocks categorized into sections.
3. Access the "WordPress Challenge" category
4. Click on the "Testimonial Card" icon to insert a new testimonial.

![Testimonial Card](/docs/testimonial_card_icon.png/)

5. Complete the card by indicating the name of the author, his word, his testimony. You can choose to customize the
   alignment of the testimony by clicking on the left/center/right alignment icon on the block toolbar.
6. You can also add a picture of the author by clicking on the avatar on the top. This will open the media upload.
7. Finally, you can choose between 3 presentation modes in the "settings panel":
   - default
   - classic
   - modern

![Default Style](./docs/card_style_01.png/)

![Classic Style](./docs/card_style_02.png/)

![Modern Style](./docs/card_style_03.png/)

### Credits
Thank you to **Edmond Dantès** for the photo of the woman in the example demo.
https://www.pexels.com/fr-fr/photo/femme-ordinateur-portable-technologie-ordinateur-4347368/

Thank you to [FreePik](https://www.freepik.com) for their PSD of some inspirational testimonial cards. 