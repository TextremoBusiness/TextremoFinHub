/* React */
import { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl' // react-intl multiple languages
/* dnd-kit */
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { move } from '@dnd-kit/helpers';
/* antd */
import { Button } from 'antd';          // 按钮
import { Popconfirm } from 'antd';      // 弹出确定
import { notification } from 'antd';    // 通知框
// icons
import { CloseOutlined } from '@ant-design/icons';
/* less */
import "./listsort.less"

// 单项内部处理 DOM 句柄
function SortableItem({ id, index, icon, label, onDelete, children }) {
  const [element, setElement] = useState(null);
  const handleRef = useRef(null);
  const { isDragging } = useSortable({ id, index, element, handle: handleRef });

  return (
    <li
      ref={setElement}
      className="item"
      data-shadow={isDragging || undefined}
    >
      <button ref={handleRef} className="handle" type="button" />
      {icon ? <span className='Icon'>{icon}</span> : null }
      {label ? <span className='Label'>{label}</span> : null }
      <div style={{ flex: 1 }}>{children}</div>
       <Popconfirm 
        placement="right"
        title={<FormattedMessage id="comp_listsort_btn_pop_title"/>}
        onConfirm={onDelete}
        okText={<FormattedMessage id="comp_listsort_btn_pop_btn_ok"/>}
        cancelText={<FormattedMessage id="comp_listsort_btn_pop_btn_cancel"/>}
      >
        <Button danger type="primary" shape="circle"><CloseOutlined /></Button>
      </Popconfirm>
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
  // 拖拽排序
  const handleDragEnd = (event) => {
    if (onChange) {
      // 触发外部传入的更新事件，返回重新排序后的数组
      const nextItems = move(items, event);
      onChange(nextItems);
    }
  };
  // 删除
  // 删除——结果提示
  const notifyTitles = {
    "success":  "comp_listsort_del_res_success_title",
    "error":    "comp_listsort_del_res_error_title"
  };
  const notifyDescriptions = {
    "success":  "comp_listsort_del_res_success_content",
    "error":    "comp_listsort_del_res_error_content"
  }
  const [notifyApi, notifyContextHolder] = notification.useNotification();  // 动态继承上层的样式/国际化主题
  const openNotification = (type, icon, label) => {
    notifyApi[type]({
      title: <FormattedMessage id={notifyTitles[type]} />,
      description: <div className='CompListSort-Notity'>{icon? <span className='Icon'>{icon}</span>:null}<FormattedMessage id={notifyDescriptions[type]} values={{name: label}}/></div>,
      //duration: 0, // 不关闭弹窗（调试开启）
    });
  };
  
  // 确认删除：直接过滤并交给 onChange 派发
  const handleDelete = async (id, icon, label, children) => {
    if (onChange) {
      let condHasChildren = false;
      if(typeof children !== 'undefined' && children !== null){
        if (Array.isArray(children) || typeof children.length === 'number') {
          condHasChildren = children.length > 0;
        }
      }

      if(condHasChildren){
        openNotification("error", icon, label); 
      }else{
        const newItems = items.filter((item) => item.id !== id);
        await onChange(newItems);
        // openNotification("success", icon, label);
      }
    }
  };



  return (
      <DragDropProvider onDragEnd={handleDragEnd}>
        <ul className="CompListSort">
          {notifyContextHolder}
          {items.map((item, index) => (
            <SortableItem key={item.id} id={item.id} index={index} icon={item.icon} label={item.label} onDelete={()=>handleDelete(item.id, item.icon, item.label, item.children)}/>
          ))}
        </ul>
      </DragDropProvider>
  );
}