/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="@alife/dipan-polygon" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test" | "release";
    readonly PUBLIC_URL: string;
  }
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  >>;

  const src: string;
  export default src;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "@alife/dipan-polygon" {
  const dipan: { readonly [name: string]: any };
  export default dipan;
}

interface Window {
  helloWorld(): void;
  _global: {
    qiniu_domain: string;
    qiniu_static_domain: string;
  };
  location: Object;
  io: any;
  WWOpenData: any;
  openidList: any;
}

declare var window: Window;
declare var Math: Math;
declare var Date: Date;
declare var G2: any;
declare var DataSet: any;
// socket.io client
declare var io: any;
declare var particlesJS: any;
declare var wx: any;
