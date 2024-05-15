<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

/**
 * @var $attributes
 */

if ( ! function_exists( 'display_blockordion_item' ) ) {
	function display_blockordion_item( $item_data ) { ?>
		<section class="blockordion__item">
			<header>
				<div class="blockordion__title"><?php print $item_data['title']; ?></div>
				<div class="blockordion__navbar">
					<div class="blockordion__button blockordion__expandable"></div>
				</div>
			</header>
			<div class="blockordion__content">
				<article><?php print $item_data['content']; ?></article>
			</div>
		</section>
		<?php
	}
}

?>
<section <?php echo get_block_wrapper_attributes(); ?> >
	<?php
	foreach ( $attributes['data'] as $item_key => $item_data ) {
		display_blockordion_item( $item_data );
	}
	?>
</section>
