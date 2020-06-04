import React from "react";
import { Select } from "antd";
import locationUtils from "../../../utils/locationUtils";
import { getAllSubmissionData } from "../redux/action";
import { initToken } from "../../../utils/tokenUtils";
import { connect } from "react-redux";
// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
// 引入饼状图
import "echarts/lib/chart/pie";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

import 'echarts-liquidfill/src/liquidFill.js';
class FanChart extends React.Component {
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
        if({}.toString.call(item.data[value]) == "[object Array]" && item.data[value].includes(xAxis[i])){
          count++;
        }
      });
      dataArr[i] = {
        value:count,
        name:xAxis[i],
      };
    }
    var myChart = echarts.init(document.getElementById("barChartContent"));

    var val1data2 = [
      {
        value: 0.2,
        name: "装配完成率"
      },
      {
        value: 0.3,
        name: "班检完成率"
      },
      {
        value: 0.4,
        name: "初检完成率"
      },
      {
        value: 0.3,
        name: "复检完成率"
      },
      {
        value: 0.1,
        name: "出厂检完成率"
      }
    ];

    var arr = ["middleLost", total, dataArr, name];

    var option = {
      title: {
        top: "45%",
        left: "center",
        text: arr[3],
        textStyle: {
          color: "#fff",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: 14
        },
        // subtext: "(占所有数据的的" + ((arr[1] * 10000) / 100).toFixed(2) + "%)",
        subtextStyle: {
          color: "#fff",
          fontSize: 12
        }
      },
      tooltip: {
        trigger: "item",
        formatter: function(res) {
          // console.log(res);

          if (res.componentSubType == "liquidFill") {
            return (
              res.seriesName +
              ": " +
              ((res.value * 10000) / 100).toFixed(2) +
              "%"
            );
          } else {
            return (
              '<span class="ii" style="background:' +
              res.color +
              ' "></span>' +
              res.name +
              ":<br/> " +
              res.data.value
            );
          }
        }
      },
      series: [
        {
          type: "liquidFill",
          itemStyle: {
            normal: {
              opacity: 0.4,
              shadowBlur: 0,
              shadowColor: "blue"
            }
          },
          name: arr[3],
          data: [
            {
              value: 0.6,
              itemStyle: {
                normal: {
                  color: "#53d5ff",
                  opacity: 0.6
                }
              }
            }
          ],
          //  background: '#fff',
          color: ["#53d5ff"],
          center: ["50%", "50%"],
          /*  backgroundStyle: {
              color: '#fff'
          },*/
          label: {
            normal: {
              formatter: "",
              textStyle: {
                fontSize: 12
              }
            }
          },
          outline: {
            itemStyle: {
              borderColor: "#86c5ff",
              borderWidth: 0
            },
            borderDistance: 0
          }
        },
        {
          type: "pie",
          radius: ["72%", "80%"],
          color: [
            "#c487ee",
            "#deb140",
            "#49dff0",
            "#034079",
            "#6f81da",
            "#00ffb4"
          ],
          hoverAnimation: false, ////设置饼图默认的展开样式
          label: {
            show: true,

            normal: {
              formatter: "{b}\n{d}%",
              show: true,
              position: ""
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },

          itemStyle: {
            // 此配置
            normal: {
              borderWidth: 2,
              borderColor: "#fff"
            },
            emphasis: {
              borderWidth: 0,
              shadowBlur: 2,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          data: arr[2]
        }
      ]
    };

    myChart.setOption(option);
  };
  render() {
    return (
      <div className="fanChartContainer">
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
        <div className="fanChartContent" id="barChartContent"></div>
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
)(FanChart);
