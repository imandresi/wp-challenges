import {useRef, useEffect} from "react";
import {RichText} from "@wordpress/block-editor";
import {DropdownMenu} from "@wordpress/components";
import {ItemSubmenu} from "./ItemSubmenu";

function BlockordionItem(props) {
	const refItem = useRef();
	const refArticle = useRef();
	const refTitle = useRef();
	const refBlockordionContent = useRef();
	const refBtnExpandable = useRef();

	const {
		itemId,
		title,
		children: content,
		isExpanded,
		isActive,
		saveItemAttributes,
		activateItem,
		addItemAbove,
		addItemBelow,
		deleteItem
	} = props;

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
		<section
			className={"blockordion__item" + (isActive ? " blockordion__active" : "")}
			ref={refItem}
			onClick={e => {
				activateItem();
			}}
		>
			<header>
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
	);
}

export default BlockordionItem;
