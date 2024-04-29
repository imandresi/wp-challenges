import {useRef, useEffect} from "react";
import {RichText} from "@wordpress/block-editor";
import useUpdate from "../hooks/useUpdate";

function BlockordionItem(props) {
	const refArticle = useRef();
	const refTitle = useRef();
	const refBlockordionContent = useRef();
	const refBtnExpandable = useRef();
	const doUpdate = useUpdate();

	const {
		itemId,
		title,
		children: content,
		saveItemAttributes
	} = props;

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

		if (btnExpandableEl.classList.contains('blockordion__expanded')) {
			btnExpandableEl.classList.remove('blockordion__expanded');
		} else {
			btnExpandableEl.classList.add('blockordion__expanded');
		}

		// This will allow the Height adjustment
		doUpdate();

	}

	useEffect(() => {
		adjustContentHeight();
	});

	return (
		<section className="blockordion__item">
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
							content: refArticle.current.innerHTML
						});
					}}
				/>

				<div className="blockordion__navbar">
					<div className="blockordion__button blockordion__expandable"
						 onClick={blockordionToggle}
						 ref={refBtnExpandable}
					></div>
					<div className="blockordion__button blockordion__dots"></div>
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
							content
						});

					}}
				/>

			</div>
		</section>
	);
}

export default BlockordionItem;
