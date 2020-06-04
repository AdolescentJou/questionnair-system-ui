import React from "react";
import { Form, Icon, Input, Spin, Button } from "antd";
import { connect } from "react-redux";
import { registerUser, getAllEmails } from "./redux/action";
import VCode from "./vCode";
class NormalRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getAllEmails();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (values.vCode.toLowerCase() == this.props.vCodeMsg.toLowerCase()) {
      this.props.registerUser(values.name, values.email, values.password,this.props.showLoginModal);
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
  emailUniqueCheck = (rule, value, callback) => {
    const checkArray = this.props.allEmails.filter(
      (item) => item.data.email == value
    );
    if (checkArray.length != 0) {
      callback("email已存在,请重新输入");
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="TestRegisterContainer">
        <div className="ModalTitle">
          <img src="/favicon.ico" />
          <span>可视化问卷调查系统</span>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入用户名" }],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "请输入邮箱" },
                {
                  validator: this.emailUniqueCheck,
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="idcard" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="email"
                placeholder="邮箱"
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
                  this.props.showLoginModal(e);
                }}
                href=""
              >
                已有账号？立即登录
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                <span>注册</span>
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const Register = Form.create({ name: "normal_register" })(NormalRegister);

export default connect(
  (store) => ({
    allEmails: store.login.allEmails,
    vCodeMsg:store.login.vCodeMsg
  }),
  {
    registerUser,
    getAllEmails,
  }
)(Register);
