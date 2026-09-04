import React from 'react';
// react-intl 支持多语言
import {FormattedMessage} from 'react-intl'
// antd-layout
import { Layout} from 'antd';
const { Footer } = Layout;
// antd-icon
import { CopyrightOutlined } from '@ant-design/icons';
// moment
import moment  from 'moment';

// css
import "./unifooter.less";

export class UniFooter extends React.Component{
    render(){
        return(
            <Footer className='uni-footer'>
                <p className='declare'>Copyright <CopyrightOutlined /> 2003-{moment().format('YYYY')}</p>
            </Footer>
        );
    }
}