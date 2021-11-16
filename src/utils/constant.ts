/*
 * @Author: baby张
 * @Date: 2021-11-15 19:07:43
 * @LastEditTime: 2021-11-16 10:12:44
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /map-site/src/utils/constant.ts
 */
const host = window.location.host;

const mapEnv = /^page.cainiao.com/.test(host)
  ? "//page.cainiao.com/xiniao-web/xn-map/index.html/"
  : /^page-pre.cainiao.com/.test(host)
  ? "//page-pre.cainiao.com/xiniao-web/xn-map/index.html/"
  : "//30.117.81.12:49425/";

const AllIcon: {
  markerIcon: string;
  searchIcon: string;
  selfIcon: string;
  closeIcon: string;
  chooseIcon: string;
  addressIcon: string;
} = {
  markerIcon:
    "https://img.alicdn.com/imgextra/i4/O1CN01xSMn9X1NZ3fk0Q2Lj_!!6000000001583-2-tps-104-126.png",
  searchIcon:
    "https://img.alicdn.com/imgextra/i3/O1CN01BqbAld1aHjhHvqUq4_!!6000000003305-2-tps-32-32.png",
  selfIcon:
    "https://img.alicdn.com/imgextra/i2/O1CN017aEHag28cWbsBj8am_!!6000000007953-2-tps-78-56.png",
  closeIcon:
    "https://img.alicdn.com/imgextra/i4/O1CN01CjEaO71JXRolpeE1H_!!6000000001038-2-tps-32-32.png",
  chooseIcon:
    "https://img.alicdn.com/imgextra/i4/O1CN01Zpoczy20YqVTdKSrO_!!6000000006862-2-tps-32-32.png",
  addressIcon:
    "https://img.alicdn.com/imgextra/i4/O1CN01eIPIII239bWOLZsBk_!!6000000007213-2-tps-32-32.png"
};

const API: {
  inputtips: string;
  geo: string;
  around: string;
  regeo: string;
} = {
  inputtips: "https://restapi.amap.com/v3/assistant/inputtips", // 输入查询
  geo: "https://restapi.amap.com/v3/geocode/geo", // 根据文字获取经纬度
  around: "https://restapi.amap.com/v5/place/around", // 获取周边信息
  regeo: "https://restapi.amap.com/v3/geocode/regeo" //坐标解析
};

export { AllIcon, API, mapEnv };
