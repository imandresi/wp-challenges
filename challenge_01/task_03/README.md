## Senior Challenge: Accordion

*(Challenges proposed by [https://www.wpchallenges.com](https://www.wpchallenges.com/))*

**Points: 3**

### Task:

Create an accordion block where you can add multiple items that can be toggled.

### Requirements:

Items need to be added through an “Add” button inside of the editor (not the panel)

Each item will have an accordion Title and accordion body

To keep it simple, each accordion body can be a simple text control

Accordions items should be collapsable on the front (optional on the editor) 

For an additional 2 points, you can allow entering more content types for each item using InnerBlocks (for inspiration & example, check Block “Columns” & “Column” as those use the same InnerBlocks).

### Starting Tips:

1. Check Gutenberg Accordion discussion in the repository

2. Check code from https://wordpress.org/plugins/lightweight-accordion/ for inspiration


## MY SOLUTION

I've divided the solution into two projects:

- **[Blockordion](./blockordion/README.md)** : This plugin exclusively utilizes rich text for body content.
- **[Blockordion Plus](./blockordion-plus/README.md)** : This plugin offers support for various content types beyond rich text.