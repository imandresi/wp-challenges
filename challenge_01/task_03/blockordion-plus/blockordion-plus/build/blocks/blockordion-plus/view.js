/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*********************************************!*\
  !*** ./src/blocks/blockordion-plus/view.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
function blockordionToggle(e) {
  const btnExpandableEl = e.target;
  const blockordionItemEl = btnExpandableEl.closest('.blockordion__item');
  const blockordionContentEl = blockordionItemEl.querySelector('.blockordion__content');
  const articleEl = blockordionContentEl.querySelector('article');
  if (!articleEl) return;
  const expanded = btnExpandableEl.classList.contains('blockordion__expanded');
  const articleHeight = articleEl.clientHeight + 50 + 'px';
  if (expanded) {
    btnExpandableEl.classList.remove('blockordion__expanded');
    blockordionContentEl.style.height = "";
  } else {
    btnExpandableEl.classList.add('blockordion__expanded');
    blockordionContentEl.style.height = articleHeight;
  }
}
function initAllBtnExpandables() {
  const btnExpandableList = Array.from(document.querySelectorAll('.wp-block-imandresi-blockordion-plus .blockordion__button.blockordion__expandable'));
  btnExpandableList.forEach(btnEl => {
    btnEl.addEventListener('click', blockordionToggle);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initAllBtnExpandables();
});
/******/ })()
;
//# sourceMappingURL=view.js.map