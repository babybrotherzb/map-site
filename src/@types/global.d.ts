/*
 * @Author: your name
 * @Date: 2021-11-15 16:07:16
 * @LastEditTime: 2021-11-15 16:07:33
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /map-site/src/@types/global.d.ts
 */
declare module "proxy-polyfill/src/proxy";
declare let __webpack_public_path__: string;

interface Window {
  trace: any;
  WindVane: Function;
  AMap: any;
  goldlog: any;
  AMapUI: any;
  init: any;
  goldlog_queue?: any[];
  __WPO: any;
  publicPath: string;
}

declare let AMap: any;

interface Navigator {
  webkitVibrate: Function;
  mozVibrate: Function;
  msVibrate: Function;
}
declare let wv: window.WindVane;
