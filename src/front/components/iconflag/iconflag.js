import React from 'react';
import 'flag-icons/css/flag-icons.min.css';

// 封装一个国旗组件
const IconFlag = ({ code, size = 14 }) => {
  return (
    <span
      className={`fi fi-${code} anticon ant-menu-item-icon`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      aria-hidden="true"
    />
  );
};

export default IconFlag;