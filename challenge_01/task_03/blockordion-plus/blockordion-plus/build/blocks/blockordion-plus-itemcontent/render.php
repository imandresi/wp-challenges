<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

/**
 * @var $attributes
 * @var $children
 */

var_dump($children);

?>


<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php esc_html_e( 'Blockordion Plus – Item Content', 'blockordion-plus' ); ?>
</p>
