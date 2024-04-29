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

import BlockordionItem from "./components/BlockordionItem";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
	const data = attributes.data;

	function saveItemAttributes(itemAttributes) {
		const blockordionAttributes = {...data};
		blockordionAttributes[itemAttributes.itemId] = {
			title: itemAttributes.title,
			content: itemAttributes.content
		};

		setAttributes({
			data: blockordionAttributes
		})
	}

	return (
		<section {...useBlockProps()}>
			{
				(function () {
					const blockordionItems = [];
					for (const itemId in data) {
						blockordionItems.push(
							<BlockordionItem
								itemId={itemId}
								title={data[itemId].title}
								key={itemId}
								saveItemAttributes={saveItemAttributes}
							>
								{data[itemId].content}
							</BlockordionItem>
						);
					}
					return blockordionItems;

				})()
			}
		</section>
	)
		;
}
