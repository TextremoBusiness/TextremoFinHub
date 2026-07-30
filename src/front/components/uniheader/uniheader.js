import React, { Children } from 'react';
// react-link
import { Link } from 'react-router-dom';
// react-intl 支持多语言
import {FormattedMessage} from 'react-intl'
// antd
// antd-layout
import { Layout, Menu} from 'antd';
const { Header} = Layout;
// antd-icon
import { DingdingOutlined, HomeFilled, DropboxOutlined, DockerOutlined, PieChartOutlined } from '@ant-design/icons';
// utils
import { isObjEmpty } from '../../utils/commonfns';

// css
import "./uniheader.less";

const menuitems = [
    {key: "1", label: <Link to="/"><FormattedMessage id="header_menu_1"/></Link>, icon: <HomeFilled />},
    {key: "2", label: <FormattedMessage id="header_menu_2"/>, icon: <DropboxOutlined />, theme: "light", children:[
        {key: "21", label: <Link to="/demo01"><FormattedMessage id="demos_menu_01"/></Link>, icon: <DockerOutlined />},
        {key: "22", label: <Link to="/demo02"><FormattedMessage id="demos_menu_02"/></Link>, icon: <PieChartOutlined />}
    ]},
    //{key: "21", label: "sfsfs", icon: <DockerOutlined />},
];

export class UniHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            headerMenuSelectedIds: ["1"],
        };
    };

    render(){
        return(
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="uni-header-logo">
                    <DingdingOutlined className='Image'/>
                    <span className='Txt'><FormattedMessage id="header_name"/></span>
                </div>
                <Menu className="uni-header-menu" theme="dark" mode="horizontal" selectedKeys={this.state.headerMenuSelectedIds} onClick={this.menuOnClick} items={menuitems}/>
            </Header>
        )
    };

    menuOnClick = ({ _, key, keyPath, domEvent }) =>{
        if (key <= 9){
            this.setState({
                headerMenuSelectedIds: [key]
            });
        }else if (key >= 20 && key <= 29){
            this.setState({
                headerMenuSelectedIds: ["2", key]
            });
        }
    }
}