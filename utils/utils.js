
const { parse } = require("url");


async function getBaseInfo(req) {
	return { name: "test" };
}
const REPLACE_MAP = {
	// "/flashdeal": [/^\/?quickbuy\.html$/i]
};

const replacePath = (pathname, query) => {
	let newPath = pathname;
	Object.keys(REPLACE_MAP).some((originPath) => {
		const regexList = REPLACE_MAP[originPath];
		const isFindPage = regexList.some((reg) => reg.test(pathname));
		if (isFindPage) {
			newPath = originPath;
		}
		return isFindPage;
	});
	newPath = newPath.replace(/\.html$/, "");
	if (/^\/product\//.test(pathname) && query && (query.src === "OneKey" || query.src === "10001")) {
		newPath = newPath.replace("product", "buyforme");
	}
	return newPath;
};

const getLowerCasePath = (url) => {
	const parsedUrl = parse(url, true);
	const isShop = parsedUrl.pathname.indexOf("/shop/") !== -1;
	if (isShop) {
		return parsedUrl;
	}
	parsedUrl.pathname = (parsedUrl.pathname || "").toLowerCase();
	return parsedUrl;
};

module.exports = {
	getBaseInfo,
	replacePath,
	getLowerCasePath,
};
