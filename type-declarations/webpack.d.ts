
declare const __SERVER__: boolean;
declare const TITLE: string;

declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.json";

declare namespace Global {
    export interface HeadMeta {
        image: string;
        description: string;
        keywords: string;
        type: string;
        url: boolean;
        canonical: boolean;
    }
    export interface Request {
        cookies: object;
        baseInfo: BaseInfo;
        headmeta?: Partial<HeadMeta>;
    }
    export interface Context {
        req: Request;
        query: NodeJS.Dict<string | string[]>;
        params: NodeJS.Dict<string | string[]>;
    }
}
