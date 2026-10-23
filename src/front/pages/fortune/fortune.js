/* react */
import React from 'react';
import { FormattedMessage } from 'react-intl' // react-intl multiple languages
/* antd */
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import { Card, Space } from 'antd'
/* antd - icons */
import { DesktopOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { UnorderedListOutlined } from '@ant-design/icons';
/* components */
import IconFlag from '../../components/iconflag/iconflag';
/* less */
import "../page.less"

export class Fortune extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuItems: [
                {
                    type: "group",
                    label: <span className="GroupName"><FormattedMessage id="page_fort_menu_overview"/></span>,
                    children: [
                        { key: "fort_menu_overview", icon: <UnorderedListOutlined />, label: <FormattedMessage id="page_fort_menu_overview"/> },
                        { key: "1", icon: <IconFlag code="cn"/>, label: "Option 1" },
                        { key: "2", icon: <DesktopOutlined />, label: "Option 2"},
                        { key: "sub1", icon: <UserOutlined />, label: "User", children: [
                            { key: "13", label: 'Tom'},
                            { key: "14", label: 'Bill'},
                            { key: "15", label: 'Alex'},
                        ]},
                    ]
                },
                
                { key: "sub2", icon: <UserOutlined />, label: "User", children: [
                    { key: "23", label: 'Tom'},
                    { key: "24", label: 'Bill'},
                    { key: "25", label: 'Alex'},
                ]},
                { key: "sub3", icon: <UserOutlined />, label: "User", children: [
                    { key: "33", label: 'Tom'},
                    { key: "34", label: 'Bill'},
                    { key: "35", label: 'Alex'},
                ]},
                { key: "sub4", icon: <TeamOutlined />, label: "Team", children: [
                    { key: "41", label: 'Team 1'},
                    { key: "42", label: 'Team 2'},
                ]},
                { key: "3", icon: <FileOutlined />, label: "Files"},
            ]
        };
    };


    componentDidMount(){
        

    }


    render(){
        return(
            <>
                <Sider className="SideBar" collapsible theme="light">
                    <Menu theme="light" defaultSelectedKeys={['fort_menu_overview']} mode="inline" items={this.state.menuItems} defaultOpenKeys={['sub1']}/>
                </Sider>
                <Layout >
                    <Content className='PageContainer'>
                        <Breadcrumb className='BreadCrumb' items={[{ title: 'User' }, { title: 'Bill' }]} />
                        <div>
                            <span 
                                className="fi fi-us" 
                                style={{ width: '14px', height: '14px' }} 
                                aria-hidden="true"
                            ></span>
                            Bill is a cat.
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
                        <Footer style={{ textAlign: 'center' }}>Ant Design © Created by Ant UED</Footer>
                    </Content>
                    
                </Layout>
            </>
        );
    }
}