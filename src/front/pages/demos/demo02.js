import React, { useState, useEffect } from 'react';
// react-intl 支持多语言
import {FormattedMessage} from 'react-intl'
// antd-layout
import { Layout} from 'antd';
const { Content } = Layout;
// antd-card
import { Card, Space } from 'antd';
// echart
import ReactECharts from 'echarts-for-react';

// components
import { UniFooter } from "../../components/unifooter/unifooter";
// 引入样式
import "./demo02.less";

const PiechartData = {
    title : {
      text: 'Click Source',
      subtext: 'Unknown',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['Sales','Email','Ads','Youtube','Google']
    },
    series : [
      {
      name: 'Visit Source',
      type: 'pie',
      radius : '55%',
      center: ['50%', '60%'],
      data:[
        {value:335, name:'Sales'},
        {value:310, name:'Email'},
        {value:234, name:'Ads'},
        {value:135, name:'Youtube'},
        {value:1548, name:'Google'}
      ],
      itemStyle: {
        emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
      }
    ]
};

const RaidarData = {
    tooltip: {},
    legend: {
      data: ['Allocated Budget', 'Actual Spending']
    },
    radar: {
      // shape: 'circle',
      indicator: [
          { name: 'Sales', max: 6500},
          { name: 'Administration', max: 16000},
          { name: 'Information Techology', max: 30000},
          { name: 'Customer Support', max: 38000},
          { name: 'Development', max: 52000},
          { name: 'Marketing', max: 25000}
      ]
    },
    series: [{
      name: 'Budget vs spending',
      type: 'radar',
      // areaStyle: {normal: {}},
      data : [
        {
          value : [4300, 10000, 28000, 35000, 50000, 19000],
          name : 'Allocated Budget'
        },
          {
          value : [5000, 14000, 28000, 31000, 42000, 21000],
          name : 'Actual Spending'
        }
      ]
    }]
};

const lineChartData = {
    toolbox: {
        feature: {
            saveAsImage: {},
            dataZoom: {},
            restore: {}
        }
    },
    tooltip: {},
    legend: {
        data:['Sales']
    },
    xAxis: {
        data: ['T-shirt', 'Jeans', 'Cardigan', 'Coats', 'Heels', 'Socks']
    },
    yAxis: {},
    series: [{
        name: 'Sales',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20]
    }]
};

const barchartData = {
    tooltip: {},
    legend: {
      data:['Sales']
    },
    xAxis: {
        data: ['T-shirt', 'Jeans', 'Cardigan', 'Coats', 'Heels', 'Socks']
    },
    yAxis: {},
    series: [{
      name: 'Sales',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  };

export class Demo02 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingOption: {
            text: 'loading...',
            color: '#4413c2',
            textColor: '#270240',
            maskColor: 'rgba(194, 88, 86, 0.3)',
            zlevel: 0
            },
            timerRaidar: null,
        };
    };

    componentWillUnmount(){
        clearTimeout(this.state.timerRaidar);
    }

    

    render(){
        return(
            <>
                <Content className='page-demo02-content'>

                    <Space direction="vertical" size={16} className='Sector'>
                        <Card title="Pie Chat">
                            <ReactECharts
                                option={PiechartData}
                                style={{ height: 400 }}
                                //onChartReady={onChartReady}
                                onEvents={{
                                //'click': onChartClick,
                                //'legendselectchanged': onChartLegendselectchanged
                                }}
                            />
                        </Card>
                    </Space>
                    <Space direction="vertical" size={16} className='Sector'>
                        <Card title="Web Analysis">
                            <ReactECharts
                                option={RaidarData}
                                style={{ height: 400 }}
                                onChartReady={this.onChartReady}
                                loadingOption={this.state.loadingOption}
                                showLoading={true}
                            />
                        </Card>
                    </Space>
                    <Space direction="vertical" size={16} className='Sector-Row'>
                        <Card title="Line Chart">
                            <ReactECharts
                                option={lineChartData}
                                style={{ height: 400 }}
                                opts={{ locale: 'FR' }}
                            />;
                        </Card>
                    </Space>
                    <Space direction="vertical" size={16} className='Sector-Row'>
                        <Card title="Bar Chart">
                        <ReactECharts
                            option={barchartData}
                            style={{ height: 400 }}
                            opts={{ renderer: 'svg' }}
                        />
                        </Card>
                    </Space>
                </Content>
                <UniFooter/>
            </>
        );
    }

    /* Raidarchat methods */
    onChartReady = (echarts) =>{
        this.state.timerRaidar = setTimeout(function() {
            echarts.hideLoading();
        }, 3000);
    }
}