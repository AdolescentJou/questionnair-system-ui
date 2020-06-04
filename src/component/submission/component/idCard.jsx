import React from "react";
import { isValueValid,isStringValid } from "../../../utils/valueUtils";
import { Input, Form, Tooltip ,Icon } from "antd";

export default class IdCard extends React.Component {

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
    let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (!reg.test(value)) {
      let errMsg = this.props.item.validate.customMessage;
      isStringValid(errMsg)
        ? callback(errMsg)
        : callback("请输入正确的身份证号码！");
    } else {
      callback();
    }
  };

  checkIdCardNumber = (rule, value, callback) => {
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
              validator: this.checkIdCardNumber
            },
            {
              required: isValueValid(item.validate.required)
              ? item.validate.required
              : false,
              message: "身份证号不能为空!"
            }
          ]
        })(<Input />)}
      </Form.Item>
    );
  }
}
