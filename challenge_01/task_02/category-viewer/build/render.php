
<div <?php echo get_block_wrapper_attributes(); ?>>

	<?php

	/**
	 * @var $attributes
	 */

	if ( $attributes['category'] ) {
		$args = array(
			'post_type'      => 'post',
			'cat'            => $attributes['category'],
			'post_status'    => 'publish',
			'nopaging'       => boolval( $attributes['displayAllPosts'] ),
			'posts_per_page' => $attributes['displayAllPosts'] ? - 1 : intval( $attributes['displayedPosts'] ),
			'paged'          => 1,
			'orderby'        => 'date',
			'order'          => $attributes['sortOrder'],
		);

		$query = new WP_Query( $args );

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				$post = $query->post;

				$post_title   = esc_html( $post->post_title );
				$post_link    = get_permalink( $post );
				$post_date    = date( 'm/d/Y', strtotime( $post->post_date ) );
				$post_excerpt = get_the_excerpt($post);

				$thumbnail_style = '';
				if ( has_post_thumbnail( $post->ID ) ) {
					$image           = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full' );
					$thumbnail_style = "background-image: url({$image[0]});";
				}

				?>

				<div class="category-viewer__post">
					<a class="category-viewer__thumbnail"
					   href="<?php print $post_link; ?>"
					   style="<?php print $thumbnail_style; ?>"></a>

					<div class="category-viewer__content">
						<div class="category-viewer__title">
				<span class="category-viewer__title__date">
					<?php print $post_date; ?>>
				</span>
							<span class="category-viewer__title__text">
					<a href="<?php print $post_link; ?>"><?php print $post_title; ?></a>
				</span>
						</div>

						<div class="category-viewer__excerpt">
							<?php print $post_excerpt; ?>
						</div>
					</div>
				</div>

				<?php
			}

		} else {
			print "Sorry, no posts matched your criteria.";
		}

		wp_reset_postdata();

	} else {
		print "No category selected.";
	}
	?>

</div>
