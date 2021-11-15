/*
 * @Author: 宝二
 * @Date: 2021-08-24 12:48:28
 * @LastEditTime: 2021-08-30 17:48:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /xn-map/src/utils/utils.ts
 */

/**
 * 获取地址中指定的查询参数值。
 * @param name 查询参数名。
 * @param url 原地址。
 * @return 返回查询参数值。如果找不到则返回 null。
 * @example getQuery("foo", "?foo=1") // "1"
 * @example getQuery("goo", "?foo=1") // null
 */
export function getQuery(name: string, url = window.location.href) {
  let match = /\?([^#]*)/.exec(url);
  if (match) {
    match = new RegExp(
      "(?:^|&)" +
        encodeURIComponent(name).replace(/([.*+?^${}()|[\]\\])/g, "\\$1") +
        "=([^&]*)(?:&|$)",
      "i"
    ).exec(match[1]);
    if (match) {
      return decodeURIComponent(match[1]);
    }
  }
  return "";
}

export const formatUrl = (url: string) => {
  if (judgePlatform() === "IOS") {
    return url[0] === "/" ? url : `/${url}`;
  } else if (judgePlatform() === "Android") {
    return url[0] !== "/" ? url : url.substr(1, url.length - 1);
  }
  return url;
};

export const judgePlatform = () => {
  if (/iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
    return "IOS";
  } else if (/Android/i.test(window.navigator.userAgent)) {
    // 注意：由于 Windows Phone 的 UA 中也包含 Android 字符串，因此独立使用时注意兼容问题。
    return "Android";
  }
  return "unknown";
};

const dateFormators = {
  __proto__: null,
  y: (date: Date, format: string) => {
    const year = date.getFullYear();
    return format.length < 3 ? year % 100 : year;
  },
  M: (date: Date) => date.getMonth() + 1,
  d: (date: Date) => date.getDate(),
  H: (date: Date) => date.getHours(),
  m: (date: Date) => date.getMinutes(),
  s: (date: Date) => date.getSeconds(),
  e: (date: Date) => "日一二三四五六".charAt(date.getDay())
};

/**
 * 格式化日期对象。
 * @param date 日期对象。
 * @param format 格式字符串，其中以下字符（区分大小写）会被替换：
 *
 * 字符| 意义          | 示例
 * ----|--------------|--------------------
 * y   | 年           | yyyy: 1999, yy: 99
 * M   | 月           | MM: 09, M: 9
 * d   | 日           | dd: 09, d: 9
 * H   | 时（24小时制）| HH: 13, H: 13
 * m   | 分           | mm: 06, m: 6
 * s   | 秒           | ss: 06, s: 6
 * e   | 周（中文）    | 周e: 周一
 *
 * @return 返回格式化后的字符串。
 * @example format(new Date("2016/01/01 00:00:00")) // "2016/01/01 00:00:00"
 * @example format(new Date("2016/01/01 00:00:00"), "yyyyMMdd") // "20160101"
 */
export function formatDate(date = new Date(), format = "yyyy/MM/dd HH:mm:ss") {
  return format.replace(/([yMdHms])\1*/g, (all: string, key: string) => {
    key = (dateFormators as any)[key](date, all) + "";
    while (key.length < all.length) {
      key = "0" + key;
    }
    return key;
  });
}

export const isMobile = () => {
  return /AppleWebKit.*Mobile.*/.test(window.navigator.userAgent);
};

// 遮罩禁止滑动
export const noSlide = {
  add: () => {
    document.getElementsByTagName("html")[0]?.classList.add("no-slide");
    document.body.classList.add("no-slide");
    document.getElementById("scroll-view")?.classList?.add("no-slide");
  },
  remove: () => {
    document.getElementsByTagName("html")[0]?.classList.remove("no-slide");
    document.body.classList.remove("no-slide");
    document.getElementById("scroll-view")?.classList?.remove("no-slide");
  }
};

export const getHashParams: () => {
  readonly [key: string]: string;
} = () => {
  const hashUrl = window.location.hash;
  const hashParams = hashUrl.split("?")[1];
  const result: any = {};
  if (!hashParams) {
    return result;
  }
  const groupParams = hashParams.split("&");
  groupParams.forEach(kv => {
    const [k, v] = kv.split("=");
    result[k] = v;
  });
  return result;
};

/**
 * 获取query的value值
 * @param name 传入查询的key
 * @return 未找到为"", 找到返回value, 全部返回对象
 */
export const getQueryParams = <T extends string | objectString>(
  name = ""
): T => {
  const search = window.location.href;
  if (!search) return "" as T;
  if (name === "") {
    const reg = new RegExp(`([^&?])*=([^&])*`, "g");
    const result = search.match(reg);
    const returnObj: objectString = {};
    return result
      ? (result.reduce((r, c) => {
          const [key, value] = c.split("=");
          r[key] = r[key] || value;
          return r;
        }, returnObj) as T)
      : ("" as T);
  }
  const reg = new RegExp(`${name}=([^&]*)`, "i");
  const result = search.match(reg);
  return result ? (decodeURI(result[1]) as T) : ("" as T);
};

// 黄金令箭埋点
export function record(code: string, params: string = "") {
  window.goldlog && window.goldlog.record(code, "EXP", params, "GET");
}
