/*
 * @Author: baby张
 * @Date: 2021-11-15 15:50:06
 * @LastEditTime: 2021-11-16 10:08:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /map-site/src/page/home/index.tsx
 */

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Search, SearchContent, BottomSearch, Toast } from "src/components";
import { AllIcon } from "src/utils/constant";
import { getQuery } from "src/utils/utils";
import API from "src/utils/api";
import "./index.less";

interface PageHomeProps {}

const PageHome: React.FC<PageHomeProps> = props => {
  const viewRef = useRef<any>();
  const refInput = useRef<any>();
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>();
  const [ifshow, setIfshow] = useState<boolean>(true); // 展示按钮
  const [inputval, setInputval] = useState<string>("");
  const [showSearchCont, setShowSearchCont] = useState<boolean>(false); // 展示搜索内容
  const [searchList, setSearchList] = useState<SearchList[]>([]); // 地理搜索数据
  const [selfCenter, setSelfCenter] = useState<any>([]); // 自己中心坐标[120.154066, 30.290777],
  const [gdCenter, setGdCenter] = useState<any>([]); // 高德获取的当前位置
  const [aroundChoose, setAroundChoose] = useState<boolean>(false); //是否选中周边数据
  const [firstSearch, setFristSearch] = useState<boolean>(false); // 是否刚搜索过**
  const [aroundList, setAroundList] = useState<AroundList[]>([]); // 周边列表
  const [result, setResult] = useState<any>(); // 最终选中结果
  let serverKey: string =
    getQuery("serverKey") || "8e5a71262cda4c03862279b0b9849515"; // 项目里自己使用企业 mapkey
  let ifH5 = getQuery("h5");

  useEffect(() => {
    let title = getQuery("title");
    document.title = title || "选择地址";
    if (!getQuery("serverKey") || !getQuery("key")) {
      Toast.error("请单独申请高德mapKey");
    }
    onloadMap();
    return () => {
      map && map?.destroy();
    };
    // eslint-disable-next-line
  }, [selfCenter, window, map]);

  const onloadMap = () => {
    window.onload = async function() {
      initMap();
      console.log("========== init ==========");
    };
  };

  const initMap = () => {
    console.log(AMap, "AMap AMap AMap ");
    AMap.plugin("AMap.Geolocation", async function() {
      let geolocation = await new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认：true
        timeout: 10000, // 设置定位超时时间，默认：无穷大
        zoomToAccuracy: true, //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        showButton: false,
        panToLocation: false, // 定位成功后是否自动移动到响应位置
        GeoLocationFirst: false // 优先使用H5定位，默认移动端为true，PC端为false
      });
      let local: any = null;
      let localArr: any = [];

      if (local && local.location) {
        const { latitude, longitude } = JSON.parse(local.location);
        localArr = [longitude, latitude];
        setSelfCenter(localArr);
      }
      console.log(local, "load ----");

      let center = getQuery("location");
      let mapcenter = center
        ? center.split(",")
        : localArr.length > 0
        ? localArr
        : "";
      // 初始化地图
      let newmap = await new window.AMap.Map("position", {
        zoom: getQuery("zoom") || 15,
        center: mapcenter
      });
      if (!local || !local.location) {
        newmap.addControl(geolocation);
        geolocation.getCurrentPosition(async function(
          status: string,
          result: any
        ) {
          if (status === "complete" && result && result.position) {
            const { lng, lat } = result.position;
            console.log([lng, lat], "--200--");
            localArr = await [lng, lat];
            newmap.setCenter(center.split(","));
            setGdCenter([lng, lat]);
          }
        });
      }

      // 中心点坐标
      let marker = await new window.AMap.Marker({
        icon: AllIcon.markerIcon,
        anchor: "bottom-center",
        position: mapcenter
      });

      // 当前位置
      if (localArr.length > 0) {
        let selfmarker = await new window.AMap.Marker({
          icon: AllIcon.selfIcon,
          offset: new AMap.Pixel(0, -10),
          anchor: "center-left",
          position: localArr
        });
        newmap?.add(selfmarker);
      }

      newmap?.add(marker);
      setMarker(marker);
      setMap(newmap);
      getAround(mapcenter && mapcenter.length > 0 ? mapcenter.join() : "");
      console.log(marker, "marker");
    });
  };

  // 移动地图事件
  const showInfoMapmoveend = () => {
    const { lng, lat } = map.getCenter();
    marker?.setPosition([lng, lat]);
  };

  // 地图停止移动
  const showInfoMoveendEnd = useCallback(() => {
    const { lng, lat } = map?.getCenter();
    let location = `${lng},${lat}`;
    console.log(aroundChoose, "+++move+++");
    if (!aroundChoose) {
      // true 为选中了周边
      getAround(location);
    }
    // eslint-disable-next-line
  }, [aroundChoose, map]);

  // 点击地图事件
  const handleClick = useCallback(() => {
    console.log("click");
    setIfshow(!ifshow);
    refInput.current.blur();
    setShowSearchCont(false);
  }, [ifshow]);

  // 检测是否拖动
  const showGragStart = () => {
    refInput.current.blur();
    setShowSearchCont(false);
    setAroundChoose(false);
    setFristSearch(false);
    // 自定义上报
  };

  // 初始化map事件
  const initEvent = () => {
    map.on("click", handleClick);
    map.on("mapmove", showInfoMapmoveend);
    map.on("moveend", showInfoMoveendEnd);
    map.on("dragstart", showGragStart);
  };

  // 销毁监听
  const destoryEvent = () => {
    map?.off("click", handleClick);
    map?.off("mapmove", showInfoMapmoveend);
    map?.off("moveend", showInfoMoveendEnd);
    map?.off("dragstart", showGragStart);
  };

  useEffect(() => {
    console.log("initevent");
    if (map?.on) {
      initEvent();
    }
    return () => destoryEvent();
    // eslint-disable-next-line
  }, [map, aroundChoose, firstSearch]);

  const onFocus = () => {
    setShowSearchCont(true);
  };

  // 顶部输入框搜索
  const handleOnSubmit = (e: any) => {
    e.stopPropagation();
    getList(inputval);
  };

  // 获取地址数据
  const getList = (address?: string) => {
    API.getInputtips({ key: serverKey, keywords: address })
      .then((res: any) => {
        if (res && res.info === "OK") {
          setSearchList(res.tips);
        }
      })
      .catch((err: any) => {
        console.log(err, "err");
      });
  };

  // 选中无坐标地址 type true表示选择了周边/底部搜索触发
  const handleChooseSearch = (item: any, type: boolean) => {
    setAroundChoose(type);
    let loca = item.location;
    if (type) {
      // true 底部周边
    } else {
      setFristSearch(true);
      setInputval(item.name);
      console.log(type, "type---0000----11111---");
    }
    if (!loca || !loca.length) {
      API.getGeo({ key: serverKey, address: item.name }).then((res: any) => {
        if (res && res.info === "OK") {
          loca = res.geocodes[0]?.location;
          let data = {
            ...item,
            location: loca,
            cityname: item.city,
            name: item.name,
            address: item.name,
            adname: "",
            citycode: "",
            pname: "",
            pcode: ""
          };
          chooseCenter(loca);
          setResult(data);
        } else {
          Toast.error("地址解析失败");
        }
      });
    } else {
      let data = type
        ? item
        : {
            ...item,
            location: loca,
            cityname: item.city,
            name: item.name,
            address: item.district
          };
      console.log(data, item, type, loca, "搜索的 search");
      chooseCenter(loca);
      setResult(data);
    }
  };

  // 滚动回到顶部
  const scrollTop = () => {
    (document.getElementById("bottomSearch") as any).scrollTop = 0;
  };

  // 获取周边数据
  const getAround = (location: string) => {
    if (!location) {
      return;
    }
    let postdata = { key: serverKey, location: location };
    // console.log(serverKey, location, '获取周边data');
    API.getAround(postdata)
      .then((resA: any) => {
        scrollTop();
        if (resA?.info === "OK" && resA?.pois) {
          if (firstSearch && result) {
            let arr = [...resA?.pois];
            let ifsame = arr.some(el => {
              let same = el.id === result.id;
              if (same) {
                setResult(el);
              }
              return same;
            });
            // console.log(result, ifsame, 'search arr');
            if (!ifsame) {
              arr.unshift(result);
            }
            setAroundList(arr);
          } else {
            API.getReGeo(postdata).then((res: any) => {
              if (res && res.regeocode) {
                const {
                  adcode,
                  district,
                  citycode,
                  city,
                  neighborhood,
                  province
                } = res?.regeocode?.addressComponent;
                let arr = [...resA?.pois];
                let newdata = {
                  id: "chooseid",
                  location: location,
                  address: res?.regeocode?.formatted_address,
                  adcode,
                  adname: district,
                  citycode,
                  cityname: city,
                  pname: province,
                  pcode: adcode.slice(0, 2) + "0000",
                  name: neighborhood?.name
                };
                arr.unshift(newdata);
                console.log(arr, "arr=000===00");
                setAroundList(arr);
                setResult(newdata);
              }
            });
          }
        }
      })
      .catch(() => {
        // Toast.error('坐标解析异常');
      });
  };

  // 坐标解析
  const getReGro = (data: { key: string; location: string; other: any }) => {
    console.log(data, "getregro");
    API.getReGeo(data).then((res: any) => {
      if (res && res.regeocode) {
        const {
          adcode,
          district,
          citycode,
          city,
          province
        } = res?.regeocode?.addressComponent;
        const options = {
          ...data.other,
          location: data.location,
          address: res?.regeocode?.formatted_address,
          adcode,
          adname: district,
          citycode,
          cityname: city,
          pname: province,
          pcode: adcode.slice(0, 2) + "0000"
        };
        console.log(options, "直接搜索后 的解析值");
        nativePostMsg(options);
      }
    });
  };

  // 跳转坐标
  const chooseCenter = (loca: string) => {
    const [lng, lat] = loca.split(",");
    map?.setCenter([lng, lat]);
    setShowSearchCont(false);
    refInput.current.blur();
  };

  // 保存
  const handleSave = () => {
    if (result) {
      const { lng, lat } = map?.getCenter();
      let location = `${lng},${lat}`;
      console.log(aroundChoose, result, "+++save+++");
      if (!aroundChoose) {
        const { id, district, ...other } = result;
        // true 为选中了周边
        getReGro({ key: serverKey, location, other });
      } else {
        const { id, type, typecode, ...other } = result;
        const { pname, cityname, adname, name } = other;
        const newdata = {
          ...other,
          location,
          address: `${pname}${cityname}${adname}${name}`
        };
        nativePostMsg(newdata);
      }
    }
  };

  // bridge通信 或postMessage通信
  const nativePostMsg = (data: ResultMap) => {
    console.log(data, "nativePostMsg");
    PostMsg(data);
  };

  // postMessage 通信
  const PostMsg = (data: any) => {
    window?.parent?.postMessage(data, "*");
    window?.postMessage(data, "*");
    let h5_iframe = window?.parent?.document.getElementById("h5_iframe");
    console.log(h5_iframe, "h5_iframe");
    if (h5_iframe) {
      h5_iframe.remove();
    }
  };

  return (
    <div className="page-home">
      <Search
        onFocus={onFocus}
        refInput={refInput}
        inputval={inputval}
        showSearchCont={showSearchCont}
        inpChange={(e: any) => {
          setInputval(e.target.value);
          getList(e.target.value);
        }}
        handleOnSubmit={handleOnSubmit}
        onBack={() => {
          setShowSearchCont(false);
          refInput.current.blur();
        }}
        handleEmpty={() => {
          setInputval("");
          setSearchList([]);
        }}
      >
        <SearchContent
          viewRef={viewRef}
          showSearchCont={showSearchCont}
          backClick={() => {
            console.log("click black");
            setShowSearchCont(false);
            refInput.current.blur();
          }}
          searchList={searchList}
          handleChooseSearch={handleChooseSearch}
        />
      </Search>

      <div
        className="my_map"
        style={{ height: showSearchCont ? "100vh" : "60vh" }}
      >
        <div
          id="position"
          style={{ height: showSearchCont ? "100vh" : "60vh" }}
        ></div>
        <div
          className="add_self"
          onClick={() => {
            console.log(selfCenter, gdCenter, "点击回到我定位-selfCenter");
            setFristSearch(false);
            if (selfCenter.length) {
              map?.setCenter(selfCenter);
            } else if (gdCenter.length) {
              map?.setCenter(gdCenter);
            } else {
              Toast.error("未获取到当前坐标");
              return;
            }
          }}
        >
          <img className="add_self-icon" alt="self" src={AllIcon.addressIcon} />
          点击获取当前位置
        </div>
      </div>
      {!showSearchCont && (
        <BottomSearch
          result={result}
          aroundList={aroundList}
          handleChooseSearch={handleChooseSearch}
          handleSave={handleSave}
          PostMsg={PostMsg}
        />
      )}
    </div>
  );
};

export default PageHome;
