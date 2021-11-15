/*
 * @Author: your name
 * @Date: 2021-08-23 19:31:42
 * @LastEditTime: 2021-08-27 16:27:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /xn-map/src/@types/dataType.d.ts
 */
/**
 * 基础声明
 */
type objectAny = {
  [key: string]: any | null;
};

type objectString = {
  [key: string]: string | undefined;
};

type objectNumber = {
  [key: string]: number | undefined;
};

type netType = {
  url: string;
  method: "GET" | "POST";
  data?: objectString | objectNumber;
  query?: objectString | objectNumber;
  headers?: Headers;
};

type NetBack = {
  success?: boolean;
  data: string;
  errorCode?: string;
  errorMsg?: string;
  ret?: string | string[];
  status?: string;
};

type ApiBack = {
  success?: boolean;
  data: any;
  errorCode?: string;
  errorMsg?: string;
};

/**
 * 业务声明
 */

interface SearchList {
  adcode: string;
  address: srting;
  district: string;
  id: string;
  location: string | Array;
  name: string;
  typecode: string;
}

interface getGeo {
  location: string;
}

interface AroundList {
  adcode: string; //"330105"
  address: string; // "东粮泊巷6号"
  adname: string; //"拱墅区"
  citycode: string; //"0571"
  cityname: string; //"杭州市"
  id: string; //"B0FFIL011B"
  location: string; //"120.155253,30.290575"
  name: string; // "仙味居面馆(东粮泊巷店)"
  pcode: string; //"330000"
  pname: string; //"浙江省"
  type: string; //"餐饮服务;中餐厅;中餐厅"
}

interface ResultMap {
  location?: string; //"120.154916,30.290829"
  address?: string; //"东粮泊巷17号(近长板巷农贸市场)"
  adcode?: string; //"330105"
  adname?: string; //"拱墅区"
  citycode?: string; // "0571"
  cityname?: string; // "杭州市"
  name?: string; //"塘栖老刀糕点(东粮泊巷店)"
  pcode?: string; //"330000"
  pname?: string; //"浙江省"
}
