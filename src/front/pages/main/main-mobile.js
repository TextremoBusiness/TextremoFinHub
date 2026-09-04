import React from 'react';
// react-intl 支持多语言
import {FormattedMessage} from 'react-intl'
// antd-icon
import { MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
// weui
import {  Article } from 'react-weui';

// components
import { UniLinkedIn, UniFacebook } from "../../components/uni-icons"
// css
import "./main-mobile.less"

export class MainMobile extends React.Component{
    render(){
        return(
            <Article>
                <section className='Info'>
                    <div className='Img'>
                        <img className='Ava' src="img/avatar.jpg"/>
                    </div>
                    <div className="Txt">
                        <h1><FormattedMessage id='main_intro_name'/></h1>
                        <p className="Titles"><FormattedMessage id='main_intro_title'/></p>
                    </div>
                </section>
                <section className='LocLinks'>
                    <p><EnvironmentOutlined className='Details-Img'/><span className='Txt'><FormattedMessage id='main_loc'/></span></p>
                    <p><MailOutlined className='Details-Img'/><a href="mailto:wfwfpwefe2323@gmail.com" className='Txt'>wfwfpwefe2323@gmail.com</a></p>
                    <p><a href="https://www.linkedin.com/in/xwq" target="_blank"><UniLinkedIn className="Details-Img"/><span className='Txt'><FormattedMessage id='main_right_txt_01'/></span></a></p>
                    <p><a href="https://www.facebook.com/profile.php?id=61560685465828" target="_blank"><UniFacebook className="Details-Img"/><span className='Txt'><FormattedMessage id='main_right_txt_02'/></span></a></p>
                </section>
                
                <section>
                    <p><FormattedMessage id='main_intro'/></p>
                </section>
                <section className='Details'>
                    <div className='Title'>
                        <FormattedMessage id='main_contri'/>
                    </div>
                    <ul className='Content'>
                        <li><FormattedMessage id='main_contri_phy'/>
                            <ul>
                                <li><a href="https://github.com/whatshow/Phy_Mod_OTFS" target="_blank"><FormattedMessage id='main_contri_phy_01'/></a></li>
                                <li><a href="https://github.com/whatshow/Phy_Detect_BPIC" target="_blank"><FormattedMessage id='main_contri_phy_02'/></a></li>
                                <li><a href="https://github.com/whatshow/Phy_Detect_EP" target="_blank"><FormattedMessage id='main_contri_phy_03'/></a></li>
                            </ul>
                        </li>
                        <li><FormattedMessage id='main_contri_civ'/>
                            <ul>
                                <li><a href="https://github.com/whatshow/CIV6_MOD_Influncer" target="_blank"><FormattedMessage id='main_contri_civ_01'/></a></li>
                            </ul>
                        </li>
                        <li><FormattedMessage id='main_contri_others'/>
                            <ul>
                                <li><a href="https://github.com/whatshow/Toolbox" target="_blank"><FormattedMessage id='main_contri_others_01'/></a></li>
                            </ul>
                        </li>
                    </ul>
                    <div className='Title'>
                        <FormattedMessage id='main_pub'/>
                    </div>
                    <ul className='Content'>
                        <li>Chang, H., Kosasih, A., Hardjawana, W., Qu, X., & Vucetic, B. (2023, May). <a target="_blank" href="https://ieeexplore.ieee.org/document/10225901">Untrained Neural Network based Bayesian Detector for OTFS Modulation Systems</a>. In <i>IEEE INFOCOM 2023-IEEE Conference on Computer Communications Workshops (INFOCOM WKSHPS)</i> (pp. 1-6). IEEE.</li>
                        <li>Kosasih, A., Qu, X., Hardjawana, W., Yue, C., & Vucetic, B. (2022). <a target="_blank" href="https://ieeexplore.ieee.org/abstract/document/9900413">Bayesian neural network detector for an orthogonal time frequency space modulation</a>. <i>IEEE Wireless Communications Letters, 11</i>(12), 2570-2574.</li>
                        <li>Onasis, V., Kosasih, A., Gu, Y., Hardjawana, W., Qu, X., Vucetic, B., & Chikkam, K. (2022, April). <a target="_blank" href="https://ieeexplore.ieee.org/abstract/document/9771795">Improving the minstrel rate adaptation algorithm using shallow neural networks in ieee 802.11 ah</a>. In <i>2022 IEEE Wireless Communications and Networking Conference (WCNC)</i> (pp. 1827-1832). IEEE.</li>
                        <li>Qu, X., Kosasih, A., Hardjawana, W., Onasis, V., & Vucetic, B. (2021, September). <a target="_blank" href="https://ieeexplore.ieee.org/document/9569353">Bayesian-based symbol detector for orthogonal time frequency space modulation systems</a>. In <i>2021 IEEE 32nd Annual International Symposium on Personal, Indoor and Mobile Radio Communications (PIMRC)</i> (pp. 1154-1159). IEEE.</li>
                    </ul>
                </section>
            </Article>
        );
    }
}