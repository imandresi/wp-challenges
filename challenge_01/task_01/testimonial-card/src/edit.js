/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import {__} from '@wordpress/i18n';

import {useState, useEffect, useRef} from 'react';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	AlignmentControl,
	BlockControls
} from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

import authorPicture from './assets/images/photo_01.jpg';

export default function Edit({attributes, setAttributes}) {
	let {
		className,
		...blockProps
	} = useBlockProps();

	/*
	 * Thumbnail
	 */
	const authorPictureStyle = {
		backgroundImage: `url(${authorPicture})`
	};

	/*
	 * Apply default class (is-style-default) to card if no style applied
	 */
	const cardStylesClass = [
		'is-style-default',
		'is-style-classic',
		'is-style-modern'
	];

	const cardStyleApplied = !!~cardStylesClass.findIndex(v => {
		const currentClasses = className.split(" ");
		return currentClasses.includes(v);
	});

	if (!cardStyleApplied) {
		className += ' is-style-default';
	}

	/*
	 * Used with the RichTextEx component for custom controls
	 * in multiple RichText
	 */
	const [activeRichTextControl, setActiveRichTextControl] = useState(null);
	const customRichTextData = {
		'quote-text': {
			attribute: 'quoteAlign'
		}
	};

	return (
		<>
			<BlockControls>
				{
					activeRichTextControl ?
						<AlignmentControl
							value={attributes[customRichTextData[activeRichTextControl].attribute]}
							onChange={textAlign => {
								const key = customRichTextData[activeRichTextControl].attribute;
								setAttributes({
									[key]: textAlign
								})
							}}
						/>
						: null
				}
			</BlockControls>

			<div className={className} {...blockProps}>
				<div className="title">
					<span className="part-1">Clients</span>
					<span className="part-2">FeedBack</span>
				</div>

				<div className="content-container">
					<div className="author-picture" style={authorPictureStyle}></div>
					<div className="content-inner-border">
						<div className="quote quote-left"></div>
						<div className="quote quote-right"></div>
						<div className="author">
							<RichText
								tagname="div"
								className="author-name"
								placeholder="Author Name"
								allowedFormats={['core/bold', 'core/italic']}
								value={attributes.authorName}
								onChange={authorName => {
									setAttributes({authorName});
								}}
								onFocus={() => {
									setActiveRichTextControl(null);
								}}

							/>

							<RichText
								tagname="div"
								placeholder="Author Job"
								className="author-job"
								allowedFormats={['core/bold', 'core/italic']}
								value={attributes.authorJob}
								onChange={authorJob => {
									setAttributes({authorJob});
								}}
								onFocus={() => {
									setActiveRichTextControl(null);
								}}
							/>

						</div>

						<RichText
							tagname="div"
							className="quote-text"
							placeholder="Please enter the author testimony here..."
							value={attributes.quoteText}
							allowedFormats={['core/bold', 'core/italic']}
							onChange={quoteText => {
								setAttributes({quoteText});
							}}
							onFocus={() => {
								setActiveRichTextControl('quote-text');
							}}
							style={{textAlign: attributes.quoteAlign}}
						/>

					</div>
				</div>

				<div className="footer"></div>

			</div>
		</>
	);
}
