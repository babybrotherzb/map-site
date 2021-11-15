/*
 * @Author: baby张
 * @Date: 2021-11-15 16:11:33
 * @LastEditTime: 2021-11-15 16:46:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /xn-h5-task-video/src/components/empty/index.tsx
 */
import React, { ReactNode } from "react";
import "./index.less";

interface EmptyProps {
  text: string | ReactNode;
  desc?: string | ReactNode;
}

const Empty: React.FC<EmptyProps> = ({ text, desc }) => {
  return (
    <div className="empty">
      <img
        className="empty-image"
        src="https://img.alicdn.com/imgextra/i1/O1CN01pI0zsb1XvAxT3GqoC_!!6000000002985-2-tps-600-600.png"
        alt="无数据"
      />
      <div className="empty-text">{text}</div>
      <div className="empty-desc">{desc}</div>
    </div>
  );
};

export default Empty;
