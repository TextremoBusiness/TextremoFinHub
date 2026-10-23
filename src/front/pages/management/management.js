/* react */
import React, { useRef, useState } from 'react';
import { FormattedMessage, IntlContext } from 'react-intl' // react-intl multiple languages
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
/* api */
import dataManager from '@/api/dataManager';
/* less */
import "../page.less"
import "./management.less"


// sidebar menus
const menuItems = [
    {key: 0, icon: <AppstoreFilled />, label: <FormattedMessage id="page_mana_menu_0"/>},
    {key: 1, icon: <CopyrightOutlined />, label: <FormattedMessage id="page_mana_menu_1"/>},
    {key: 2, icon: <TagFilled />, label: <FormattedMessage id="page_mana_menu_2"/>}
];
// window
const WinAddTitles = [
    <FormattedMessage id="page_mana_model_title_0"/>,
    <FormattedMessage id="page_mana_model_title_1"/>,
    <FormattedMessage id="page_mana_model_title_2"/>
];
const WinAddSelectPlaceHolder = [
    <FormattedMessage id="page_mana_model_select_placeholder_0"/>,
    <FormattedMessage id="page_mana_model_select_placeholder_1"/>,
    <FormattedMessage id="page_mana_model_select_placeholder_2"/>
];

const Contries = [
    { value: 'cn',  search: "cn", icon: <IconFlag code="cn" size="inherit" />, label:  <div className='PageMana-Model-Select-CountryRegion-Item'><IconFlag code="cn" size={16} /><FormattedMessage id="list_cr_cn"/></div> },
    { value: 'hk',  search: "hk", icon: <IconFlag code="hk" size="inherit" />, label:  <div className='PageMana-Model-Select-CountryRegion-Item'><IconFlag code="hk" size={16} /><FormattedMessage id="list_cr_hk"/></div> },
    { value: 'tw',  search: "tw", icon: <IconFlag code="tw" size="inherit" />, label:  <div className='PageMana-Model-Select-CountryRegion-Item'><IconFlag code="tw" size={16} /><FormattedMessage id="list_cr_tw"/></div> },
    { value: 'mo',  search: "mo", icon: <IconFlag code="mo" size="inherit" />, label:  <div className='PageMana-Model-Select-CountryRegion-Item'><IconFlag code="mo" size={16} /><FormattedMessage id="list_cr_mo"/></div> },
    { value: 'my',  search: "my", icon: <IconFlag code="my" size="inherit" />, label:  <div className='PageMana-Model-Select-CountryRegion-Item'><IconFlag code="my" size={16} /><FormattedMessage id="list_cr_my"/></div> },
    { value: 'sg',  search: "sg", icon: <IconFlag code="sg" size="inherit" />, label:  <div className='PageMana-Model-Select-CountryRegion-Item'><IconFlag code="sg" size={16} /><FormattedMessage id="list_cr_sg"/></div> },
    { value: 'us',  search: "us", icon: <IconFlag code="us" size="inherit" />, label:  <div className='PageMana-Model-Select-CountryRegion-Item'><IconFlag code="us" size={16} /><FormattedMessage id="list_cr_us"/></div> },
    { value: 'ca',  search: "ca", icon: <IconFlag code="ca" size="inherit" />, label:  <div className='PageMana-Model-Select-CountryRegion-Item'><IconFlag code="ca" size={16} /><FormattedMessage id="list_cr_ca"/></div> },
    { value: 'au',  search: "au", icon: <IconFlag code="au" size="inherit" />, label:  <div className='PageMana-Model-Select-CountryRegion-Item'><IconFlag code="au" size={16} /><FormattedMessage id="list_cr_au"/></div> },
    { value: 'nz',  search: "nz", icon: <IconFlag code="nz" size="inherit" />, label:  <div className='PageMana-Model-Select-CountryRegion-Item'><IconFlag code="nz" size={16} /><FormattedMessage id="list_cr_nz"/></div> },
    { value: 'gb',  search: "gb", icon: <IconFlag code="gb" size="inherit" />, label:  <div className='PageMana-Model-Select-CountryRegion-Item'><IconFlag code="gb" size={16} /><FormattedMessage id="list_cr_gb"/></div> },
    { value: 'ie',  search: "ie", icon: <IconFlag code="ie" size="inherit" />, label:  <div className='PageMana-Model-Select-CountryRegion-Item'><IconFlag code="ie" size={16} /><FormattedMessage id="list_cr_ie"/></div> },
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
            win_add_select_placeholder: <FormattedMessage id="page_mana_model_select_placeholder_0"/>,
            win_add_item: null,
            countries: [],
            // list - the current shown list
            listSortItems: [
                { id: "cn", icon: <IconFlag code="cn" size="inherit"/>, label: 'Item 1', children: []},
                { id: "cn2", icon: <IconFlag code="cn" size="inherit"/>, label: 'Item 2', children: [{id: 1}] },
                { id: "cn3", icon: <IconFlag code="cn" size="inherit"/>, label: 'Item 3' },
                { id: "cn4", icon: <IconFlag code="cn" size="inherit"/>, label: 'Item 4' },
                { id: "cn5", icon: <IconFlag code="cn" size="inherit"/>, label: 'Item 5' },
                { id: "cn6", icon: <IconFlag code="cn" size="inherit"/>, label: 'Item 6' }
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
            win_add_title: WinAddTitles[key],
            win_add_select_placeholder: WinAddSelectPlaceHolder[key],
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
    AddSelectOnChange = (value, option) => {
        console.log(value);
    }
    
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
                            <ListSort items={this.state.listSortItems} onChange={this.onListChange}/>
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
                        className="PageMana-Model-Select-CountryRegion"
                        showSearch={{
                            filterOption: (input, option) => (option?.search ?? '').toLowerCase().includes(input.toLowerCase()),
                        }}
                        notFoundContent= {<FormattedMessage id="page_mana_model_select_nofoundcontent"/>}
                        placeholder={this.state.win_add_select_placeholder}
                        options={Contries}
                        onChange={this.AddSelectOnChange}
                    />
                </Modal>
            </>
        );
    }
}