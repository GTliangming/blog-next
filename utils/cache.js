const { app, server } = require("./app");
const { getBaseInfo, getLowerCasePath, replacePath } = require("./utils");

const LRUCache = require("lru-cache");

const ssrCache = new LRUCache({
	max:
		500 * 1024 * 1024 /* cache size will be 100 MB using `return n.length` as length() function */,
	length: function (n) {
		return n.length;
	},
	maxAge: 1000 * 60 * 10, // 10min
});

function getCacheFunc(getCacheKey) {
	return async function renderAndCache(req, res, options = {}) {
		const startTime = Date.now();
		const { maxAge } = options;

		const baseInfo = await getBaseInfo(req);
		req.baseInfo = baseInfo;

		const parsedUrl = getLowerCasePath(req.url);
		const { pathname, query } = parsedUrl;
		const rPath = replacePath(pathname, query);
		const key = await getCacheKey(rPath, baseInfo);
		// If we have a page in the cache, let's serve it
		if (ssrCache.has(key)) {
			console.log(`[lru-cache] serving from cache ${key}`);
			res.setHeader("X-Cache", "Hit");
			res.send(ssrCache.get(key));
			return;
		}

		const rawResEnd = res.end;
		const data = await new Promise((resolve) => {
			// 重写res.end方法，拦截html进行缓存
			res.end = (payload) => {
				if (res.statusCode === 200) {
					ssrCache.set(key, payload, maxAge);
				}
				resolve(payload);
			};
			app.render(req, res, rPath, {
				...req.query,
				...req.params,
			});
		});
		res.setHeader("X-Cache", "Miss");
		res.end = rawResEnd;
		res.send(data);
	};
}

const cacheCommon = (() => {
	const getKey = async (path, baseInfo) => {
		const { name } = baseInfo;
		return `${name}_cookie`;
	};
	return getCacheFunc(getKey);
})();

function cache() {
	server.get(["/help*"], (req, res) => {
		return cacheCommon(req, res, { maxAge: 1000 * 60 * 60 * 1 }); // 1hour
	});
}

module.exports = cache;
