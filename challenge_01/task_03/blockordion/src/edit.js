/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import BlockordionItem from "./components/BlockordionItem";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	return (
		<section { ...useBlockProps() }>
			<BlockordionItem/>

			<section className="blockordion__item">
				<header>
					<div className="blockordion__title">How Computer Science Works Behind Your Favorite Apps</div>
					<div className="blockordion__navbar">
						<div className="blockordion__button blockordion__expandable"></div>
						<div className="blockordion__button blockordion__dots"></div>
					</div>
				</header>
				<div className="blockordion__content">
					<article>
						We use apps for everything from social media to banking, but have you ever wondered how they actually
						function? This blog post dives into the core concepts of computer science that power these applications.
						Explore algorithms, data structures, and programming languages – the building blocks that make your apps
						tick!
					</article>
				</div>
			</section>

			<section className="blockordion__item">
				<header>
					<div className="blockordion__title">The Rise of the Machines</div>
					<div className="blockordion__navbar">
						<div className="blockordion__button blockordion__expandable"></div>
						<div className="blockordion__button blockordion__dots"></div>
					</div>
				</header>
				<div className="blockordion__content">
					<article>
						Artificial Intelligence (AI) is rapidly transforming our world, from facial recognition software to
						chatbots. This blog post delves into the fascinating world of AI, exploring its capabilities, potential
						benefits, and ethical considerations. Learn about different types of AI, machine learning, and how we
						can ensure this technology is used responsibly.
					</article>
				</div>
			</section>

		</section>
	);
}
