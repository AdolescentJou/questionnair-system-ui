import React, { PureComponent } from "react";
import GridLayout from "react-grid-layout";
import { Form } from "antd";
import { submitLayout } from "../submission/redux/action";
import { connect } from "react-redux";
import HeaderBar from "../base/NavBarX";
import locationUtils from "../../utils/locationUtils";
import config from "../../config/config";
import PhoneInput from "../submission/component/phoneInput";
import Email from "../submission/component/Email";
import Checkbox from "../submission/component/checkboxInput";
import DropDown from "../submission/component/dropDown";
import IdCard from "../submission/component/idCard";
import SingleText from "../submission/component/singleTextInput";
import RadioButtons from "../submission/component/radioInput";
import NumberInput from "../submission/component/numberInput";
import MultiDropDown from "../submission/component/multiDropDown";
import ScoreInput from "../submission/component/scoreInput";
import FileUpload from "../submission/component/fileUpload";
import ImageUpload from "../submission/component/imageUpload";
import DateInput from "../submission/component/dateInput";
import { getForms } from "../homePage/redux/action";
import { initForm } from "../formBuilder/redux/action";
import { initToken } from "../../utils/tokenUtils";
import {withRouter} from "react-router-dom";
import Header from "../header/header";
class Layout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formComponent: { components: [] },
      currentLayout: null,
      formId: locationUtils.getUrlParamObj().id,
      currentPage: locationUtils.getUrlParamObj().page
    };
  }

  componentDidMount() {
    const {email,password} = this.props.userConfig;
      initToken(email,password)
      .then(() => {
        this.props.initForm(this.state.formId);
      })
      .catch(err => {
        console.error(err);
      });
    
  }

  renderFormComponent = (getFieldDecorator, components) => {
    return components.map(item => {
      switch (item.type) {
        case "EmailInput":
          return (
            <div key={item.key}>
              <Email
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
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
        case "DropDown":
          return (
            <div key={item.key}>
              <DropDown
                key={item.key}
                getFieldDecorator={getFieldDecorator}
                item={item}
              />
            </div>
          );
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
          return <></>;
      }
    });
  };

  render() {
    // let selectComponentArray = this.props.forms.filter(item => {
    //   return item._id == this.state.formId;
    // });
    // this.state.formComponent = selectComponentArray[0] || { components: [] };

    const { getFieldDecorator } = this.props.form;

    // this.state.formComponent = this.props.localForm || { components: [] };

    // this.setState({formComponent:this.props.localForm})
    let layout = [];
    this.props.localForm
      ? (layout = this.props.localForm.components.map(item => {
          return item.layout;
        }))
      : [];

    return (
      <>
        <Header />
        <HeaderBar
          backCallback={() => {
            location.href = config.hostUrl + "/formList";
          }}
          // title={this.state.formComponent.name}
          isShowBtn={true}
          btnValue="保存布局"
          clickCallback={() =>
            initToken().then(() => {
              this.props.submitLayout(
                this.state.currentLayout,
                this.props.localForm || {}
              );
            })
          }
        />
        <div className="formBuilder-Submission">
          <div className="Content">
            <div className="submission-title">
              {this.props.localForm ? this.props.localForm.title : ""}
            </div>
            <div className="form-layout">
              <GridLayout
                className="layout"
                layout={layout}
                cols={12}
                rowHeight={22}
                width={850}
                onLayoutChange={layout => {
                  this.setState({ currentLayout: layout });
                }}
              >
                {this.renderFormComponent(
                  getFieldDecorator,
                  this.props.localForm ? this.props.localForm.components : []
                )}
              </GridLayout>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const layoutForm = Form.create()(Layout);

export default withRouter(connect(
  store => ({
    forms: store.forms.formArray,
    localForm: store.formBuilder.localForm,
    userConfig:store.login.userConfig
  }),
  {
    submitLayout,
    getForms,
    initForm
  }
)(layoutForm));
