<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

/**
 * @var $attributes
 * @var $content
 */

?>
<section <?php echo get_block_wrapper_attributes(['class' => 'blockordion__item']); ?>>
	<header>
		<div class="blockordion__title"><?php print $attributes['title'];?></div>
		<div class="blockordion__navbar">
			<div class="blockordion__button blockordion__expandable"></div>
		</div>
	</header>
	<div class="blockordion__content">
		<article><?php print $content;?></article>
	</div>
</section>

