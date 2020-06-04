import React from "react";
import { isValueValid,isStringValid } from "../../../utils/valueUtils";
import { Input, Form, Tooltip, Icon } from "antd";

export default class PhoneNumber extends React.Component {

  isValueEqualEmptyAndUndefined = value => {
    if (value == "" || value == void 0) {
      return true;
    } else {
      return false;
    }
  };

  emptyValueNotShowMessage = callback => {
    callback();
  };

  checkValueAndThrowMessage = (value, callback) => {
    let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (!reg.test(value)) {
      let errMsg = this.props.item.validate.customMessage;
      isStringValid(errMsg) ? callback(errMsg) : callback("请输入正确的手机号！");
    } else if (this.props.submittedData && this.props.submittedData.indexOf(value) > -1) {
      callback(`${this.props.item.label}已存在，请重新输入一个值`);
    } else {
      callback();
    }
  };

  checkPhoneNumber = (rule, value, callback) => {
    this.isValueEqualEmptyAndUndefined(value)
      ? this.emptyValueNotShowMessage(callback)
      : this.checkValueAndThrowMessage(value, callback);
  };

  render() {
    const { getFieldDecorator, item } = this.props;

    return (
      <Form.Item
        label={
          <span>
            <span className="label-text">{item.label}</span>
            {item.tooltip ? (
              <Tooltip title={item.tooltip}>
                <Icon type="question-circle-o" />
              </Tooltip>
            ) : null}
          </span>
        }
      >
        {getFieldDecorator(item.key, {
          rules: [
            {
              validator: this.checkPhoneNumber
            },
            {
              required: isValueValid(item.validate.required) ? item.validate.required : false,
              message: "手机号不能为空!"
            }
          ]
        })(<Input />)}
      </Form.Item>
    );
  }
}
