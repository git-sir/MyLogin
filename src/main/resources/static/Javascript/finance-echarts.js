// 路径配置
require.config({
    paths: {
        echarts: 'Javascript'
    }
});

// 使用
require(
    ['echarts', 'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
    ],
    function (ec) {
        // 基于准备好的dom，初始化echarts图表
        var invest = ec.init(document.getElementById('chart-invest'));//投资
        var settlement = ec.init(document.getElementById('chart-settlement'));
        var financing = ec.init(document.getElementById('chart-financing'));
		
		window.onresize=function(){
			invest.resize();
			settlement.resize();
			financing.resize();
			}
        var optioni = {
            color:['#adc7e5','#977acc','#ff8b63'],
            title: {
                subtext: '单位（元）',
                subtextStyle : {
                    color: '#666'
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: "#edf4fc",
                textStyle: {
                    color: '#5093e1'
                },
                borderColor: 'none'
            },
            legend: {
                x:'right',
                y:20,
                //data: ['结算总额']
                data:['投资总额','活期总额','定期总额']
            },
            grid:{
                //x:0,
                // y:0,
                x2:0,
                height:310,
                borderWidth: 0
            },
			calculable:true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLine:false,
                    axisTick:false,
                    splitLine:false,
                    axisLabel:{
                        interval:4,//横坐标隔4个
                        textStyle:{color:'#666'}
                    },
                    //data : ['9月1日','9月2日','9月3日','9月4日','9月5日','9月6日','9月7日','9月8日','9月9日']
                    data: (function () {
                        var d = [];
                        var len = 0;
                        while (len++ < 30) {
                            d.push([
                                '9月'+ len+'日'
                            ]);
                        }
                        return d;
                    })()
                }
            ],
            yAxis: [
                {
                    type: 'log',
                    splitNumber:4,
                    axisLine:false,
                    splitLine: {
                        lineStyle: {
                            type:'dashed',
                            color: ['#dde0e7'] //分隔线颜色
                        }
                    },
                    axisLabel: {
                        textStyle:{color:'#666'}
                    }
                }
            ],
            series: [
                {
                    name:'投资总额',
                    type: 'line',
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            areaStyle: {type: 'default',color:'rgba(246,249,253,.5)'}
                        }
                    },
                    data: [5000000,6000000,6500000,7000000,6000030,7200000,7000050,6000000,8000000,9000000,10000000,15000000,18000000,16000000,20000000,25000000,24000000,23000000,25000000,25000000,20000000,18000000,21000000,16000000,8000000,10000000,15000000,16000000,14000000,18000000]
                },
                {
                    name:'活期总额',
                    z:9,
                    type: 'line',
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type:'dotted'
                            }
                        }
                    },
                    data: [500000,600000,650000,700000,600030,720000,700050,600000,800000,900000,1000000,1500000,1800000,1600000,2000000,2500000,2400000,2300000,2500000,2500000,2000000,1800000,2100000,1600000,800000,1000000,1500000,1600000,1400000,1800000]
                },
                {
                    name:'定期总额',
                    z:10,
                    type: 'line',
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type:'dotted'
                            }
                        }
                    },
                    data: [2500000,2400000,2300000,2500000,2500000,2000000,1800000,2100000,1600000,800000,1000000,1500000,1600000,140000,1800000,500000,600000,650000,700000,600030,720000,700050,600000,800000,900000,1000000,1500000,1800000,1600000,2000000]
                }
            ]
        };
        var options = {
            color:['#adc7e5'],
            title: {
                subtext: '单位（元）',
                subtextStyle : {
                    color: '#666'
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: "#edf4fc",
                textStyle: {
                    color: '#5093e1'
                },
                borderColor: 'none'
            },
            legend: {
                x:'right',
                y:20,
                data:['结算总额']
            },
            grid:{
                //x:0,
                // y:0,
                x2:0,
                height:310,
                borderWidth: 0
            },
			calculable:true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLine:false,
                    axisTick:false,
                    splitLine:false,
                    axisLabel:{
                        interval:4,//横坐标隔4个
                        textStyle:{color:'#666'}
                    },
                    //data : ['9月1日','9月2日','9月3日','9月4日','9月5日','9月6日','9月7日','9月8日','9月9日']
                    data: (function () {
                        var d = [];
                        var len = 0;
                        while (len++ < 30) {
                            d.push([
                                '9月'+ len+'日'
                            ]);
                        }
                        return d;
                    })()
                }
            ],
            yAxis: [
                {
                    type: 'log',
                    splitNumber:4,
                    axisLine:false,
                    splitLine: {
                        lineStyle: {
                            type:'dashed',
                            color: ['#dde0e7'] //分隔线颜色
                        }
                    },
                    axisLabel: {
                        textStyle:{color:'#666'}
                    }
                }
            ],
            series: [
                {
                    name:'结算总额',
                    type: 'line',
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            areaStyle: {type: 'default',color:'#f6f9fd'}
                        }
                    },
                    data: [5000000,6000000,6500000,7000000,6000030,7200000,7000050,6000000,8000000,9000000,10000000,15000000,18000000,16000000,20000000,25000000,24000000,23000000,25000000,25000000,20000000,18000000,21000000,16000000,8000000,10000000,15000000,16000000,14000000,18000000]
                }
            ]
        };
        var optionf = {
            color:['#adc7e5'],
            title: {
                subtext: '单位（元）',
                subtextStyle : {
                    color: '#666'
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: "#edf4fc",
                textStyle: {
                    color: '#5093e1'
                },
                borderColor: 'none'
            },
            legend: {
                x:'right',
                y:20,
                //data: ['结算总额']
                data:['融资总额']
            },
            grid:{
                x2:0,
                height:310,
                borderWidth: 0
            },
			calculable:true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLine:false,
                    axisTick:false,
                    splitLine:false,
                    axisLabel:{
                        interval:4,//横坐标隔4个
                        textStyle:{color:'#666'}
                    },
                    //data : ['9月1日','9月2日','9月3日','9月4日','9月5日','9月6日','9月7日','9月8日','9月9日']
                    data: (function () {
                        var d = [];
                        var len = 0;
                        while (len++ < 30) {
                            d.push([
                                '9月'+ len+'日'
                            ]);
                        }
                        return d;
                    })()
                }
            ],
            yAxis: [
                {
                    type: 'log',
                    splitNumber:4,
                    axisLine:false,
                    splitLine: {
                        lineStyle: {
                            type:'dashed',
                            color: ['#dde0e7'] //分隔线颜色
                        }
                    },
                    axisLabel: {
                        textStyle:{color:'#666'}
                    }
                }
            ],
            series: [
                {
                    name:'融资总额',
                    z:9,
                    type: 'line',
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            areaStyle: {type: 'default',color:'#f6f9fd'}
                        }
                    },
                    data: [2500000,2400000,2300000,2500000,2500000,2000000,1800000,2100000,1600000,800000,1000000,1500000,1600000,1400000,1800000,500000,600000,650000,700000,600030,720000,700050,600000,800000,900000,1000000,1500000,1800000,1600000,2000000]
                }
            ]
        };
		
		
		
        // 为echarts对象加载数据
        invest.setOption(optioni);
        settlement.setOption(options);
        financing.setOption(optionf);
		
		//window.onresize = invest.resize;
		//window.onresize=function(){
//			invest.resize();
//			}
		
    }
);