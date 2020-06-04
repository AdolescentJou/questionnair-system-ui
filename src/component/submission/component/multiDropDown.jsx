import React from "react";
import {
  Form,
  Icon,
  Checkbox,
  Tooltip,
  Select
} from "antd";
import { isValueValid } from "../../../utils/valueUtils";

export default class MultiDropDown extends React.Component {
  render() {
    const { getFieldDecorator, item } = this.props;

    const { values } = item;
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
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择"
          >
          {values.map((item, index) => (
              <Select.Option key={index} value={item.value}>{item.label}</Select.Option>
            ))}
          </Select>,
        )}
      </Form.Item>
    );
  }
}
