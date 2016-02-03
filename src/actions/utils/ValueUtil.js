exports.getFloat = function(formattedNumber) {
	return Number(
		formattedNumber
		.replace(/[^0-9\,]+/g, '')
		.replace(',', '.')
	);
};