import React from "react";

import { isValueValid, isStringValid } from "../../../utils/valueUtils";
import { Input, Form, Tooltip, Icon } from "antd";

export default class NumberInput extends React.Component {
  checkNumber = (rule, value, callback) => {
    const validateMax = this.props.item.validate.max;
    const validateMin = this.props.item.validate.min;
    let defaultErrMsg = '';
    if (validateMax !== null && validateMin !== null) {
      defaultErrMsg = `请输入${validateMin} ~ ${validateMax}之间的数字`;
    } else if (validateMax !== null) {
      defaultErrMsg = `请输入小于或等于${validateMax}的数字`;
    } else {
      defaultErrMsg = `请输入大于或等于${validateMin}的数字`;
    }

    if (value == "") {
      callback();
    } else if ((validateMax !== null && validateMax < Number(value)) || (validateMin !== null && validateMin > Number(value))) {
      let errMsg = this.props.item.validate.customMessage;
      isStringValid(errMsg) ? callback(errMsg) : callback(defaultErrMsg);
    } else if (this.props.submittedData && this.props.submittedData.indexOf(value) > -1) {
      callback(`${this.props.item.label}已存在，请重新输入一个值`);
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator, item } = this.props;

    let errMsg = this.props.item.validate.customMessage;

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
              validator: this.checkNumber
            },
            {
              required:
                isValueValid(item.validate.required)
                  ? item.validate.required
                  : false,
              message: `${item.label}不能为空`
            }
          ]
        })(<Input type="number" />)}
      </Form.Item>
    );
  }
}
