import Layout from "components/Layout";
import App, { AppContext } from "next/app";
import Head from "next/head";
import React from "react";
import "assets/scss/globals.css";
import Constant, { UserInfo } from "utils/constant";
import { BaseRequest } from "utils/context";

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

  componentDidMount() {
  }

  render() {
    const { Component, pageProps, localeObj, path, query, language, customerInfo } = this.props;
    if (!__SERVER__) {
      Constant.customerInfo = customerInfo;
    }
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
          />
          <title>{"飞竹 - soar bamboos"}</title>
        </Head>
        <Layout path={path} query={query} userInfo={customerInfo} showHeader={pageProps.showHeader} language={language}>
          <Component {...pageProps} localeObj={localeObj} />
        </Layout>
      </>
    );
  }
}
