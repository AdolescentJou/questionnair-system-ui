import React from "react";
import { connect } from "react-redux";
import { Input, Checkbox, InputNumber } from "antd";
import { setItemAttr } from "../../redux/action";

class NumberInputInspector extends React.PureComponent {
  handleChangeAttr = ev => {
    let { name, value, checked } = ev.target;
    const { validate } = this.props.element;
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

  handleChangeAttrMin = (value) => {
    const { validate } = this.props.element;

    var newValidate = {
      ...validate,
      min: value
    }

    this.props.setItemAttr(
      this.props.element,
      'validate',
      newValidate,
    );
  }

  handleChangeAttrMax = (value) => {
    const { validate } = this.props.element;
    var newValidate = {
      ...validate,
      max: value
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
      inputMask
    } = this.props.element;
    const formatChecks = inputMask ? true : false;

    return (
        <div className="base-form-tool">
          <p htmlFor="number-input-title">标题</p>
          <Input
            id="number-input-title"
            name="label"
            placeholder="数字"
            value={label}
            onChange={this.handleChangeAttr}
          />

          <p htmlFor="number-input-title-tip">提示信息</p>
          <Input
            id="number-input-title-tip"
            name="tooltip"
            placeholder="请输入提示信息"
            value={tooltip}
            onChange={this.handleChangeAttr}
          />

          <p htmlFor="number-input-title-err-tip">错误提示</p>
          <Input
            id="number-input-title-err-tip"
            name="customMessage"
            placeholder="请输入错误提示"
            value={validate.customMessage}
            onChange={this.handleChangeAttr}
          />

          <p htmlFor="number-input-title-default-value">默认值</p>
          <Input
            id="number-input-title-default-value"
            name="defaultValue"
            placeholder="请输入默认值"
            value={defaultValue}
            type='number'
            onChange={this.handleChangeAttr}
          />

          <p htmlFor="number-input-title-tip">校验</p>
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
            <p htmlFor="minNumber">最小值</p>
            <InputNumber
              name="minNumber"
              value={validate.min}
              onChange={this.handleChangeAttrMin} />
          </div>
          <div className='number-check-warper'>
            <p htmlFor="maxNumber">最大值</p>
            <InputNumber
              name="maxNumber"
              value={validate.max}
              onChange={this.handleChangeAttrMax} />
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
)(NumberInputInspector);
