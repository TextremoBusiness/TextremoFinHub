import React from 'react';
import {BrowserView, MobileView} from 'react-device-detect';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// react-intl 支持多语言
import {IntlProvider, FormattedMessage} from 'react-intl'
import { all_langs_codes, all_langs_pkg} from './locale';  // 导入语言包
// antd
// antd-layout
import { Layout} from 'antd';
// antd-icon
import { HomeFilled, DropboxOutlined, DockerOutlined } from '@ant-design/icons';
// weui
import { Tab, TabBarItem } from 'react-weui';
//import styles
import 'weui';
import 'react-weui/build/packages/react-weui.css';


// components
import { UniHeader } from "./components/uniheader/uniheader"
// pages
import { Main } from './pages/main/main';
import { MainMobile } from './pages/main/main-mobile';
import { DemosMobile, Demo01, Demo02 } from './pages/demos';


export class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected_lang_id: 0,
            selected_lang_obj: all_langs_pkg[0],
            isLogin: false
        };
    };

    /**
     * 在组件挂载后（插入 DOM 树中）立即调用
     */
    componentDidMount(){
        // 获取浏览器语言，并决定具体的id
        var userLang = navigator.language || navigator.userLanguage; 
        userLang = userLang.toLowerCase();
        if (userLang.search('en') != -1){
            // 英文
            if (all_langs_codes[this.state.selected_lang_id] != 'en'){
                this.setState({
                    selected_lang_id: all_langs_codes.indexOf('en'),
                    selected_lang_obj: all_langs_pkg[all_langs_codes.indexOf('en')],
                });
            }
        }else if (userLang.search('zh') != -1){
            // 中文
            if (all_langs_codes[this.state.selected_lang_id] != 'zh'){
                this.setState({
                    selected_lang_id: all_langs_codes.indexOf('zh'),
                    selected_lang_obj: all_langs_pkg[all_langs_codes.indexOf('zh')],
                });
            }
        }else{
            // 其他语言，设为英语
            if (all_langs_codes[this.state.selected_lang_id] != 'en'){
                this.setState({
                    selected_lang_id: all_langs_codes.indexOf('en'),
                    selected_lang_obj: all_langs_pkg[all_langs_codes.indexOf('en')],
                });
            }
        }
    };

    /**
     * 渲染页面 
     */
    render(){
        return(
            <IntlProvider locale={all_langs_codes[this.state.selected_lang_id]} messages={all_langs_pkg[this.state.selected_lang_id]}>
                <BrowserView className='view-port-body'>
                    <Router>
                        <Layout className='view-port-body'>
                            <UniHeader/>
                            <div className='routers-container'>
                                <Routes>
                                    <Route exact path="/"       element={ <Main/> } />
                                    <Route exact path="/demo01"  element={ <Demo01/> } />
                                    <Route exact path="/demo02"  element={ <Demo02/> } />
                                </Routes>
                            </div>
                        </Layout>
                    </Router>
                </BrowserView>
                <MobileView>
                    <Tab type="tabbar" className="Mob-Tab">
                        <TabBarItem  label={<FormattedMessage id="header_menu_1"/>} icon={<HomeFilled className='TabbarItemImg'/>}>
                            <MainMobile/>
                        </TabBarItem>
                        <TabBarItem  label={<FormattedMessage id="header_menu_2"/>} icon={<DropboxOutlined className='TabbarItemImg'/>}>
                            <DemosMobile/>
                        </TabBarItem>
                    </Tab>
                </MobileView>
            </IntlProvider>
        );
    }
}