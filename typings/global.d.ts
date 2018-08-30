/* tslint:disable:interface-name */
declare module "*.svg";
declare module "*.json";
declare module "*.png";
declare module "*.jpg";
declare module "*.mp3";
declare module "*.mp4";
declare module "*.xml";
declare module "class-names";

declare var InstallTrigger: any;
declare var SharedWorker: any;
declare var importScripts: any;
declare var rtn: any;
declare var os: any;

declare type BlobBuilder = any;
declare type WebKitBlobBuilder = any;
declare type MozBlobBuilder = any;

declare var BlobBuilder: BlobBuilder;
declare var WebKitBlobBuilder: WebKitBlobBuilder;
declare var MozBlobBuilder: MozBlobBuilder;

declare interface NodeModule {
  hot: any;
}

declare namespace NodeJS {
  interface Global {
    fetch: any;
    Request: any;
    DOMParser: any;
    SVGPathElement: any;
  }
}

declare type int = number;
declare type float = number;

declare type Constructor<T> = new (...args: any[]) => T;
declare type Decorator<T, U extends T> = (Component: Constructor<T>) => Constructor<U>;
