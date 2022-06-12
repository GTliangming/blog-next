const dev = process.env.NODE_ENV !== "production";

const authPaths = [""];

function redirectLogin(req, res, pathname) {
	if (!req.baseInfo.customerId && authPaths.includes(pathname)) {
		const url = `${req.protocol}://${req.host}${req.url}`;
		res.redirect(`/login?ret=${encodeURIComponent(url)}`);
		return true;
	}
	return false;
}

const redirectMap = {
	"/my_prime_wishlist": "https://ezbuy.sg/active/619ddc7f222e9b184145d278/faq-new-prime.html",
};
function getRedirectUrl(pathname) {
	return redirectMap[pathname] || "";
}

module.exports = {
	redirectLogin,
	getRedirectUrl,
};
