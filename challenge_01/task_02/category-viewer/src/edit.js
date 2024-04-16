/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import {__} from '@wordpress/i18n';
import {useState, useRef, useEffect} from 'react';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl
} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
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
		const categoryOptions1 = [
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
					categoryOptions1.push({
						label: name,
						value: id
					});
				}
			})

			setCategoryOptions(categoryOptions1);

		});


	}, []);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Data Configuration">
					<SelectControl
						label="Category"
						value={attributes.category}
						onChange={category => {
							console.log(category);
						}}
						options={categoryOptions}
					/>

				</PanelBody>
			</InspectorControls>
			<p {...useBlockProps()}>
				{__(
					'Category Viewer – hello from the editor!',
					'category-viewer'
				)}
			</p>
		</>
	);
}
