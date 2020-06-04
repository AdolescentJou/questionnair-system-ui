import React from "react";
import { connect } from "react-redux";
import { Input, Checkbox, Tooltip, Icon, InputNumber } from "antd";
import { setItemAttr } from "../../redux/action";

class SingleTextInspector extends React.Component {
  handleChangeAttr = ev => {
    let { name, value, checked } = ev.target;
    let { validate, unique } = this.props.element;
    validate = {...validate};
    switch (name) {
      case "customMessage": {
        validate.customMessage = value;
        value = validate;
        break;
      }
      case "required": {
        validate.required = checked;
        value = validate;
        break;
      }
    }
    this.props.setItemAttr(
      this.props.element,
      name,
      value != undefined ? value : checked
    );
  };

  handleChangeAttrMinLength = (value) => {
    const { validate } = this.props.element;
    var newValidate = {
      ...validate,
      minLength: value
    }

    this.props.setItemAttr(
      this.props.element,
      'validate',
      newValidate,
    );

  }

  handleChangeAttrMaxLength = (value) => {
    const { validate } = this.props.element;

    var newValidate = {
      ...validate,
      maxLength: value
    }

    this.props.setItemAttr(
      this.props.element,
      'validate',
      newValidate,
    );

  }

  render() {
    const {
      id,
      label,
      tooltip,
      defaultValue,
      validate,
      unique = false,
    } = this.props.element;


    return (
      
        <div className="base-form-tool">
          <p htmlFor="email-title">标题</p>
          <Input
            id="single-text-title"
            name="label"
            placeholder="单行文本"
            value={label}
            onChange={this.handleChangeAttr}
          />

          <p htmlFor="single-text-tip">提示信息</p>
          <Input
            id="single-text-tip"
            name="tooltip"
            placeholder="请输入提示信息"
            value={tooltip}
            onChange={this.handleChangeAttr}
          />

          <p htmlFor="single-text-err-tip">错误提示</p>
          <Input
            id="single-text-err-tip"
            name="customMessage"
            placeholder="请输入错误提示"
            value={validate.customMessage}
            onChange={this.handleChangeAttr}
          />

          <p htmlFor="single-text-default-value">默认值</p>
          <Input
            id="single-text-default-value"
            name="defaultValue"
            placeholder="请输入默认值"
            value={defaultValue}
            onChange={this.handleChangeAttr}
          />

          <p htmlFor="email-tip">校验</p>
          <div className="checkbox-wrapper">
            <Checkbox
              name="required"
              checked={validate.required}
              onChange={this.handleChangeAttr}
            >
              必填
              </Checkbox>
            {/* <Checkbox
              name="unique"
              checked={unique}
              onChange={this.handleChangeAttr}
            >
              不允许重复
              </Checkbox> */}
          </div>
          <div className='number-check-warper'>
            <p htmlFor="min-length">最小长度</p>
            <InputNumber
              name='minLength'
              min={1}
              precision={0}
              onChange={this.handleChangeAttrMinLength}
              value={validate.minLength}
            />
          </div>
          <div className='number-check-warper'>
            <p htmlFor="max-length">最大长度</p>
            <InputNumber
              name='maxLength'
              min={1}
              precision={0}
              onChange={this.handleChangeAttrMaxLength}
              value={validate.maxLength}
            />
          </div>
        </div>
    );
  }
}

export default connect(
  store => ({
    data: store.formBuilder.data
  }),
  {
    setItemAttr
  }
)(SingleTextInspector);

