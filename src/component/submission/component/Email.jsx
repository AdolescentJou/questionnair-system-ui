import React from 'react'
import { isValueValid } from "../../../utils/valueUtils";
import { Input, Form, Tooltip, Icon } from "antd";

export default class Email extends React.Component {
  checkUnique =  (rule, value, callback) =>{
    if (value == "") {
      callback();
    }else if(this.props.submittedData && this.props.submittedData.indexOf(value) > -1) {
      callback(`${this.props.item.label}已存在，请重新输入一个值`);
    }
    else {
      callback();
    }
  }
  render() {
    const { getFieldDecorator, item } = this.props;

    let errMsg = item.validate.customMessage || "";

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
              validator: this.checkUnique
            },
            {
              type: "email",
              message: errMsg || "请输入正确的邮箱！"
            },
            {
              required: isValueValid(item.validate.required)
              ? item.validate.required
              : false,
              message: "邮箱不能为空!"
            }
          ]
        })(<Input />)}
      </Form.Item>
    );
  }
}
