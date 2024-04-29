import {useRef} from "react";


function BlockordionItem() {
	const refArticle = useRef();
	const refBlockordionContent = useRef();

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
				<div className="blockordion__title">How Computer Science Works Behind Your Favorite Apps</div>
				<div className="blockordion__navbar">
					<div className="blockordion__button blockordion__expandable"
						 onClick={blockordionToggle}></div>
					<div className="blockordion__button blockordion__dots"></div>
				</div>
			</header>
			<div className="blockordion__content"
				 ref={refBlockordionContent}>

				<article ref={refArticle}>
					We use apps for everything from social media to banking, but have you ever wondered how they
					actually
					function? This blog post dives into the core concepts of computer science that power these
					applications.
					Explore algorithms, data structures, and programming languages – the building blocks that make your
					apps
					tick!
				</article>

			</div>
		</section>
	);
}

export default BlockordionItem;
