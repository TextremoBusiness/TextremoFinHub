import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import { Card, Space } from 'antd'

import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

import IconFlag from '../../components/iconflag/iconflag';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Option 1', '1', <IconFlag code="cn" size={20} />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '13'),
    getItem('Bill', '14'),
    getItem('Alex', '15'),
  ]),
  getItem('User', 'sub5', <UserOutlined />, [
    getItem('Tom', '53'),
    getItem('Bill', '54'),
    getItem('Alex', '55'),
  ]),
  getItem('User', 'sub3', <UserOutlined />, [
    getItem('Tom', '33'),
    getItem('Bill', '34'),
    getItem('Alex', '35'),
  ]),
  getItem('User', 'sub4', <UserOutlined />, [
    getItem('Tom', '43'),
    getItem('Bill', '44'),
    getItem('Alex', '45'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];


export class Fortune extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuItems: []
        };
    };


    componentDidMount(){
        

    }


    render(){
        return(
            <>
                <Sider collapsible theme="light" style={{overflow: "auto"}}>
                    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} defaultOpenKeys={['sub1']}/>
                </Sider>
                <Layout >
                    <Content style={{ padding: '0 16px',height: 'auto', overflow: "auto"}}>
                        <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
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