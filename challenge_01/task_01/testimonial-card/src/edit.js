/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import {__} from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {useBlockProps} from '@wordpress/block-editor';

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

export default function Edit() {
	let {
		className: blockClassName,
		...blockProps
	} = useBlockProps();

	blockClassName += " is-style-default";


	// <p {...useBlockProps()}>
	// 	{__('Testimonial Card – hello from the editor!', 'testimonial-card')}
	// </p>

	const blockStyle = {
		backgroundImage: `url(${authorPicture})`
	};

	return (
			<div className={blockClassName} {...blockProps}>
				<div className="title">
					<span className="part-1">Clients</span>
					<span className="part-2">FeedBack</span>
				</div>

				<div className="content-container">
					<div className="author-picture" style={blockStyle}></div>
					<div className="content-inner-border">
						<div className="quote quote-left"></div>
						<div className="quote quote-right"></div>
						<div className="author">
							<div className="author-name">Sara Anderson</div>
							<div className="author-job">CEO, AGENCY</div>
						</div>
						<div className="quote-text">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
							ut aliquip
							ex ea commodo consequat.
						</div>
					</div>
				</div>

				<div className="footer"></div>

			</div>
	);
}
