import React from "react";
import { isValueValid, isStringValid } from "../../../utils/valueUtils";
import { Input, Form, Tooltip } from "antd";

export default class SingleInput extends React.Component {
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
              required:
                isValueValid(item.validate.required)
                  ? item.validate.required
                  : false,
              message: isStringValid(errMsg) ? errMsg : "此项不能为空！"
            }
          ]
        })(<Input />)}
      </Form.Item>
    );
  }
}
