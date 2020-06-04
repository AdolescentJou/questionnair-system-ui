import React from "react";
import { Select } from "antd";
import locationUtils from "../../../utils/locationUtils";
import { getAllSubmissionData } from "../redux/action";
import { initToken } from "../../../utils/tokenUtils";
import { connect } from "react-redux";
// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formId: locationUtils.getUrlParamObj().id
    };
  }
  componentDidMount() {
    const {email,password} = this.props.userConfig;
    initToken(email,password)
      .then(() => {
        this.props.getAllSubmissionData(this.state.formId);
      })
      .catch(err => {
        console.error(err);
      });
  }
  _filterCanDrawComponent(type) {
    const canDrawComponentArr = [
      "RadioButtons",
      "DropDown",
      "CheckboxInput",
      "MultiDropDown",
      "ScoreInput"
    ];
    return canDrawComponentArr.includes(type);
  }

  _buildxAisByType = component => {
    switch (component.type) {
      case "RadioButtons":
      case "MultiDropDown":
      case "CheckboxInput":
        return component.values.map(item => item.value);
      case "DropDown":
        return component.data.values.map(item => item.value);
      case "ScoreInput":
        return [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
      default:
        return [];
    }
  };

  handleOnchange = value => {
    const total = this.props.formData.length;
    const name = this.props.forms.components.filter(
      component => component.key == value
    )[0].label;
    const xAxis = this._buildxAisByType(
      this.props.forms.components.filter(component => component.key == value)[0]
    );

    let dataArr = [];
    for (let i = 0; i < xAxis.length; i++) {
      var count = 0;
      this.props.formData.map(item => {
        if (item.data[value] == xAxis[i] ) {
          count++;
        }
        if({}.toString.call(item.data[value]) == "[object Array]" &&  item.data[value].includes(xAxis[i])){
          count++;
        }
      });
      dataArr[i] = count;
    }
    var myChart = echarts.init(document.getElementById("barChartContent"));
    var option = {
      backgroundColor: "#323a5e",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "2%",
        right: "4%",
        bottom: "14%",
        top: "16%",
        containLabel: true
      },
      legend: {
        data: [name],
        right: 10,
        top: 12,
        textStyle: {
          color: "#fff"
        },
        itemWidth: 12,
        itemHeight: 10
        // itemGap: 35
      },
      xAxis: {
        // type: "选项名",
        data: xAxis,
        axisLine: {
          lineStyle: {
            color: "white"
          }
        },
        axisLabel: {
          // interval: 0,
          // rotate: 40,
          textStyle: {
            fontFamily: "Microsoft YaHei"
          }
        }
      },

      yAxis: {
        // type: "选择情况",
        max: total,
        axisLine: {
          show: false,
          lineStyle: {
            color: "white"
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,0.3)"
          }
        },
        axisLabel: {}
      },
      dataZoom: [
        {
          show: true,
          height: 12,
          xAxisIndex: [0],
          bottom: "8%",
          start: 10,
          end: 90,
          handleIcon:
            "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
          handleSize: "110%",
          handleStyle: {
            color: "#d3dee5"
          },
          textStyle: {
            color: "#fff"
          },
          borderColor: "#90979c"
        },
        {
          type: "inside",
          show: true,
          height: 15,
          start: 1,
          end: 35
        }
      ],
      series: [
        {
          name: name,
          type: "bar",
          barWidth: "25%",
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#248ff7"
                },
                {
                  offset: 1,
                  color: "#6851f1"
                }
              ]),
              barBorderRadius: 11
            }
          },
          data: dataArr
        }
      ]
    };

    var app = {
      currentIndex: -1
    };
    setInterval(function() {
      var dataLen = option.series[0].data.length;

      // 取消之前高亮的图形
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: app.currentIndex
      });
      app.currentIndex = (app.currentIndex + 1) % dataLen;
      //console.log(app.currentIndex);
      // 高亮当前图形
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: app.currentIndex
      });
      // 显示 tooltip
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: app.currentIndex
      });
    }, 1000);
    myChart.setOption(option);
  };
  render() {
    return (
      <div className="barChartContainer">
        <div className="chioceContainer">
          <Select
            placeholder="请选择组件"
            onChange={value => this.handleOnchange(value)}
          >
            {this.props.forms.components
              .filter(item => this._filterCanDrawComponent(item.type))
              .map(element => (
                <Select.Option key={element.key} value={element.key}>
                  {element.label}
                </Select.Option>
              ))}
          </Select>
        </div>
        <div className="barChartContent" id="barChartContent"></div>
      </div>
    );
  }
}

export default connect(
  store => ({
    formData: store.formSubmitData.formAllData,
    forms: store.formSubmitData.forms,
    submissionDataTotal: store.formSubmitData.submissionDataTotal,
    userConfig:store.login.userConfig
    // loading: store.formSubmitData.formDataLoading
  }),
  {
    getAllSubmissionData
  }
)(BarChart);
