
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

export {
	convertToLetters
};
