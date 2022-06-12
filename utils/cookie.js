function concatCookie(originCookie, newCookie) {
	return [originCookie, newCookie].filter((v) => v && !!v.trim()).join("; ");
}

module.exports = {
	concatCookie,
};
