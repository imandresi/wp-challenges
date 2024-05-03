function convertToLetters(number) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
	let result = '';

	while (number > 0) {
		let remainder = (number - 1) % 26;
		result = alphabet[remainder] + result;
		number = Math.floor((number - 1) / 26);
	}

	return result;
}

function getEditorWindowEl() {
	return document.querySelector('iframe')?.contentWindow ?? window;
}

function getEditorDocumentEl() {
	return document.querySelector('iframe')?.contentDocument ?? document;
}

function getEditorBodyEl() {
	return getEditorDocumentEl().body;

}

function setCursor(cursorStyle = null) {
	const el = getEditorBodyEl();

	if (!el) {
		return;
	}

	// remove all cursor styles
	el.classList.forEach(className => {
		if (className.startsWith('cursor__')) {
			el.classList.remove(className);
		}
	});

	// add the new cursor style
	if (cursorStyle) {
		const cursorNewClassName = `cursor__${cursorStyle}`;
		el.classList.add(cursorNewClassName);
	}

}



export {
	convertToLetters,
	setCursor,
	getEditorWindowEl,
	getEditorDocumentEl,
	getEditorBodyEl
};
