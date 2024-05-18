
function blockordionToggle(e) {
	const btnExpandableEl = e.target;
	const blockordionItemEl = btnExpandableEl.closest('.blockordion__item');
	const blockordionContentEl = blockordionItemEl.querySelector('.blockordion__content');
	const articleEl = blockordionContentEl.querySelector('article');

	if (!articleEl) return;

	const expanded = btnExpandableEl.classList.contains('blockordion__expanded');
	const articleHeight = (articleEl.clientHeight + 50) + 'px';

	if (expanded) {
		btnExpandableEl.classList.remove('blockordion__expanded');
		blockordionContentEl.style.height = "";
	} else {
		btnExpandableEl.classList.add('blockordion__expanded');
		blockordionContentEl.style.height = articleHeight;
	}
}

function initAllBtnExpandables() {
	const btnExpandableList = Array.from(document.querySelectorAll(
		'.wp-block-imandresi-blockordion-plus .blockordion__button.blockordion__expandable'
	));

	btnExpandableList.forEach(btnEl => {
		btnEl.addEventListener('click', blockordionToggle);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	initAllBtnExpandables();
});

