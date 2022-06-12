const cookieParser = require("cookie-parser");
const Cookies = require("cookies");
const { concatCookie } = require("./utils/cookie");

const { dev, app, server } = require("./utils/app");
// const cache = require("./utils/cache");
const { redirectLogin, getRedirectUrl } = require("./utils/redirect");
const { getBaseInfo, replacePath, getLowerCasePath } = require("./utils/utils");

const handle = app.getRequestHandler();
const port = process.env.PORT;
const ip = "127.0.0.1";
const COOKIE_ID = "soar";

app
    .prepare()
    .then(() => {
        server.use(cookieParser());

        server.get("/health", (req, res) => {
            res.status(200);
            res.end("ok");
        });

        if (!dev) {
            cache();
        }

        async function requestHandle(req, res) {
            const startTime = Date.now();
            const isSSGData = req.url.indexOf("_next/data") > -1;
            const isStaticFile =
                (!isSSGData && req.url.indexOf("_next") > -1) || req.url.indexOf("/icon.ico") > -1;
            if (isStaticFile) {
                await handle(req, res);
            } else {
                req.baseInfo = await getBaseInfo(req);
                const cookies = new Cookies(req, res);
                const cookie_id = cookies.get(COOKIE_ID);
                if (!cookie_id) {
                    // const { value, path, domain } = getServerEzspm(req.hostname);
                    // cookies.set(COOKIE_ID, value, {
                    //     path,
                    //     domain,
                    // });
                    const value = 111;
                    const baseInfo = req.baseInfo;
                    const newCookie = concatCookie(baseInfo.cookie || "", `${COOKIE_ID}=${value}`);
                    const newCookies = {
                        ...baseInfo.cookies,
                        [COOKIE_ID]: value,
                    };
                    req.baseInfo = {
                        ...baseInfo,
                        cookie: newCookie,
                        cookies: newCookies,
                    };
                }
                if (isSSGData) {
                    await handle(req, res);
                } else {
                    const parsedUrl = getLowerCasePath(req.url); // 兼容路由大小写
                    const { pathname, query } = parsedUrl;
                    req.pathname = pathname;
                    if (req.baseInfo.needRedirect) {
                        res.redirect(`${req.protocol}://${req.baseInfo.redirectUrl}`);
                        return;
                    }
                    // 部分强制登录页面校验
                    if (redirectLogin(req, res, pathname)) {
                        return;
                    }
                    if (getRedirectUrl(pathname)) {
                        res.redirect(getRedirectUrl(pathname));
                        return;
                    }
                    const rPath = replacePath(pathname, query);
                    await app.render(req, res, rPath, query);
                }
            }
        }

        server.get("*", requestHandle);

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://${ip}:${port}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });

