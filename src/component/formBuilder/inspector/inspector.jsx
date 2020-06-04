import React from 'react';
import SingleTextInspector from './component/singleTextInspector';
// import EmailInputInspector from './component/emailInputInspector';
import PhoneInputInspector from './component/phoneInputInspector';
import RadioInputInspector from './component/radioInputInspector';
import NumberInputInspector from './component/numberInputInspector';
import DropDownInspector from './component/dropDownInspector';
import IdCardInspector from './component/idCardInspector';
import CheckboxInspector from './component/checkboxInspector';
import SetFormName from "./component/setFormName";
import MultiDropDownInspector from "./component/multiDropDownInspector";
import ScoreInputInspector from "./component/scoreInputInspector";
import FileUploadInspector from "./component/fileUploadInspector";
import ImageUploadInspector from "./component/imageUploadInspector";
import DateInputInspector from "./component/dateInputInspector";
import {Icon} from "antd";
export default class Inspector extends React.Component {
  constructor(props) {
    super(props);

    this.editForm = React.createRef();
  }

  _manualEditModeOff = () => {
    const { editElement } = this.props;
    if (editElement && editElement.dirty) {
      editElement.dirty = false;
      this.updateElement(editElement);
    }
    this.props.manualEditModeOff();
  }

  editModeOff = (e) => {
    if (this.editForm.current && !this.editForm.current.contains(e.target)) {
      this._manualEditModeOff();
    }
  }


  componentWillUnmount() {
    document.removeEventListener('mousedown', this.editModeOff);
  }


  renderComponentByType(editElement) {
    const { element } = editElement;

    switch (element) {
      case "SingleText": return <SingleTextInspector key={editElement.key} element={editElement} />;
      case "EmailInput": return <PhoneInputInspector key={editElement.key} element={editElement} />;
      case "PhoneInput": return <PhoneInputInspector key={editElement.key} element={editElement} />;
      case "NumberInput": return <NumberInputInspector key={editElement.key} element={editElement} />;
      case "RadioButtons": return <RadioInputInspector key={editElement.key} element={editElement} />;
      case "DropDown": return <DropDownInspector key={editElement.key} element={editElement} />;
      case "CheckboxInput": return <CheckboxInspector key={editElement.key} element={editElement} />;
      case "IdCardInput": return <IdCardInspector key={editElement.key} element={editElement} />;
      case "MultiDropDown": return <MultiDropDownInspector key={editElement.key} element={editElement} />;
      case "ScoreInput": return <ScoreInputInspector key={editElement.key} element={editElement} />;
      case "FileUpload": return <FileUploadInspector key={editElement.key} element={editElement} />;
      case "ImageUpload": return <ImageUploadInspector key={editElement.key} element={editElement} />;
      case "DateInput": return <DateInputInspector key={editElement.key} element={editElement} />;
      case "SetFormName": return <SetFormName key={editElement.key} />;
      default: return <div></div>;
    }
  }

  render() {
    
    return (
      <div className="react-form-builder-inspector">
        <div className="edit-bar">
          <span><Icon type="setting" />&nbsp;&nbsp;字段属性</span>
        </div>
        <div className="edit-form" >
          {this.props.editElement !== null &&
            this.renderComponentByType(this.props.editElement)
          }
          {
            this.props.editElement === null || this.props.editElement.element=="clearInspector"?
              <span className="NoChooseTag">请选择一个字段</span> :
              <></>
          }
        </div>
      </div>
    );
  }
}

Inspector.defaultProps = {
  files: [],
  isEditMode: false,
  editElement: null,
};
