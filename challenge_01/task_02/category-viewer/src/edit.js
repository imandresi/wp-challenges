import {__} from '@wordpress/i18n';
import {useState, useRef, useEffect} from 'react';
import React from 'react';
import {useSelect} from '@wordpress/data';

import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	__experimentalDivider as Divider,
	__experimentalNumberControl as NumberControl
} from '@wordpress/components';


import './editor.scss';

function fetchData(apiUrl, cb) {
	fetch(apiUrl)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			cb(data);
		})
		.catch(error => {
			console.error('Fetch error:', error);
		});
}

function formatDate(date) {
	let formattedDate = '';

	if (date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		const formattedMonth = String(month).padStart(2, '0');
		const formattedDay = String(day).padStart(2, '0');

		formattedDate = `${formattedMonth}/${formattedDay}/${year}`;
	}

	return formattedDate;
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
	const [categoryOptions, setCategoryOptions] = useState([]);

	// Get Block props
	const {className, ...blockProps} = useBlockProps();

	// load categories
	useEffect(function () {
		const url = '/wp-json/wp/v2/categories';
		const tmpCategoryOptions = [
			{
				label: 'Select a category',
				value: 0
			}
		];

		fetchData(url, data => {
			let name, id;

			if (!Array.isArray(data)) {
				return;
			}

			data.forEach(categoryItem => {
				name = categoryItem.name ?? null;
				id = categoryItem.id ?? null;
				if (name && id) {
					tmpCategoryOptions.push({
						label: name,
						value: id
					});
				}
			});

			setCategoryOptions(tmpCategoryOptions);

		});

	}, []);

	// loads posts
	const posts = useSelect(select => {
		let posts = select('core').getEntityRecords('postType', 'post', {
			categories: attributes.category,
			_embed: true
		});

		if (Array.isArray(posts) && (posts.length === 0)) {
			posts = null;
		}

		return posts;
	});

	// initialize thumbnail styles
	const thumbnailStyles = {};

	// set class names
	const newClassName = className +
		(attributes.displayPostTitle ? '' : ' no-title') +
		(attributes.displayPostDate ? '' : ' no-date') +
		(attributes.displayPostExcerpt ? '' : ' no-excerpt') +
		(attributes.displayPostThumbnail ? '' : ' no-thumbnail');

	return (
		<>
			<InspectorControls>
				<PanelBody title="Data Configuration">
					<SelectControl
						label="Category"
						value={attributes.category}
						onChange={category => {
							setAttributes({category});
						}}
						options={categoryOptions}
					/>

					{
						posts &&
						<>
							<Divider/>

							<ToggleControl
								label="Display Title"
								checked={attributes.displayPostTitle}
								onChange={displayPostTitle => {
									setAttributes({displayPostTitle})
								}}
							/>

							<ToggleControl
								label="Display Date"
								checked={attributes.displayPostDate}
								onChange={displayPostDate => {
									setAttributes({displayPostDate})
								}}
							/>

							<ToggleControl
								label="Display Excerpt"
								checked={attributes.displayPostExcerpt}
								onChange={displayPostExcerpt => {
									setAttributes({displayPostExcerpt})
								}}
							/>

							<ToggleControl
								label="Display Thumbnail"
								checked={attributes.displayPostThumbnail}
								onChange={displayPostThumbnail => {
									setAttributes({displayPostThumbnail})
								}}
							/>

							<Divider/>

							<ToggleControl
								label="Display all posts"
								checked={attributes.displayAllPosts}
								onChange={displayAllPosts => {
									setAttributes({displayAllPosts})
								}}
							/>

							{
								!attributes.displayAllPosts &&
								<TextControl
									label="Number of posts to display"
									value={attributes.displayedPosts}
									onKeyDown={e => {
										const key = e.key;
										const counter = new Array(10).keys()
										if (
											![...new Array(10).keys()].map(v => v.toString())
												.concat('Backspace')
												.includes(key)
										) {
											e.preventDefault();
										}
									}}
									onChange={displayedPosts => {
										setAttributes({displayedPosts});
									}}
								/>
							}

							<SelectControl
								label="Posts sorting order"
								value={attributes.sortOrder}
								onChange={sortOrder => {
									setAttributes({sortOrder});
								}}
								options={[
									{label: 'Ascending', value: 'ASC'},
									{label: 'Descending', value: 'DESC'},
								]}
							/>

						</>
					}

				</PanelBody>
			</InspectorControls>

			<div className={newClassName} {...blockProps}>
				{
					posts && posts.map((post, index) => {
						const styles = thumbnailStyles;

						// gets post thumbnail
						if (attributes.displayPostThumbnail) {
							if (post['_embedded']?.['wp:featuredmedia']) {
								const postThumbnail = post?.
									['_embedded']?.
									['wp:featuredmedia']?.
									[0]?.
									['media_details']?.
									['sizes']?.
									['full']?.
									['source_url'];

								styles.backgroundImage = `url(${postThumbnail})`;

							}
						}

						const currentPost = {
							date: formatDate(new Date(post.date)),
							title: post.title.rendered,
							excerpt: post.excerpt.rendered,
							link: post.link,
							styles: {...styles}
						};

						return (
							<div key={index} className="category-viewer__post">
								{
									(
										attributes.displayPostThumbnail ||
										attributes.displayPostTitle ||
										attributes.displayPostDate ||
										attributes.displayPostExcerpt
									) &&
									<>
										{
											attributes.displayPostThumbnail &&
											<a className="category-viewer__thumbnail"
											   href={currentPost.link}
											   style={currentPost.styles}></a>
										}
										<div className="category-viewer__content">
											{
												(attributes.displayPostTitle || attributes.displayPostDate) &&
												<div className="category-viewer__title">
													{
														attributes.displayPostDate &&
														<span className="category-viewer__title__date">
															{currentPost.date}
														</span>
													}

													{
														attributes.displayPostTitle &&
														<span className="category-viewer__title__text">
															<a href={currentPost.link}>{currentPost.title}</a>
														</span>
													}

												</div>
											}

											{
												attributes.displayPostExcerpt &&
												<div className="category-viewer__excerpt"
													 dangerouslySetInnerHTML={{
														 __html: currentPost.excerpt
													 }}
												></div>
											}

										</div>
									</>
								}
							</div>
						)
					}) ||
					(
						<p>No posts found. (Please select a category to display)</p>
					)
				}
			</div>
		</>
	);
}
