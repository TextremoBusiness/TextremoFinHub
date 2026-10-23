import React, { useRef, useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { move } from '@dnd-kit/helpers';
import "./listsort.less"

// 单项内部处理 DOM 句柄
function SortableItem({ id, index, icon, children }) {
  const [element, setElement] = useState(null);
  const handleRef = useRef(null);
  const { isDragging } = useSortable({ id, index, element, handle: handleRef });

  return (
    <li
      ref={setElement}
      className="item"
      data-shadow={isDragging || undefined}
      style={{ listStyle: 'none' }}
    >
      <button ref={handleRef} className="handle" type="button" />
      {icon ? <span className='Icon'>{icon}</span> : null }
      <div style={{ flex: 1 }}>{children}</div>
      
    </li>
  );
}

/**
 * 对外导出的通用拖拽列表控件
 * @dnd-kit 的核心 API（useSortable）是 React Hook，根据 React 规范，Hook 不能直接在类组件（React.Component）内部调用。
 * 无法导出 React.Component
 * @items list[{id, icon, label}], `id` is a number, `icon` is a DOM obj, `label` is a string or a DOM obj
 * @onChange onChange(newItems){} 传入新的排序的items
 */
export default function ListSort({ items, onChange }) {
  const handleDragEnd = (event) => {
    if (onChange) {
      // 触发外部传入的更新事件，返回重新排序后的数组
      const nextItems = move(items, event);
      onChange(nextItems);
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <ul className="CompListSort" style={{ padding: 0, margin: '16px 0' }}>
        {items.map((item, index) => (
          <SortableItem key={item.id} id={item.id} index={index} icon={item.icon}>
            { item.label ? item.label : null }
          </SortableItem>
        ))}
      </ul>
    </DragDropProvider>
  );
}