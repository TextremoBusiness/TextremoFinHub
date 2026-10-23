/* react */
import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl' // react-intl multiple languages
/* antd */
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Flex } from 'antd';
import { Button } from 'antd';                                      // 按钮
import { Modal } from 'antd';                                       // 对话框
import { Select } from 'antd';                                      // 选择框
/* antd - icons */
import { AppstoreFilled, CopyrightOutlined, TagFilled } from '@ant-design/icons';
/* dnd-kit */
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { move } from '@dnd-kit/helpers';
/* components */
import IconFlag from '../../components/iconflag/iconflag';
import ListSort from '../../components/listsort/listsort';
/* less */
import "../page.less"

// 独立的可排序单项组件（用于承载 Hook）
function SortableItem({ id, index, children }) {
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
            <div style={{ flex: 1 }}>{children}</div>
            <button ref={handleRef} className="handle" type="button" />
        </li>
    );
}


// sidebar menus
const menuItems = [
    {key: 0, icon: <AppstoreFilled />, label: <FormattedMessage id="page_mana_menu_0"/>},
    {key: 1, icon: <CopyrightOutlined />, label: <FormattedMessage id="page_mana_menu_1"/>},
    {key: 2, icon: <TagFilled />, label: <FormattedMessage id="page_mana_menu_2"/>}
];
// add window titles
const WinAddTitles = [
    <FormattedMessage id="page_mana_model_title_0"/>,
    <FormattedMessage id="page_mana_model_title_1"/>,
    <FormattedMessage id="page_mana_model_title_2"/>
];

const Contries = [
    { value: '1', icon: <IconFlag code="cn"/>, label: 'China' },
    { value: '2', label: 'USA' },
    { value: '3', label: 'UK' },
];

//  <FormattedMessage id="page_mana_menu_1"/>

export class Management extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menu_key: "0",
            content_title: menuItems[0].label,
            btn_save_loading: false,
            win_add_open: false,
            win_add_title: <FormattedMessage id="page_mana_model_title_0"/>,
            countries: [],
            // list - the current shown list
            listSortItems: [
                { id: 1, icon: <IconFlag code="cn" size="inherit"/>, label: 'Item 1', children: []},
                { id: 2, icon: <IconFlag code="cn" size="inherit"/>, label: 'Item 2', children: [{id: 1}] },
                { id: 3, icon: <IconFlag code="cn" size="inherit"/>, label: 'Item 3' },
                { id: 4, icon: <IconFlag code="cn" size="inherit"/>, label: 'Item 4' },
                { id: 5, icon: <IconFlag code="cn" size="inherit"/>, label: 'Item 5' },
                { id: 6, icon: <IconFlag code="cn" size="inherit"/>, label: 'Item 6' }
            ]
        };
    }

    /**
     * menu onClick（箭头函数，没有自己的 this，它会自动捕获定义时所在上下文（即当前组件实例）的 this）
     */
    menuOnClick = ({ _, key, keyPath, domEvent }) =>{
        this.setState({
            menu_key: [key],
            content_title: menuItems[key].label,
            win_add_title: WinAddTitles[key]
        });
    }

    /**
     * submit
     */
    saveOnClick = () => {
        console.log('Start loading:');
    
        // 开启 loading
        this.setState({
            btn_save_loading: true
        });
        setTimeout(() => {
            this.setState({
                 btn_save_loading: false
            });
        }, 3000);

        // this.setState((prevState) => {
        //     // 浅拷贝（复制）原有的数组，生成一个新的数组。（直接拷贝获得的是原先地址，提交后内存地址不变，react会不跟新）
        //     const newLoadings = [...prevState.loadings];    
        //     newLoadings[index] = true;
        //     return { loadings: newLoadings };
        // });
        // setTimeout(() => {
        //     this.setState((prevState) => {
        //         const newLoadings = [...prevState.loadings];
        //         newLoadings[index] = false;
        //         return { loadings: newLoadings };
        //     });
        // }, 3000);
    };


    /* 添加 */
    AddOnClick = () =>{
        this.setState({
            win_add_open: true
        });
    };
    AddOk = () =>{
        this.setState({
            win_add_open: false
        });
    };
    AddCancel = () =>{
        this.setState({
            win_add_open: false
        });
    };

    
    /**
     * 改变list顺序
     */
    onListChange = (newListSortItems) => {
        return new Promise((resolve)=>{
            this.setState({ listSortItems: newListSortItems }, ()=>{
                resolve();    // 显式执行resolve
            });
        });
    };
    // onListChange = async (newItems) => {
    //     // 1. 等待后端接口保存完成
    //     // await api.saveList(newItems);

    //     // 2. 更新本地状态
    //     await new Promise((resolve) => {
    //         this.setState({ dragItems: newItems }, resolve);    // react会执行resolve函数
    //     });
        
    //     console.log('远程接口和本地 State 均已完成');
    // };

    // 拖拽结束更新排序
    // handleDragEnd = (event) => {
    //     this.setState((prevState) => ({
    //         listSortItems: move(prevState.listSortItems, event)
    //     }),
    //     () => {
    //         // 这个回调在 state 真正写入并完成更新后触发
    //         console.log('排序后的真实数据:', this.state.listSortItems);
    //         // 提取出纯 ID 数组对比更直观
    //         console.log('当前 ID 排序:', this.state.listSortItems.map(item => item.id));
    //     }
    //     );
    // };

    render(){
        return(
            <>
                <Sider className="SideBar" theme="light">
                    <Menu theme="light" mode="inline" selectedKeys={this.state.menu_key} onClick={this.menuOnClick} items={menuItems}/>
                </Sider>
                <Layout >
                    <Content className='PageContainer'>
                        <Breadcrumb className='BreadCrumb' items={[{ title: this.state.content_title}]} />

                        <div className="Content">
                            <div className='Instruction'>
                                <h3>The list of {this.state.content_title}</h3>
                                <Flex className="Right" gap="small" wrap>
                                    <Button type="default" onClick={this.AddOnClick}>
                                        <FormattedMessage id="page_mana_btn_add"/>
                                    </Button>
                                    <Button type="primary" loading={this.state.btn_save_loading} onClick={this.saveOnClick}>
                                        <FormattedMessage id="page_mana_btn_save"/>
                                    </Button>
                                </Flex>
                            </div>
                            <ListSort
                                items={this.state.listSortItems}
                                onChange={this.onListChange}
                            />
                            {/* <DragDropProvider onDragEnd={this.handleDragEnd}>
                                <ul className="list" style={{ padding: 0, margin: '16px 0' }}>
                                    {this.state.listSortItems.map((item, index) => (
                                        <SortableItem key={item.id} id={item.id} index={index}>
                                            <span>{item.title}</span>
                                        </SortableItem>
                                    ))}
                                </ul>
                            </DragDropProvider> */}
                        </div>
                    </Content>
                </Layout>

                {/* 添加对话框 */}
                <Modal
                    title={this.state.win_add_title}
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={this.state.win_add_open}
                    onOk={this.AddOk}
                    onCancel={this.AddCancel}
                    okText={<FormattedMessage id="page_mana_model_add_btn_ok"/>}
                    cancelText={<FormattedMessage id="page_mana_model_add_btn_cancel"/>}
                >
                    <Select
                        showSearch={{
                        filterOption: (input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                        }}
                        notFoundContent="Nono"
                        placeholder="Select a person"
                        options={Contries}
                    />
                </Modal>
            </>
        );
    }
}