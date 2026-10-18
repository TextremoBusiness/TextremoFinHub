/* react */
import React from 'react';
import { FormattedMessage } from 'react-intl' // react-intl multiple languages
/* antd */
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Flex } from 'antd';
import { Card, Space } from 'antd'
import { Button } from 'antd';                                      // 按钮
import { Modal } from 'antd';                                       // 对话框
/* antd - icons */
import { AppstoreFilled, CopyrightOutlined, TagFilled } from '@ant-design/icons';
import { SyncOutlined } from '@ant-design/icons';
/* dnd-kit */
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {useSortable} from '@dnd-kit/react/sortable';
/* icon */
import IconFlag from '../../components/iconflag/iconflag';
/* less */
import "../page.less"



// sidebar menus
const menuItems = [
    {key: 0, icon: <AppstoreFilled />, label: <FormattedMessage id="page_mana_menu_0"/>},
    {key: 1, icon: <CopyrightOutlined />, label: <FormattedMessage id="page_mana_menu_1"/>},
    {key: 2, icon: <TagFilled />, label: <FormattedMessage id="page_mana_menu_2"/>}
];

//  <FormattedMessage id="page_mana_menu_1"/>

export class Management extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menu_key: "0",
            breadcrumb_title: menuItems[0].label,
            btn_save_loading: false,
            win_add_open: false
        };
    }

    /**
     * menu onClick（箭头函数，没有自己的 this，它会自动捕获定义时所在上下文（即当前组件实例）的 this）
     */
    menuOnClick = ({ _, key, keyPath, domEvent }) =>{
        this.setState({
            menu_key: [key],
            breadcrumb_title: menuItems[key].label
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
    
    render(){
        return(
            <>
                <Sider className="SideBar" theme="light">
                    <Menu theme="light" mode="inline" selectedKeys={this.state.menu_key} onClick={this.menuOnClick} items={menuItems}/>
                </Sider>
                <Layout >
                    <Content className='PageContainer'>
                        <Breadcrumb className='BreadCrumb' items={[{ title: this.state.breadcrumb_title}]} />

                        <div className="Content">
                            <div className='Instruction'>
                                <h3>The list of {this.state.breadcrumb_title}</h3>
                                <Flex className="Right" gap="small" wrap>
                                    <Button type="default" onClick={this.AddOnClick}>
                                        <FormattedMessage id="page_mana_btn_add"/>
                                    </Button>
                                    <Button type="primary" loading={this.state.btn_save_loading} onClick={this.saveOnClick}>
                                        <FormattedMessage id="page_mana_btn_save"/>
                                    </Button>
                                </Flex>
                            </div>
                            
      

                            
                            <Space vertical size={16}>
                                <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                                </Card>
                                <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                                </Card>
                                <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                                </Card>
                                <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                                </Card>
                                <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                                </Card>
                                <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                                </Card>
                                <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                                </Card>
                                <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                                </Card>
                            </Space>
                        </div>
                    </Content>
                </Layout>

                {/* 添加对话框 */}
                <Modal
                    title="Basic Modal"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={this.state.win_add_open}
                    onOk={this.AddOk}
                    onCancel={this.AddCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </>
        );
    }
}