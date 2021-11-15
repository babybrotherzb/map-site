/*
 * @Author: baby张
 * @Date: 2021-11-15 16:12:58
 * @LastEditTime: 2021-11-15 16:53:52
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /map-site/src/utils/api.ts
 */
import request from "./fetch";
import { API } from "./constant";

class Api {
  // 搜索地理位置
  static getInputtips(data: { key: string; keywords?: string }) {
    return request({
      url: API.inputtips,
      method: "GET",
      params: data
    });
  }

  // 无坐标省市区二次定位
  static getGeo(data: { key: string; address?: string }) {
    return request({
      url: API.geo,
      method: "GET",
      params: data
    });
  }

  // 获取周边数据
  static getAround(data: { key: string; location?: string }) {
    return request({
      url: API.around,
      method: "GET",
      params: data
    });
  }

  // 地址坐标解析
  static getReGeo(data: {
    key: string;
    [name: string]: string;
    location: string;
  }) {
    return request({
      url: API.regeo,
      method: "GET",
      params: data
    });
  }
}
export default Api;
