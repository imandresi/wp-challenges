import {__} from '@wordpress/i18n';
import {useState, useRef, useEffect} from 'react';
import {useSelect} from '@wordpress/data';

import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl
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
		return select('core').getEntityRecords('postType', 'post', {
			categories: attributes.category
		});
	});

	// initialize thumbnail styles
	const thumbnailStyles = {
		width: attributes.thumbnailSize,
		height: attributes.thumbnailSize
	};

	if (attributes.displayPostThumbnail && attributes.thumbnailImage) {
		thumbnailStyles.backgroundImage = `url(${attributes.thumbnailImage})`;
	}


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
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				{
					posts && posts.map(post => {
						return (
							<div className="category-viewer__post">
								{
									attributes.displayPostThumbnail &&
									<>
										<div className="category-viewer__thumbnail" style={thumbnailStyles}></div>
										<div>
											{
												(attributes.displayPostTitle || attributes.displayPostDate) &&
												<div className="category-viewer__title">
													<a href={post.link}>
														{
															attributes.displayPostDate &&
															<span className="category-viewer__title__date">
															[{formatDate(new Date(post.date))}]
														</span>
														}

														{
															attributes.displayPostTitle &&
															<span className="category-viewer__title__text">
															{post.title.rendered}
														</span>
														}
													</a>
												</div>
											}

											{
												attributes.displayPostExcerpt &&
												<div className="category-viewer__excerpt"
													 dangerouslySetInnerHTML={
														 {__html: post.excerpt.rendered}
													 }
												></div>
											}
										</div>
									</>
								}
							</div>

						);
					}) ||
					(
						<p>No posts found.</p>
					)
				}
			</div>
		</>
	);
}
