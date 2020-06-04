import React, { PureComponent } from "react";
import GridLayout from "react-grid-layout";
import { Button, Form, message, Icon, Spin } from "antd";
import { submitSubmission, getFormComponent } from "./redux/action";
import { getSubmissionData } from "../formData/redux/action";
import { connect } from "react-redux";
// import HeaderBar from "../base/NavBarX";
import PhoneInput from "./component/phoneInput";
import locationUtils from "../../utils/locationUtils";
import config from "../../config/config";
import Email from "./component/Email";
import Checkbox from "./component/checkboxInput";
import DropDown from "./component/dropDown";
import IdCard from "./component/idCard";
import SingleText from "./component/singleTextInput";
import RadioButtons from "./component/radioInput";
import NumberInput from "./component/numberInput";
import MultiDropDown from "./component/multiDropDown";
import ScoreInput from "./component/scoreInput";
import FileUpload from "./component/fileUpload";
import ImageUpload from "./component/imageUpload";
import DateInput from "./component/dateInput";
import Header from "../header/header";
import { initToken } from "../../utils/tokenUtils";
import { withRouter } from "react-router-dom";
import copy from "copy-to-clipboard";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

class Submission extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tipVisibility: false,
      formId: locationUtils.getUrlParamObj().id,
      submitSpin:false
    };
  }

  setSubmitSpin = () => {
    this.setState({submitSpin:!this.state.setSubmitSpin});
  }

  componentDidMount() {
    const { getFormComponent } = this.props;
    // const { email, password } = this.props.userConfig;
    initToken("123@123.com", "123").then((res) => {
      getFormComponent(this.state.formId);
      this.props.getSubmissionData(this.state.formId);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error("提交失败，请检查表单信息是否填入正确!", 2);
        return;
      }else{
        this.setSubmitSpin();
        this.props.submitSubmission(this.state.formId, values,this.setSubmitSpin,this.props.history.push);
      }
    });
  };

  renderFormComponent = (getFieldDecorator, components, uniqueColumnData) => {
    return components.map((item, index) => {
      switch (item.type) {
        case "EmailInput":
          return (
            <div key={item.key}>
              <Email
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
                submittedData={uniqueColumnData[item.key]}
              />
            </div>
          );
        case "DropDown":
          return (
            <div key={item.key}>
              <DropDown
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
                submittedData={uniqueColumnData[item.key]}
              />
            </div>
          );
        case "PhoneInput":
          return (
            <div key={item.key}>
              <PhoneInput
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
                submittedData={uniqueColumnData[item.key]}
              />
            </div>
          );
        case "IdCardInput":
          return (
            <div key={item.key}>
              <IdCard
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
                submittedData={uniqueColumnData[item.key]}
              />
            </div>
          );
        case "SingleText":
          return (
            <div key={item.key}>
              <SingleText
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
                submittedData={uniqueColumnData[item.key]}
              />
            </div>
          );
        case "NumberInput":
          return (
            <div key={item.key}>
              <NumberInput
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
                submittedData={uniqueColumnData[item.key]}
              />
            </div>
          );
        case "RadioButtons":
          return (
            <div key={item.key}>
              <RadioButtons
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
              />
            </div>
          );
          break;
        case "CheckboxInput":
          return (
            <div key={item.key}>
              <Checkbox
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
              />
            </div>
          );
          break;
        case "MultiDropDown":
          return (
            <div key={item.key}>
              <MultiDropDown
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
              />
            </div>
          );
        case "ScoreInput":
          return (
            <div key={item.key}>
              <ScoreInput
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
              />
            </div>
          );
        case "FileUpload":
          return (
            <div key={item.key}>
              <FileUpload
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
              />
            </div>
          );
        case "ImageUpload":
          return (
            <div key={item.key}>
              <ImageUpload
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
              />
            </div>
          );
        case "DateInput":
          return (
            <div key={item.key}>
              <DateInput
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
              />
            </div>
          );
        default:
          return <p key={index}>渲染失败</p>;
          break;
      }
    });
  };

  render() {
    const { formComponent, form, formData } = this.props;
    const { getFieldDecorator } = form;

    let layout = formComponent.components.map((item) => {
      return {
        ...item.layout,
        static: true,
      };
    });

    const uniqueComponents = formComponent.components.filter((component) => {
      return component.unique === true;
    });

    const uniqueColumnData = {};
    for (let i = 0; i < uniqueComponents.length; i++) {
      for (let j = 0; j < formData.length; j++) {
        let submissionData = formData[j].data;
        for (var key in submissionData) {
          if (
            uniqueComponents[i].key === key &&
            uniqueColumnData[key] === undefined
          ) {
            uniqueColumnData[key] = [];
            uniqueColumnData[key].push(submissionData[key]);
          } else if (uniqueComponents[i].key === key) {
            uniqueColumnData[key].push(submissionData[key]);
          }
        }
      }
    }

    return (
      <>
        <Header showBtn={false}/>
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
          <div
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
          </div>
        </div>
        <div className="formBuilder-Submission">
          <div className="Content">
            <div className="submission-title">{formComponent.title}</div>
            <div className="form-layout">
              <Form onSubmit={this.handleSubmit}>
                <GridLayout
                  className="layout"
                  layout={layout}
                  cols={12}
                  rowHeight={22}
                  width={850}
                  onLayoutChange={(layout) => {
                    this.setState({ currentLayout: layout });
                  }}
                >
                  {this.renderFormComponent(
                    getFieldDecorator,
                    formComponent.components,
                    uniqueColumnData
                  )}
                </GridLayout>

                <Form.Item style={{ width: "100%", textAlign: "center" }}>
                  <Button htmlType="submit">
                    {
                      this.state.submitSpin ? <>正在提交<Spin/></> : "提交"
                    }
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const SubmissionForm = Form.create()(Submission);

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
  )(SubmissionForm)
);
