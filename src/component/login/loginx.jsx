import React from "react";
import { Form, Icon, Input, Spin, Button } from "antd";
import { connect } from "react-redux";
import { mockLoginAndSetData } from "./redux/action";
import VCode from "./vCode";
class NormalLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (values.vCode.toLowerCase() == this.props.vCodeMsg.toLowerCase()) {
        this.props.mockLoginAndSetData(values.email, values.password,this.props.handleOk);
      }
    });
  };
  vCodeValidFunction = (rule, value, callback) => {
    if (value.toLowerCase() == this.props.vCodeMsg.toLowerCase()) {
      callback();
    } else {
      callback("验证码错误");
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="TestLoginContainer">
        <div className="ModalTitle">
          <img src="/favicon.ico" />
          <span>可视化问卷调查系统</span>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "请输入邮箱" }],
            })(
              <Input
                prefix={
                  <Icon type="idcard" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="email"
                placeholder="邮箱"
                autoComplete="off"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </Form.Item>
          <div className="vCodeContent">
            <VCode />
            <Form.Item>
              {getFieldDecorator("vCode", {
                rules: [
                  { required: true, message: "请输入验证码" },
                  {
                    validator: this.vCodeValidFunction,
                  },
                ],
                validateTrigger: "onSubmit",
              })(<Input placeholder="请输入验证码" autoComplete="off" />)}
            </Form.Item>
          </div>
          <Form.Item>
            <div style={{ textAlign: "right" }}>
              <a
                className="login-form-forgot"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.showRegisterModal(e);
                }}
                href=""
              >
                没有账号？立即注册
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {this.props.loginStatus == "loginLoading" ? (
                  <>
                    <Spin />
                    正在登录{" "}
                  </>
                ) : (
                  <span>登录</span>
                )}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const Login = Form.create({ name: "normal_login" })(NormalLogin);

export default connect(
  (store) => ({
    loginStatus: store.login.loginStatus,
    vCodeMsg:store.login.vCodeMsg
  }),
  {
    mockLoginAndSetData,
  }
)(Login);
