import {useRef, useEffect, useContext, useState} from "react";
import {RichText} from "@wordpress/block-editor";
import {ItemSubmenu} from "./ItemSubmenu";
import {DragAndDropContext} from "../edit";
import {
	setCursor
} from "../tools";

function BlockordionItem(props) {
	const refItem = useRef();
	const refArticle = useRef();
	const refTitle = useRef();
	const refBlockordionContent = useRef();
	const refBtnExpandable = useRef();

	const [
		draggedItem, setDraggedItem,
		blockordionEl
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
		saveDataItem({
			itemId,
			title,
			content,
			isExpanded: !expanded
		});

	}

	function moveItem() {

	}

	/**
	 * Drag and Drop Management
	 */
	const dragAndDrop = (function () {
		function handleDragStart(e) {
			setDraggedItem(itemId);
		}

		function handleDragEnter(e) {
			const el = e.target.closest('.blockordion__item');

			if (draggedItem !== el.id) {
				setDraggedOver(true);
			}

			e.preventDefault();

		}

		function handleDragExit(e) {
			const el = e.target.closest('.blockordion__item');

			if (draggedItem !== el.id) {
				setDraggedOver(false);
			}

			e.preventDefault();
		}

		function handleDrop(e) {
			setDraggedOver(false);

			if (draggedItem && itemId) {
				moveDataItem(draggedItem, itemId);
			}

			e.preventDefault();
		}

		return {
			handleDragStart,
			handleDragEnter,
			handleDragExit,
			handleDrop,
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
				draggable
				id={itemId}
				className=
					{
						"blockordion__item" +
						(isActive ? " blockordion__active" : "") +
						(draggedOver ? " blockordion__drag-over" : "")
					}
				ref={refItem}

				onDragStart={dragAndDrop.handleDragStart}
				onDragEnter={dragAndDrop.handleDragEnter}
				onDragExit={dragAndDrop.handleDragExit}
				onDrop={dragAndDrop.handleDrop}

				onClick={e => {
					activateItem();
				}}
			>

				<header>
					<div className="blockordion__drag-handle"></div>

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
