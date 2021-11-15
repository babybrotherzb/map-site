/*
 * @Author: baby张
 * @Date: 2021-08-25 17:28:00
 * @LastEditTime: 2021-11-15 16:45:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /xn-map/src/components/Search/index.tsx
 */
import React, { FocusEvent, ReactNode, useEffect, useState } from "react";
import { AllIcon } from "src/utils/constant";
import { getQuery } from "src/utils/utils";
import "./index.less";

interface SearchProps {
  inputval?: string;
  inpChange: any;
  refInput: any;
  showSearchCont: boolean;
  onFocus: (event: FocusEvent<HTMLInputElement>) => void;
  handleOnSubmit: (event: any) => void;
  onBack: () => void;
  children: ReactNode;
  handleEmpty: () => void;
}
function Search({
  inputval,
  inpChange,
  refInput,
  showSearchCont,
  onFocus,
  handleOnSubmit,
  onBack,
  handleEmpty,
  children
}: SearchProps) {
  const [desc, setDesc] = useState<undefined | string>();

  useEffect(() => {
    let para = getQuery("desc");
    setDesc(para || "如未选中周边信息，最终以标记点坐标为准。");
  }, []);

  return (
    <div className={"search" + (showSearchCont && inputval ? " noradius" : "")}>
      <div className="search-left">
        <div className="search-left-placeholder">
          <img
            className="search-left-placeholder-icon"
            alt="icon"
            src={AllIcon.searchIcon}
          />
        </div>
        <form
          className="inputform"
          action=""
          target="tset"
          onSubmit={handleOnSubmit}
        >
          <input
            ref={refInput}
            onFocus={onFocus}
            value={inputval}
            onChange={inpChange}
            placeholder="请搜索地址名称"
            className="search-left-input"
          />
          {inputval && showSearchCont && (
            <img
              onClick={handleEmpty}
              className="search-left-close"
              alt="icon"
              src={AllIcon.closeIcon}
            />
          )}
        </form>
        <iframe
          title="form"
          id="iframe"
          name="tset"
          style={{ display: "none" }}
        ></iframe>
      </div>
      {showSearchCont && (
        <div className="search-right" onClick={onBack}>
          取消
        </div>
      )}
      {desc && (
        <div
          className="desc"
          onClick={() => {
            setDesc("");
          }}
        >
          <div>{desc}</div>
          <img className="close" alt="x" src={AllIcon.closeIcon} />
        </div>
      )}
      {inputval && children}
    </div>
  );
}

export default Search;
