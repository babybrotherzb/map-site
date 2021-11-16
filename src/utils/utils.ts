/*
 * @Author: baby张
 * @Date: 2021-11-15 16:12:58
 * @LastEditTime: 2021-11-16 10:13:00
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /map-site/src/utils/utils.ts
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
