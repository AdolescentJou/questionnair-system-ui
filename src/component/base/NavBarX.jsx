import React, { PureComponent } from "react";
import { Button, Icon } from "antd";
import {withRouter} from 'react-router-dom';

class NavBar extends PureComponent {
  render() {
    const {
      backCallback,
      title = "",
      isShowBtn,
      btnValue = "创建问卷",
      btnValueTwo = "",
      isShowBackBtn = true,
      clickCallback = () => {
        return 0;
      },
      clickCallbackTwo = () => {
        return 0;
      }
    } = this.props;
    return (
      <div className="formBuilder-NavBar">
        <div className="flexBlank" />
        <div className="navBarBtn" onClick={()=>{this.props.history.push('/formList')}}>
          <Icon type="menu" />
          &nbsp;返回列表
        </div>
        {isShowBtn ? (
          <div className="navBarBtn" onClick={clickCallback}>
            <Icon type="plus" />
            &nbsp;保存问卷
          </div>
        ) : (
          ""
        )}
        {btnValueTwo ? (
          <div className="navBarBtn" onClick={clickCallbackTwo}>
            <Icon type="build" />
            &nbsp;修改布局
          </div>
        ) : (
          ""
        )}
        <div className="navBarBtn" onClick={()=>{this.props.history.push('/index')}}>
          <Icon type="book" />
          &nbsp;回到首页
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
