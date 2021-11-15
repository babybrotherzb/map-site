/*
 * @Author: baby张
 * @Date: 2021-08-26 11:22:51
 * @LastEditTime: 2021-11-15 16:46:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */
import React, { ReactNode, ReactType } from "react";
import ReactDOM from "react-dom";
import WifiSvg from "src/static/svg/wifi";
import SuccessSvg from "src/static/svg/success";
import ErrorSvg from "src/static/svg/error";
import InfoSvg from "src/static/svg/info";
import WarnSvg from "src/static/svg/warnning";
import "./index.less";

type toastType =
  | "info"
  | "success"
  | "error"
  | "warning"
  | "default"
  | "net-error"
  | "custom";
type toastConfig = {
  text: string | ReactNode;
  during: number;
  type: toastType;
  icon?: string | ReactType;
};

let timer: any | null = null;
const style = { width: "40px", height: "40px" };

const ToastDom = ({
  type = "default",
  text = "",
  icon: Icon = ""
}: {
  type: toastType;
  text: string | ReactNode;
  icon: string | ReactType;
}) => {
  const judgeType = (type: toastType) => {
    switch (type) {
      //todo add icon
      case "info":
        return (
          <>
            <div className="icon-wrapper">
              <InfoSvg style={style} />
            </div>
            <pre>{text}</pre>
          </>
        );
      case "success":
        return (
          <>
            <div className="icon-wrapper">
              <SuccessSvg style={style} />
            </div>
            <pre>{text}</pre>
          </>
        );
      case "error":
        return (
          <>
            <div className="icon-wrapper">
              <ErrorSvg style={style} />
            </div>
            <pre>{text}</pre>
          </>
        );
      case "warning":
        return (
          <>
            <div className="icon-wrapper">
              <WarnSvg style={style} />
            </div>
            <pre>{text}</pre>
          </>
        );
      case "net-error":
        return (
          <>
            <div className="icon-wrapper">
              <WifiSvg style={style} />
            </div>
            <pre>{text}</pre>
          </>
        );
      case "custom":
        return (
          <>
            <div className="icon-wrapper">
              {typeof Icon === "string" ? Icon : <Icon />}
            </div>
            <pre>{text}</pre>
          </>
        );
      default:
        return <pre>{text}</pre>;
    }
  };
  return judgeType(type);
};

const judgeWrapper = () => {
  const wrapper = document.getElementById("toast-wrapper");
  return wrapper;
};

const createToastWrapper = () => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", "toast-wrapper");
  document.body.appendChild(wrapper);
  return wrapper;
};

const deleteToastWrapper = () => {
  const wrapper = document.getElementById("toast-wrapper");
  wrapper && wrapper.remove();
};

const ToastDirect = ({
  text = "",
  during = 2000,
  type = "default",
  icon = ""
}: toastConfig) => {
  clearTimeout(timer);
  let wrapper = judgeWrapper();
  if (!wrapper) {
    wrapper = createToastWrapper();
  } else {
    wrapper.className = wrapper.className.replace(/\shide/, "");
  }
  ReactDOM?.render(ToastDom({ text, type, icon }), wrapper);
  timer = setTimeout(() => {
    if (!!wrapper) {
      wrapper.className += " hide";
    }
    setTimeout(() => {
      deleteToastWrapper();
    }, 200);
  }, during);
};

export default class Toast {
  static success = (text: string | ReactNode, during: number = 2000) => {
    ToastDirect({ text, during, type: "success" });
  };
  static info = (text: string | ReactNode, during: number = 2000) => {
    ToastDirect({ text, during, type: "info" });
  };
  static error = (text: string | ReactNode, during: number = 2000) => {
    ToastDirect({ text, during, type: "error" });
  };
  static warning = (text: string | ReactNode, during: number = 2000) => {
    ToastDirect({ text, during, type: "warning" });
  };

  static netError = (text: string | ReactNode, during: number = 2000) => {
    ToastDirect({ text, during, type: "net-error" });
  };

  static custom = (
    text: string | ReactNode,
    during: number = 2000,
    icon?: string | ReactType
  ) => {
    ToastDirect({ text, during, type: "custom", icon });
  };

  static default = (text: string | ReactNode, during: number = 2000) => {
    ToastDirect({ text, during, type: "default" });
  };
}
