/*
 * @Author: baby张
 * @Date: 2021-08-26 11:22:51
 * @LastEditTime: 2021-11-15 16:46:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /xn-map/src/components/searchContent/index.tsx
 */
import React from "react";
import classnames from "classnames";
import Empty from "src/components/empty";
import "./index.less";

interface SearchContentProps {
  className?: string;
  showSearchCont: Boolean;
  backClick: () => void;
  searchList: SearchList[];
  handleChooseSearch: (e: any, type: boolean) => void;
  viewRef: any;
}

function SearchContent({
  showSearchCont,
  backClick,
  className,
  searchList,
  handleChooseSearch,
  viewRef
}: SearchContentProps) {
  return (
    <div
      ref={viewRef}
      style={{
        // height: 'calc(100vh - 60px)',
        display: showSearchCont ? "block" : "none"
      }}
      className={classnames("search_content", className, {
        search_content_radius: showSearchCont
      })}
      onClick={e => {
        e.stopPropagation();

        backClick();
      }}
    >
      {searchList.length > 0 ? (
        searchList.map((el: SearchList, ind: number) => (
          <div
            onClick={e => {
              e.stopPropagation();
              handleChooseSearch(el, false);
            }}
            className="search_content-box"
            key={ind}
          >
            <div className="name">{el?.name}</div>
            <div className="district">
              {el?.district}-{el?.address}
            </div>
          </div>
        ))
      ) : (
        <Empty text="暂无数据" />
      )}
    </div>
  );
}

export default SearchContent;
