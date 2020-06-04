import React from "react";
import { Form, Radio, Tooltip, Icon } from "antd";

export default class radioInput extends React.Component {
  render() {
    const { getFieldDecorator, item } = this.props;

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
          rules: [{ required: true, message: "请选择一个选项" }]
        })(
          <Radio.Group className = {layoutClassName}>
            {item.values.map((option, index) => (
              <Radio
              className="radiobox-span"
                key={index}
                value={option.value}
              >
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        )}
      </Form.Item>
    );
  }
}
