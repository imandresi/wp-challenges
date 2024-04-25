<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

/*
if ($attributes.category) {
	$args = array(
		'post_type' => 'post',
		'cat' => $attributes.category,
		'post_status' => 'publish',
		'nopaging' => boolval($attributes['displayAllPosts']),
		'posts_per_page' => $attributes['displayAllPosts'] ? -1 : intval($attributes['displayedPosts']),
		'paged' => 1,
		'orderby' => 'date',
		'order' => $attributes['sortOrder'],
	);

	$query = new WP_Query( $args );

	if ( $query->have_posts() ) {
?>
		<div <?php echo get_block_wrapper_attributes(); ?>>
<?php
		while ( $query->have_posts() ) {
			$query->the_post();

			$title = get_the_title();
?>
	<div key={index} class="category-viewer__post">
		<a class="category-viewer__thumbnail"
		   href={currentPost.link}
		   style={currentPost.styles}></a>

		<div class="category-viewer__content">
			<div class="category-viewer__title">
				<span class="category-viewer__title__date">
					{currentPost.date}
				</span>
				<span class="category-viewer__title__text">
					<a href={currentPost.link}>{currentPost.title}</a>
				</span>
			</div>

			<div class="category-viewer__excerpt"></div>
		</div>
	</div>


<?php
		}
		echo '</ul>';
	} else {
		esc_html_e( 'Sorry, no posts matched your criteria.' );
	}

	wp_reset_postdata();

}
else {

}

?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<div key={index} class="category-viewer__post">
		<a class="category-viewer__thumbnail"
		   href={currentPost.link}
		   style={currentPost.styles}></a>

		<div class="category-viewer__content">
			<div class="category-viewer__title">
				<span class="category-viewer__title__date">
					{currentPost.date}
				</span>
				<span class="category-viewer__title__text">
					<a href={currentPost.link}>{currentPost.title}</a>
				</span>
			</div>

			<div class="category-viewer__excerpt"></div>
		</div>
	</div>
</div>

*/



