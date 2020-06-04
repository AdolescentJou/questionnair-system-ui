import React from "react";
import {
  Form,
  Icon,
  Checkbox,
  Tooltip
} from "antd";
import { isValueValid } from "../../../utils/valueUtils";

export default class CheckboxInput extends React.Component {
  render() {
    const { getFieldDecorator, item } = this.props;

    const { values } = item;
    let errMsg = this.props.item.validate.customMessage;
    const layoutClassName = this.props.item.inline ? "row-layout" :"column-layout";
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
          <Checkbox.Group className = {layoutClassName}>
            {values.map((item, index) => (
                <Checkbox 
                className = 'checkbox-span'       
                 key={index} 
                 value={item.value}
                 >
                   {item.label}
                </Checkbox>
            ))}
          </Checkbox.Group>
        )}
      </Form.Item>
    );
  }
}
