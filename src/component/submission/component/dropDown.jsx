import React from "react";
import { isValueValid } from "../../../utils/valueUtils";
import { Form, Select, Tooltip, Icon } from "antd";

export default class DropDown extends React.Component {
  render() {
    const { getFieldDecorator, item } = this.props;
    const { values } = this.props.item.data;

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
          <Select placeholder="请选择" style={{ width: '100%' }}>
            {values.map((item, index) => (
              <Select.Option key={index} value={item.value}>{item.label}</Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
