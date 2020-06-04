import React from "react";

import { isValueValid } from "../../../utils/valueUtils";
import { Input, Form, Tooltip, Icon } from "antd";

export default class SingleTextInput extends React.Component {
  checkUnique = (rule, value, callback) => {
    if (value == "") {
      callback();
    } else if (this.props.submittedData && this.props.submittedData.indexOf(value) > -1) {
      callback(`${this.props.item.label}已存在，请重新输入一个值`);
    }
    else {
      callback();
    }
  }
  render() {
    const { getFieldDecorator, item, submittedData } = this.props;

    let errMsg = this.props.item.validate.customMessage;
    let rules = [];
    if (item.validate.maxLength !== null) {
      rules.push({
        max: item.validate.maxLength,
        message: errMsg.trim().length > 0 ? errMsg : `输入字符个数不要超过${item.validate.maxLength}`
      });
    }
    if (item.validate.minLength !== null) {
      rules.push({
        min: item.validate.minLength,
        message: errMsg.trim().length > 0 ? errMsg : `输入字符个数不要少于${item.validate.minLength}`
      });
    }

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
          initialValue: item.defaultValue,
          rules: [
            ...rules,
            {
              validator: this.checkUnique
            },
            {
              required: isValueValid(item.validate.required) ? item.validate.required : false,
              message: errMsg.trim().length > 0 ? errMsg : `${item.label}不能为空`
            }
          ]
        })(<Input />)}
      </Form.Item>
    );
  }
}