import React from "react";
import {
  Form,
  Icon,
  Checkbox,
  Tooltip,
  Rate
} from "antd";
import { isValueValid } from "../../../utils/valueUtils";

export default class CheckboxInput extends React.Component {
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
              required: isValueValid(item.validate.required)
              ? item.validate.required
              : false,
              message: "此字段为必填"
            }
          ]
        })(
          <Rate allowHalf/>
        )}
      </Form.Item>
    );
  }
}
