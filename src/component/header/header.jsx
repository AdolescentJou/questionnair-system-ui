import React, { PureComponent } from "react";

import { Button, Icon } from "antd";
import config from "../../config/config";
import { connect } from "react-redux";
import { mockLogoutAndRemoveData } from "../login/redux/action";
import { withRouter } from "react-router-dom";
class HeaderTitle extends PureComponent {
  render() {
    const { isPageTop, showBtn = true } = this.props;
    const indexColor = isPageTop ? {} : { backgroundColor: "rgba(51,51,51,1)" };
    const formbuildColor = { backgroundColor: "rgba(51,51,51,1)" };
    return (
      <div
        className="formBuilder-Header"
        style={
          this.props.location.pathname != "/index" ? formbuildColor : indexColor
        }
      >
        <div className="headerTitle">
          <div className="headerTitleIcon">
            <img src="/image/title.png" />
            <span>&nbsp;&nbsp;&nbsp;可视化问卷调查系统</span>
          </div>
          <div className="headerTitleBlank" />
          {showBtn ? (
            <div className="headerTitleUser">
              {/* {config.loginData.data.email ? ( */}
              {this.props.userConfig ? (
                <>
                  <Button type="link">
                    <Icon type="user" />
                    邮箱:{this.props.userConfig.email}
                  </Button>
                  <span className="divider">|</span>
                  <Button
                    onClick={this.props.mockLogoutAndRemoveData}
                    type="link"
                  >
                    退出
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      this.props.showLoginModal();
                    }}
                    type="link"
                  >
                    登录
                  </Button>
                  <Button
                    onClick={() => {
                      this.props.showRegisterModal();
                    }}
                    type="link"
                  >
                    注册
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="headerTitleUser" />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    (store) => ({
      userConfig: store.login.userConfig,
    }),
    {
      mockLogoutAndRemoveData,
    }
  )(HeaderTitle)
);
