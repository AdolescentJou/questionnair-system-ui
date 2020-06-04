import React from "react";
import { connect } from "react-redux";
import { DndProvider } from 'react-dnd';
import { saveForm, updateForm, initForm } from "./redux/action";
import HTML5Backend from 'react-dnd-html5-backend';
import Preview from './preview/preview';
import Toolbar from './toolbar/toolbar';
import Inspector from './inspector/inspector';
import NavBar from '../base/NavBarX';
import config from '../../config/config';
import locationUtils from "../../utils/locationUtils";
// import { mockLoginAndSetData } from "../../redux/action";
import { initToken } from "../../utils/tokenUtils";
import Header from "../header/header";
import {withRouter} from "react-router-dom";
class ReactFormBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
      editElement: null,
      formId: locationUtils.getUrlParamObj().id
    };

    this.editModeOn = this.editModeOn.bind(this);
  }

  componentDidMount() {
    const { formId } = this.state;
    const { initForm } = this.props;
    const {email,password} = this.props.userConfig;
    initToken(email,password).then(() => {
      if (formId) {
        initForm(formId);
      }
    })
  }

  editModeOn(editElement, e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isEditMode: !this.state.isEditMode, editElement });
  }

  manualEditModeOff() {
    if (this.state.isEditMode) {
      this.setState({
        isEditMode: false,
        editElement: null
      });
    }
  }

  render() {
    const toolbarProps = {};
    if (this.props.toolbarItems) {
      toolbarProps.items = this.props.toolbarItems;
    }
    let editForm = this.props.formArray.filter(form => {
      return form._id == this.state.formId;
    });
    return (
      <>
        <Header/>
        <NavBar
          backCallback={() => {
            location.href = config.hostUrl+'/formList';
          }}
          title=""
          isShowBtn={true}
          btnValue="保存问卷"
          btnValueTwo="设置布局"
          clickCallback={editForm.length > 0 ?
            () => this.props.updateForm(
              this.props.formData,
              this.props.submissionAccess,
              this.props.name,
              editForm[0].path,
              'export',
              this.props.history.push
            ) : () => this.props.saveForm(
              this.props.formData,
              this.props.submissionAccess,
              this.props.name,
              'export',
              this.props.userConfig.email,
              this.props.history.push
            )
          }
          clickCallbackTwo={editForm.length > 0 ?
            () => this.props.updateForm(
              this.props.formData,
              this.props.submissionAccess,
              this.props.name,
              editForm[0].path,
              'layout',
              this.props.history.push
            ) : () => this.props.saveForm(
              this.props.formData,
              this.props.submissionAccess,
              this.props.name,
              'layout',
              this.props.userConfig.email,
              this.props.history.push
            )
          }
        />
        <DndProvider backend={HTML5Backend}>
          <div>
            <div className="react-form-builder clearfix">
              <Toolbar {...toolbarProps} />

              <Preview
                manualEditModeOff={this.manualEditModeOff.bind(this)}
                showCorrectColumn={this.props.showCorrectColumn}
                parent={this}
                editModeOn={this.editModeOn}
                isEditMode={this.state.isEditMode}
                editElement={this.state.editElement}
                defaultForm={editForm[0] ? editForm[0] : null}
              />

              <Inspector
                key="formBuilder-inspector"
                editModeOn={this.editModeOn}
                isEditMode={this.state.isEditMode}
                editElement={this.state.editElement}
              />
            </div>
          </div>
        </DndProvider>
      </>
    );
  }
}

export default withRouter(connect(
  store => ({
    formData: store.formBuilder.data,
    name: store.formBuilder.name,
    formArray: store.forms.formArray,
    userConfig:store.login.userConfig
  }),
  {
    saveForm,
    updateForm,
    initForm,
    // mockLoginAndSetData
  }
)(ReactFormBuilder));

