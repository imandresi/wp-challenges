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

import {createContext, useState, useRef} from "react";
import BlockordionItem from "./components/BlockordionItem";
import {convertToLetters} from "./tools";


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const DragAndDropContext = createContext();

function Edit({attributes, setAttributes}) {

	const {
		data,
		activeItem
	} = attributes;

	const [draggedItem, setDraggedItem] = useState(null);
	const [dropAreaActive, setDropAreaActive] = useState(false);
	const draggedItemRef = useRef(null);
	const draggedOverRef = useRef(null);


	/**
	 * Saves changes
	 *
	 * @param itemAttributes
	 */
	function saveDataItem(itemAttributes) {
		const blockordionData = {...data};

		blockordionData[itemAttributes.itemId] = {
			title: itemAttributes.title,
			content: itemAttributes.content,
			isExpanded: itemAttributes.isExpanded
		};

		setAttributes({
			data: blockordionData
		})
	}

	function moveDataItem(itemId, toItemId) {
		const blockordionData = {};

		if (itemId === toItemId) {
			return;
		}

		for (const currentItemId in data) {
			if (currentItemId === itemId) continue;

			if (currentItemId === toItemId) {
				blockordionData[itemId] = data[itemId];
			}

			blockordionData[currentItemId] = data[currentItemId];
		}

		setAttributes({
			data: blockordionData
		})

	}

	function deleteItem(itemId) {
		const blockordionData = {};

		for (const currentItemId in data) {
			if (currentItemId === itemId) continue;
			blockordionData[currentItemId] = data[currentItemId];
		}

		setAttributes({
			data: blockordionData
		})

	}

	function showDeleteItemSubmenu() {
		return Object.keys({...data}).length > 1;
	}

	/**
	 * Adds a new item relative to the current item
	 *
	 * @param currentItemId
	 * @param position
	 */
	function addNewItem(currentItemId = null, position = null) {
		const newData = {};
		const newItemId = convertToLetters(Date.now());
		const newItem = {
			title: "",
			content: "",
			isExpanded: true
		};

		if (currentItemId) {
			for (const itemId in data) {
				// insert new item above
				if ((itemId === currentItemId) && (position === -1)) {
					newData[newItemId] = newItem;
				}

				// insert item
				newData[itemId] = data[itemId];

				// insert new item below
				if ((itemId === currentItemId) && (position === 1)) {
					newData[newItemId] = newItem;
				}

			}
		} else {
			newData[newItemId] = newItem;
		}

		setAttributes({
			activeItem: newItemId,
			data: newData
		});

	}

	/**
	 * Sets the item as active or deactivate all
	 *
	 * @param itemId
	 */
	function setActiveItem(itemId = null) {
		setAttributes({activeItem: itemId})
	}

	return (
		<>
			<DragAndDropContext.Provider value={[
				dropAreaActive, setDropAreaActive,
				draggedItemRef, draggedOverRef
			]}>
				<section {...useBlockProps()}>
					{
						(function () {
							const blockordionItems = [];
							for (const itemId in data) {
								blockordionItems.push(
									<BlockordionItem
										itemId={itemId}
										title={data[itemId].title}
										isExpanded={data[itemId].isExpanded}
										isActive={activeItem === itemId}
										isDropAreaActive={dropAreaActive}
										key={itemId}
										saveDataItem={saveDataItem}
										moveDataItem={moveDataItem}
										activateItem={() => {
											setActiveItem(itemId);
										}}
										addItemAbove={() => {
											addNewItem(itemId, -1);
										}}
										addItemBelow={() => {
											addNewItem(itemId, 1);
										}}
										deleteItem={showDeleteItemSubmenu() ? () => {
											deleteItem(itemId);
										} : null}
									>
										{data[itemId].content}
									</BlockordionItem>
								);
							}
							return blockordionItems;

						})()
					}
				</section>
			</DragAndDropContext.Provider>


		</>
	);
}


export {Edit, DragAndDropContext};
