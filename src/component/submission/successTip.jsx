import React, { PureComponent } from "react";
import { Button, Form, message, Icon, Result } from "antd";
import { submitSubmission, getFormComponent } from "./redux/action";
import { getSubmissionData } from "../formData/redux/action";
import { connect } from "react-redux";
import config from "../../config/config";
import Header from "../header/header";
import { withRouter } from "react-router-dom";
import copy from "copy-to-clipboard";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

class SubmissionTip extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Header showBtn={false} />
        <div className="formBuilder-NavBar">
          <div className="flexBlank" />
          <div
            className="navBarBtn"
            onClick={() => {
              this.props.history.push("/index");
            }}
          >
            <Icon type="book" />
            &nbsp;系统首页
          </div>
          {/* <div
            className="navBarBtn"
            onClick={() => {
              message.success("复制成功!");
              var str =
                config.apiUrl +
                this.props.location.pathname +
                this.props.location.search;
              copy(str);
            }}
          >
            <Icon type="copy" />
            &nbsp;复制连接
          </div> */}
        </div>
        <div className="formBuilder-Submission">
          <div className="Content">
            <div className="submission-title">问卷提交结果</div>
            <div className="form-layout">
              <Result
                status="success"
                title="问卷提交成功，感谢您参与我们的问卷调查"
                subTitle="您可以选择访问首页，也可以帮我们分享问卷，我们表示衷心的感谢"
              />
              ,
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(
  connect(
    (store) => ({
      forms: store.forms.formArray,
      formComponent: store.survey.formComponent,
      formData: store.formSubmitData.formData,
      userConfig: store.login.userConfig,
    }),
    {
      submitSubmission,
      getFormComponent,
      getSubmissionData,
    }
  )(SubmissionTip)
);
