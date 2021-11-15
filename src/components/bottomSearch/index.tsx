/*
 * @Author: baby张
 * @Date: 2021-11-15 16:11:33
 * @LastEditTime: 2021-11-15 16:46:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */
import React from "react";
import Empty from "src/components/empty";
import { AllIcon } from "src/utils/constant";
import { getQuery } from "src/utils/utils";
import "./index.less";

interface BottomSearchProps {
  aroundList: AroundList[];
  handleChooseSearch: (el: any, type: boolean) => void;
  handleSave: () => void;
  result: any;
  PostMsg: (data?: any) => void;
}
function BottomSearch({
  aroundList,
  handleChooseSearch,
  handleSave,
  PostMsg,
  result
}: BottomSearchProps) {
  return (
    <div className="bottom_search">
      <div className="bottom_search-content" id="bottomSearch">
        {aroundList.length > 0 ? (
          aroundList.map((el: AroundList) => (
            <div
              key={el.id}
              className="bottom_search-content-box"
              onClick={() => {
                handleChooseSearch(el, true);
              }}
            >
              <div className="left_name">
                <div className="name">
                  {el.name && !Array.isArray(el.name) ? el.name : "当前位置"}
                </div>
                <div className="address">{el.address}</div>
              </div>
              {result?.id === el.id && (
                <img
                  className="chooseicon"
                  alt="choose"
                  src={AllIcon.chooseIcon}
                />
              )}
            </div>
          ))
        ) : (
          <Empty text="暂无数据" />
        )}
      </div>
      <div className="bottom_button">
        {getQuery("h5") && (
          <div
            className="cancle"
            onClick={() => {
              PostMsg({ cancle: true });
            }}
          >
            取消
          </div>
        )}

        <div className="save" onClick={handleSave}>
          保存
        </div>
      </div>
    </div>
  );
}

export default BottomSearch;
