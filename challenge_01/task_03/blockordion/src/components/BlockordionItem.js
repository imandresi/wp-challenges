import {useRef} from "react";


function BlockordionItem({title, children: content}) {
	const refArticle = useRef();
	const refBlockordionContent = useRef();

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
				<div className="blockordion__title">{title}</div>
				<div className="blockordion__navbar">
					<div className="blockordion__button blockordion__expandable"
						 onClick={blockordionToggle}></div>
					<div className="blockordion__button blockordion__dots"></div>
				</div>
			</header>
			<div className="blockordion__content"
				 ref={refBlockordionContent}>

				<article ref={refArticle}>
					{content}
				</article>

			</div>
		</section>
	);
}

export default BlockordionItem;
