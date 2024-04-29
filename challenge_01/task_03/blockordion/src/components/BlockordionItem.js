import {useRef} from "react";
import {RichText} from "@wordpress/block-editor";
import {TextControl} from "@wordpress/components";

function BlockordionItem(props) {
	const refArticle = useRef();
	const refTitle = useRef();
	const refBlockordionContent = useRef();

	const {
		itemId,
		title,
		children: content,
		saveItemAttributes
	} = props;

	/**
	 * Manage expand/collapse of each accordion item
	 *
	 * @param e
	 */
	const blockordionToggle = e => {
		const btnExpandableEl = e.target;
		const articleHeight = (refArticle.current.clientHeight + 50) + 'px';

		if (btnExpandableEl.classList.contains('blockordion__expanded')) {
			btnExpandableEl.classList.remove('blockordion__expanded');
			refBlockordionContent.current.style.height = '';
		} else {
			btnExpandableEl.classList.add('blockordion__expanded');
			refBlockordionContent.current.style.height = articleHeight;
		}

	}

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
						 onClick={blockordionToggle}></div>
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
