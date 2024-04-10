/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText
} from '@wordpress/block-editor';

import authorPicture from './assets/images/photo_01.jpg';


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({attributes}) {

	let {
		className,
		...blockProps
	} = useBlockProps.save();

	const blockStyle = {
		backgroundImage: `url(${authorPicture})`
	}

	// Apply default class (is-style-default) if necessary
	if (className) {
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
	}

	return (
		<div className={className} {...blockProps}>
			<div className="title">
				<span className="part-1">{attributes.titlePart1}</span>
				<span className="part-2">{attributes.titlePart2}</span>
			</div>

			<div className="content-container">
				<div className="author-picture" style={blockStyle}></div>
				<div className="content-inner-border">
					<div className="quote quote-left"></div>
					<div className="quote quote-right"></div>
					<div className="author">
						<RichText.Content
							tagName="div"
							className="author-name"
							value={attributes.authorName}
						/>
						<RichText.Content
							tagName="div"
							className="author-job"
							value={attributes.authorJob}
						/>
					</div>
					<RichText.Content
						tagName="div"
						className="quote-text"
						value={attributes.quoteText}
					/>
				</div>
			</div>

			<div className="footer"></div>

		</div>
	);
}
