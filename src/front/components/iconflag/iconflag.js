import React from 'react';
import 'flag-icons/css/flag-icons.min.css';

/*
 * component - icon - flag
 */
const IconFlag = ({ code, size = 14 }) => {
  const isInherit = size === 'inherit';
  const style = isInherit ? { width: 'inherit', height: 'inherit' } : { width: `${size}px`, height: `${size}px` };
  return (
    <span
      className={`fi fi-${code} anticon ant-menu-item-icon`}
      style={{
        ...style,
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      aria-hidden="true"
    />
  );
};

export default IconFlag;