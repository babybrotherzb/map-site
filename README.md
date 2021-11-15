<!--
 * @Author: baby张
 * @Date: 2021-11-15 15:13:24
 * @LastEditTime: 2021-11-15 17:19:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /map-site/README.md
-->

# map-site

基于高德 Api 定制私有 H5 选址工具 map-site

此 demo 为单独项目，如入嵌入项目中使用通信方式自改

## 前期使用准备 前往高德申请

===务必替换掉两个 key===

[高德控制台](https://console.amap.com/dev/key/app)

- 高德 web key // 替换 public/index.html 里的 key 值
- 高德 server key // 替换 src/pages/home/index.tsx 里的 serverKey 值

## 涉及的高德接口

- [输入提示](https://restapi.amap.com/v3/assistant/inputtips)
- [地址转坐标](https://restapi.amap.com/v3/geocode/geo)
- [周边](https://restapi.amap.com/v5/place/around)
- [坐标转地址](https://restapi.amap.com/v3/geocode/regeo)

## 调用参数

| 参数      | 是否必传       | 用处             |
| --------- | -------------- | ---------------- |
| key       | Y              |                  |
| serverKey | Y              | 调用接口         |
| v         | N 默认 2.0     | 地图 CDN 版本    |
| title     | N 默认选择地址 | 替换组件的 title |
| desc      | N 无则不显示   | 额外的提示说明   |
| location  | N 默认当前坐标 | 默认选中的坐标点 |
| zoom      | N 默认 15      | 缩放级别         |

```sh
 openPage({
      url: `当前项目发布的地址?key=${}&desc${}&v=${}&title=${}&zoom=${}&serverKey=${}&location=${}#/`,
    });

```

```sh

// 返回的数据类型
const myEvent = (res) => {
    const {
        location?: string; //"120.154916,30.290829"
        address?: string; //"东粮泊巷17号(近长板巷农贸市场)"
        adcode?: string; //"330105"
        adname?: string; //"拱墅区"
        citycode?: string; // "0571"
        cityname?: string; // "杭州市"
        name?: string; //"塘栖老刀糕点(东粮泊巷店)"
        pcode?: string; //"330000"
        pname?: string; //"浙江省"
     } = res.param

}

// 监听选址事件 MapData

useEffect(() => {
    document.addEventListener('MapData', myEvent, false);
    return () => document.removeEventListener('MapData', myEvent,false);
    // eslint-disable-next-line
  }, [addressKey]);

```

## 项目运行

```sh
# 安装依赖
1. npm install

# 直接运行项目
2.npm run dev

# http://localhost:3000/

```

## 来源地址 ，来点 star 呗

- [github 地址：https://github.com/babybrotherzb](https://github.com/babybrotherzb)
- [博客地址：https://blog.csdn.net/weixin_43648947](https://blog.csdn.net/weixin_43648947)
- [掘金地址：https://juejin.im/user/5d90295cf265da5b5c08f32d/activities](https://juejin.im/user/5d90295cf265da5b5c08f32d/activities)
