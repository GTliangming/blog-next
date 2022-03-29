import Layout from "components/Layout";
import LoadingModal from "components/LoadModal";
import App from "next/app";
import Head from "next/head";
import React from "react";
import Constant, { UserInfo } from "utils/constant";
import { GlobalStyle } from "utils/globalStyle";
import { PageStatic } from "utils/types";
import { getStore as GetLoadingStore } from "stores/LoadingStore";
import Router from "next/router";
const loadingStore = GetLoadingStore();
require("assets/css/index.css");
if (!__SERVER__) {
  require("assets/iconfont/iconfont");
}
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
  static getInitialProps = async ({ ctx }) => {
    return {
      pageProps: {
        baseInfo: ctx?.req?.baseInfo,
        hostname: ctx?.req?.hostname,
        pathname: ctx?.pathname,
        query: ctx?.query,
      },
    };
  };
  componentDidMount() {
    Router.events.on("routeChangeStart", this.showLoading);
    Router.events.on("routeChangeComplete", this.routeChangeComplete);
    Router.events.on("routeChangeError", this.routeChangeComplete);
  }
  componentWillUnmount() {
    Router.events.off("routeChangeStart", this.showLoading);
    Router.events.off("routeChangeComplete", this.routeChangeComplete);
    Router.events.off("routeChangeError", this.routeChangeComplete);
  }
  showLoading = () => {
    loadingStore.showLoading();
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
    const { SHOW_NAV, COMMON_PAGE } = (Component as unknown) as PageStatic;
    if (!__SERVER__) {
      Constant.customerInfo = customerInfo;
    }
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
        <Layout path={path} query={query} userInfo={customerInfo} isShowNav={SHOW_NAV} language={language} isCommonPage={COMMON_PAGE}>
          <Component {...pageProps} localeObj={localeObj} />
        </Layout>
        <LoadingModal isNav={SHOW_NAV} />
      </React.Fragment>
    );
  }
}
