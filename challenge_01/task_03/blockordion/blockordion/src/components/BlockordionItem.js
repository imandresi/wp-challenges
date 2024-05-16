import {useRef, useEffect, useContext, useState} from "react";
import {RichText} from "@wordpress/block-editor";
import {ItemSubmenu} from "./ItemSubmenu.js";
import {DragAndDropContext} from "../edit.js"
import useUpdate from "../hooks/useUpdate.js";
import {
	setCursor,
	getEditorWindowEl,
	getEditorDocumentEl,
	getEditorBodyEl
} from "../tools.js";

function BlockordionItem(props) {
	const refItem = useRef();
	const refArticle = useRef();
	const refTitle = useRef();
	const refBlockordionContent = useRef();
	const refBtnExpandable = useRef();

	const doUpdate = useUpdate();

	const [
		dropAreaActive, setDropAreaActive,
		draggedItemRef, draggedOverRef,
		blockordionFocused
	] = useContext(DragAndDropContext);

	const {
		itemId,
		title,
		children: content,
		isExpanded,
		isActive,
		saveDataItem,
		moveDataItem,
		activateItem,
		addItemAbove,
		addItemBelow,
		deleteItem
	} = props


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
		saveDataItem({
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
		const dndPreviewId = 'blockordion-drag-drop';
		let dndPreviewEl;

		function handleMouseMove(e) {
			const x = e.clientX;
			const y = e.clientY
			const offsetY = editorWindowEl.scrollY;

			dndPreviewEl.style.left = `${x - 15}px`;
			dndPreviewEl.style.top = `${y + offsetY - 15}px`;
		}

		function handleMouseOver(e) {
			if (draggedItemRef.current && (draggedItemRef.current !== itemId)) {
				draggedOverRef.current = itemId;
				doUpdate();
			}
		}


		function handleMouseOut(e) {
			if (draggedOverRef.current) {
				draggedOverRef.current = null;
				doUpdate();
			}
		}

		function handleMouseUp(e) {

			// check if dropped
			if (draggedOverRef.current) {
				moveDataItem(draggedItemRef.current, draggedOverRef.current);
			}

			// cancel drag
			draggedItemRef.current = null;
			draggedOverRef.current = null;
			setDropAreaActive(false);

			if (dndPreviewEl) dndPreviewEl.parentElement.removeChild(dndPreviewEl);
			editorDocumentEl.removeEventListener('mousemove', handleMouseMove);
			editorDocumentEl.removeEventListener('mouseup', handleMouseUp);
			setCursor(null);

		}

		function handleDragStart(e, id) {

			draggedItemRef.current = itemId;
			setDropAreaActive(true);

			// clone the item to make preview
			dndPreviewEl = editorDocumentEl.getElementById(dndPreviewId);
			if (!dndPreviewEl) {
				dndPreviewEl = document.createElement('div');
				dndPreviewEl.id = dndPreviewId;
			} else {
				dndPreviewEl.innerHTML = '';
			}

			// set container size
			dndPreviewEl.style.width = (refItem.current.parentElement.clientWidth - 20) + 'px';

			dndPreviewEl.appendChild(refItem.current.cloneNode(true));
			editorBodyEl.appendChild(dndPreviewEl);

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
	});

	return (
		<React.Fragment>

			<section
				className=
					{
						"blockordion__item" +
						(blockordionFocused && isActive ? " blockordion__active" : "") +
						(draggedOverRef.current === itemId ? " blockordion__drag-over" : "")
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
							saveDataItem({
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
							saveDataItem({
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
