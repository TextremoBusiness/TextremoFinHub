import React from 'react';
// react-intl 支持多语言
import {FormattedMessage} from 'react-intl'
// weui
import {  Article } from 'react-weui';

export class DemosMobile extends React.Component{
    render(){
        return(
            <Article>
                If you want to check the demos, please use your PC to view.
            </Article>
        );
    }
}