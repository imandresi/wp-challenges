import {useRef, useEffect, useContext, useState} from "react";
import {RichText} from "@wordpress/block-editor";
import {ItemSubmenu} from "./ItemSubmenu";
import {DragAndDropContext} from "../edit";
import {
	setCursor,
	getEditorWindowEl,
	getEditorDocumentEl,
	getEditorBodyEl
} from "../tools";

function BlockordionItem(props) {
	const refItem = useRef();
	const refArticle = useRef();
	const refTitle = useRef();
	const refBlockordionContent = useRef();
	const refBtnExpandable = useRef();

	const [draggedItem, setDraggedItem, dropAreaActive, setDropAreaActive] = useContext(DragAndDropContext);

	const {
		itemId,
		title,
		children: content,
		isExpanded,
		isActive,
		isDropAreaActive,
		saveItemAttributes,
		activateItem,
		addItemAbove,
		addItemBelow,
		deleteItem
	} = props

	const [draggedOver, setDraggedOver] = useState(false);

	/**
	 * Adjust the item height if it is expanded
	 */
	function adjustContentHeight() {
		const isExpanded = refBtnExpandable.current.classList.contains('blockordion__expanded');
		const articleHeight = isExpanded ? (refArticle.current.clientHeight + 50) + 'px' : "";
		refBlockordionContent.current.style.height = articleHeight;
	}

	/**
	 * Manage expand/collapse of each accordion item
	 *
	 * @param e
	 */
	function blockordionToggle(e) {
		const btnExpandableEl = e.target;
		let expanded = btnExpandableEl.classList.contains('blockordion__expanded');

		if (expanded) {
			btnExpandableEl.classList.remove('blockordion__expanded');
		} else {
			btnExpandableEl.classList.add('blockordion__expanded');
		}

		// This will allow the Height adjustment
		saveItemAttributes({
			itemId,
			title,
			content,
			isExpanded: !expanded
		});

	}

	/**
	 * Drag and Drop Management
	 *
	 * Emulates drag and drop because Gutenberg seems to block
	 * native drag and drop inside custom blocks.
	 */
	const dragAndDrop = (function () {
		const editorWindowEl = getEditorWindowEl();
		const editorDocumentEl = getEditorDocumentEl();
		const editorBodyEl = getEditorBodyEl();
		const dndContainerId = 'blockordion-drag-drop';
		let dndContainer;

		function handleMouseMove(e) {
			const x = e.clientX;
			const y = e.clientY
			const offsetY = editorWindowEl.scrollY;

			dndContainer.style.left = `${x - 15}px`;
			dndContainer.style.top = `${y + offsetY - 15}px`;

		}

		function handleMouseOver(e) {
			if (draggedItem && (draggedItem !== itemId)) {
				setDraggedOver(true);
			}
		}

		function handleMouseOut(e) {
			setDraggedOver(false);
		}

		function handleMouseUp(e) {
			setDraggedItem(null);
			setDropAreaActive(false);

			if (dndContainer) dndContainer.parentElement.removeChild(dndContainer);
			editorDocumentEl.removeEventListener('mousemove', handleMouseMove);
			editorDocumentEl.removeEventListener('mouseup', handleMouseUp);
			setCursor(null);

		}

		function handleDragStart(e, id) {

			setDraggedItem(itemId);
			setDropAreaActive(true);

			// clone the item
			dndContainer = editorDocumentEl.getElementById(dndContainerId);
			if (!dndContainer) {
				dndContainer = document.createElement('div');
				dndContainer.id = dndContainerId;
			} else {
				dndContainer.innerHTML = '';
			}

			// set container size
			dndContainer.style.width = (refItem.current.parentElement.clientWidth - 20) + 'px';

			dndContainer.appendChild(refItem.current.cloneNode(true));
			editorBodyEl.appendChild(dndContainer);

			// set mouse listeners
			editorDocumentEl.addEventListener('mousemove', handleMouseMove);
			editorDocumentEl.addEventListener('mouseup', handleMouseUp);

			setCursor('grab');

		}

		return {
			handleDragStart,
			handleMouseOver,
			handleMouseOut
		};

	})();


	/**
	 * Various Initializations
	 */
	useEffect(() => {
		adjustContentHeight();

		// give focus to RichText if item is active
		let activeElement = document.activeElement;
		if (activeElement.nodeName === "IFRAME") {
			activeElement = activeElement.contentDocument.activeElement;
		}

		if (isActive && (!refItem.current.contains(activeElement))) {
			refTitle.current.focus();
		}

	});


	return (
		<React.Fragment>

			<section
				className=
					{
						"blockordion__item" +
						(isActive ? " blockordion__active" : "") +
						(draggedOver ? " blockordion__drag-over" : "")
					}
				ref={refItem}
				onClick={e => {
					activateItem();
				}}
			>
				<div className=
						 {
							 "blockordion__mouseover_area" +
							 (dropAreaActive ? " blockordion__mouseover_area--active" : "")
						 }
					 onMouseOver={dragAndDrop.handleMouseOver}
					 onMouseOut={dragAndDrop.handleMouseOut}
				></div>

				<header>
					<div className="blockordion__drag-handle"
						 draggable
						 onDragStart={dragAndDrop.handleDragStart}
					></div>

					<RichText
						tagName="div"
						ref={refTitle}
						className="blockordion__title"
						placeholder="Title of the item"
						allowedFormats={[]}
						value={title}
						onChange={title => {
							saveItemAttributes({
								itemId,
								title,
								isExpanded,
								content: refArticle.current.innerHTML
							});
						}}
					/>

					<div className="blockordion__navbar">
						<div className={
							"blockordion__button blockordion__expandable" +
							(isExpanded ? " blockordion__expanded" : "")}
							 onClick={blockordionToggle}
							 ref={refBtnExpandable}
						></div>

						<ItemSubmenu
							addItemAbove={addItemAbove}
							addItemBelow={addItemBelow}
							deleteItem={deleteItem}
						/>

					</div>
				</header>
				<div className="blockordion__content"
					 ref={refBlockordionContent}>

					<RichText
						tagName="article"
						ref={refArticle}
						placeholder="Please type the content of the item here..."
						value={content}
						onChange={content => {
							saveItemAttributes({
								itemId,
								title: refTitle.current.innerText,
								content,
								isExpanded
							});

						}}
					/>

				</div>
			</section>
		</React.Fragment>
	);
}

export default BlockordionItem;
