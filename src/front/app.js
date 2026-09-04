import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';                      // react device detection
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';          // react 
import { IntlProvider, FormattedMessage } from 'react-intl'                         // react-intl to support multiple languages
import { langs_codes, langs_pkgs } from './locale';                                 // languages codes & pkgs
// antd
// antd-layout
import { Layout} from 'antd';
// antd-icon
import { HomeFilled, DropboxOutlined, DockerOutlined } from '@ant-design/icons';

// components
import { UniHeader } from "./components/uniheader/uniheader"
import { Fortune } from "./pages/fortune/fortune"


// css
import "./theme.less";

export class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lang_id: 0,
            lang_pkg: langs_pkgs[0],
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
            // english
            if (langs_codes[this.state.selected_lang_id] != 'en'){
                this.setState({
                    lang_id: langs_codes.indexOf('en'),
                    lang_pkg: langs_pkgs[langs_codes.indexOf('en')],
                });
            }
        }else if (userLang.search('zh') != -1){
            // chinese
            if (langs_codes[this.state.selected_lang_id] != 'zh'){
                this.setState({
                    lang_id: langs_codes.indexOf('zh'),
                    lang_pkg: langs_pkgs[langs_codes.indexOf('zh')],
                });
            }
        }else{
            // other language (not supported, set to English)
            if (langs_codes[this.state.selected_lang_id] != 'en'){
                this.setState({
                    lang_id: langs_codes.indexOf('en'),
                    lang_pkg: langs_pkgs[langs_codes.indexOf('en')],
                });
            }
        }

        // this.setState({
        //     lang_id: 1,
        //     lang_pkg:  langs_pkgs[1]
        // });
    }


    /**
     * 渲染页面 
     */
    render(){
        return(
            <IntlProvider locale={langs_codes[this.state.lang_id]} messages={langs_pkgs[this.state.lang_id]}>
                <BrowserView className='view-port-body'>
                    <Router>
                        <Layout className='view-port-body'>
                            <UniHeader/>
                            {/* This has to be another layout, otherwise the sidebars in Fortune won't take the entire height */}
                            <Layout className='routers-container'>
                                <Routes>
                                    <Route exact path="/"       element={ <Fortune/> } />
                                </Routes>
                            </Layout>
                        </Layout>
                    </Router>
                </BrowserView>
                <MobileView>
                    The mobile version is not supported.
                </MobileView>
            </IntlProvider>
        );
    }
}