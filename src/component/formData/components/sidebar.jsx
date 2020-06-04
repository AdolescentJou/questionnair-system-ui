import React from "react";
import { Menu, Icon } from "antd";
import {withRouter} from "react-router-dom";
import locationUtils from "../../../utils/locationUtils";
class SiderBar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      formId: locationUtils.getUrlParamObj().id
    };
  }
  handleClick = e => {
    this.props.history.push(e.key+"?id="+this.state.formId);
  };

  componentDidMount(){
    if(!this.state.formId){
      this.props.history.push("/formList");
    }
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        // style={{ width: 200 }}
        defaultSelectedKeys={[this.props.location.pathname]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <Menu.ItemGroup key="g1" title={<span style={{fontWeight:'600'}}>请选择操作</span>}>
          <Menu.Item key="/submitdata/dataTable"><Icon type="file" />数据表格</Menu.Item>
          <Menu.Item key="/submitdata/barChart"><Icon type="bar-chart" />条形统计图</Menu.Item>
          <Menu.Item key="/submitdata/fanChart"><Icon type="pie-chart" />扇形统计图</Menu.Item>
          <Menu.Item key="/formList"><Icon type="left" />返回列表</Menu.Item>
          <Menu.Item key="/index"><Icon type="left" />返回首页</Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
  }
}

export default withRouter(SiderBar);
