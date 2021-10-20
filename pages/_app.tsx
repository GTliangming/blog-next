import Layout from "components/Layout";
import LoadingModal from "components/LoadModal";
import App, { AppContext } from "next/app";
import Head from "next/head";
import React from "react";
import Constant, { UserInfo } from "utils/constant";
import { BaseRequest } from "utils/context";
import { GlobalStyle } from "utils/globalStyle";
import { PageStatic } from "utils/types";
import { getStore as GetLoadingStore } from "stores/LoadingStore";
import Router from "next/router";
const loadingStore = GetLoadingStore();
export interface AppProps {
  language: string;
  languageCodes: string[];
  isUat: boolean;
  env: string;
  customerInfo: UserInfo;
  localeObj: { [key: string]: string };
  path: string;
  query: Record<string, string>;
}

export default class MyApp extends App<AppProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    const req = ctx.req as BaseRequest;

    const baseInfo = { cookie: ctx.req.headers?.cookie || "" };

    Constant.cookie = baseInfo.cookie;

    Constant.customerInfo = null;

    req.pathname = ctx.pathname;

    return {
      pageProps,
      customerInfo: null,
      path: req.path,
      query: req.query,
    };
  }
  async componentDidMount() {
    Router.events.on("routeChangeStart", this.showLoading);
    Router.events.on("routeChangeComplete", this.routeChangeComplete);
    Router.events.on("routeChangeError", loadingStore.hideLoading);
  }
  componentWillUnmount() {
    Router.events.off("routeChangeStart", this.showLoading);
    Router.events.off("routeChangeComplete", this.routeChangeComplete);
    Router.events.off("routeChangeError", loadingStore.hideLoading);
  }
  showLoading = () => {
    setTimeout(loadingStore.showLoading);
  };
  routeChangeComplete = () => {
    loadingStore.hideLoading();
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      console.error(e);
    }
  };
  render() {
    const { Component, pageProps, localeObj, path, query, language, customerInfo } = this.props;
    const { SHOW_NAV } = (Component as unknown) as PageStatic;
    if (!__SERVER__) {
      Constant.customerInfo = customerInfo;
    }
    console.log(66666, SHOW_NAV);
    return (
      <React.Fragment>
        <GlobalStyle />
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
          />
          <title>哈哈哈</title>
        </Head>
        <Layout path={path} query={query} userInfo={customerInfo} isShowNav={SHOW_NAV} language={language}>
          <Component {...pageProps} localeObj={localeObj} />
        </Layout>
        <LoadingModal isNav={SHOW_NAV} />
      </React.Fragment>
    );
  }
}
