/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/modal/modal.scss":
/*!*****************************************!*\
  !*** ./src/components/modal/modal.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://tailor-mail/./src/components/modal/modal.scss?");

/***/ }),

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://tailor-mail/./src/styles.scss?");

/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nvar m = __webpack_require__(/*! react-dom */ \"react-dom\");\nif (false) {} else {\n  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;\n  exports.createRoot = function(c, o) {\n    i.usingClientEntryPoint = true;\n    try {\n      return m.createRoot(c, o);\n    } finally {\n      i.usingClientEntryPoint = false;\n    }\n  };\n  exports.hydrateRoot = function(c, h, o) {\n    i.usingClientEntryPoint = true;\n    try {\n      return m.hydrateRoot(c, h, o);\n    } finally {\n      i.usingClientEntryPoint = false;\n    }\n  };\n}\n\n\n//# sourceURL=webpack://tailor-mail/./node_modules/react-dom/client.js?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ }),

/***/ "./src/components/App.js":
/*!*******************************!*\
  !*** ./src/components/App.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   App: () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var _Toolbar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Toolbar.js */ \"./src/components/Toolbar.js\");\n/* harmony import */ var _modal_Modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal/Modal.js */ \"./src/components/modal/Modal.js\");\n/* harmony import */ var _dialogs_TextDialogContent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dialogs/TextDialogContent.js */ \"./src/components/dialogs/TextDialogContent.js\");\n\n\n\n\nvar App = function App() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    id: \"tailor-mail-contact-form-toolbar\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar_js__WEBPACK_IMPORTED_MODULE_1__.Toolbar, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_modal_Modal_js__WEBPACK_IMPORTED_MODULE_2__.Modal, {\n    title: \"Title of the Dialog: Number\",\n    ContentComponent: _dialogs_TextDialogContent_js__WEBPACK_IMPORTED_MODULE_3__.TextDialogContent\n  }));\n};\n\n\n//# sourceURL=webpack://tailor-mail/./src/components/App.js?");

/***/ }),

/***/ "./src/components/Toolbar.js":
/*!***********************************!*\
  !*** ./src/components/Toolbar.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Toolbar: () => (/* binding */ Toolbar)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var _ToolbarButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToolbarButton.js */ \"./src/components/ToolbarButton.js\");\n/* harmony import */ var _dialogs_TextDialogContent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dialogs/TextDialogContent.js */ \"./src/components/dialogs/TextDialogContent.js\");\n\n\n\nfunction Toolbar() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"tailor-mail__toolbar\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ToolbarButton_js__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton, {\n    label: \"Text\",\n    dialogContent: _dialogs_TextDialogContent_js__WEBPACK_IMPORTED_MODULE_2__.TextDialogContent\n  }));\n}\n\n\n//# sourceURL=webpack://tailor-mail/./src/components/Toolbar.js?");

/***/ }),

/***/ "./src/components/ToolbarButton.js":
/*!*****************************************!*\
  !*** ./src/components/ToolbarButton.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ToolbarButton: () => (/* binding */ ToolbarButton)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n\nfunction ToolbarButton(_ref) {\n  var label = _ref.label,\n    dialogContent = _ref.dialogContent;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"tailor-mail__toolbar__button\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"button\", {\n    type: \"button\",\n    className: \"button\"\n  }, label));\n}\n\n\n//# sourceURL=webpack://tailor-mail/./src/components/ToolbarButton.js?");

/***/ }),

/***/ "./src/components/dialogs/TextDialogContent.js":
/*!*****************************************************!*\
  !*** ./src/components/dialogs/TextDialogContent.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TextDialogContent: () => (/* binding */ TextDialogContent)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n\nfunction TextDialogContent() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null, \"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\");\n}\n\n\n//# sourceURL=webpack://tailor-mail/./src/components/dialogs/TextDialogContent.js?");

/***/ }),

/***/ "./src/components/modal/Modal.js":
/*!***************************************!*\
  !*** ./src/components/modal/Modal.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Modal: () => (/* binding */ Modal)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var _modal_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.scss */ \"./src/components/modal/modal.scss\");\n\n\nfunction Modal(_ref) {\n  var title = _ref.title,\n    ContentComponent = _ref.ContentComponent;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"tailor-mail__modal__overlay\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"section\", {\n    className: \"tailor-mail__modal\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"header\", null, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"section\", {\n    className: \"tailor-mail__modal__content\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ContentComponent, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"footer\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"textarea\", {\n    readOnly: true\n  }, \"[text label=\\\"Subject of your message\\\" name=\\\"subject\\\" validator=\\\"required\\\"]\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"button\", {\n    className: \"button\"\n  }, \"Insert\"))));\n}\n\n\n//# sourceURL=webpack://tailor-mail/./src/components/modal/Modal.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ \"./node_modules/react-dom/client.js\");\n/* harmony import */ var _components_App_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/App.js */ \"./src/components/App.js\");\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.scss */ \"./src/styles.scss\");\n\n\n\n\nvar root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(document.getElementById(\"contact-form-toolbar\"));\nroot.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_App_js__WEBPACK_IMPORTED_MODULE_2__.App, null));\n\n//# sourceURL=webpack://tailor-mail/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;