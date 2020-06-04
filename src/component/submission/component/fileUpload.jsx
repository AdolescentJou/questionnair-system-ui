import React from 'react'
import { isValueValid } from "../../../utils/valueUtils";
import { Input, Form, Tooltip, Icon } from "antd";
import FileUploadItem from "./fileUploadItem";
export default class FileUpload extends React.Component {
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
              required: isValueValid(item.validate.required)
              ? item.validate.required
              : false,
              message: "文件上传不能为空!"
            }
          ]
        })(<FileUploadItem item={item}/>)}
      </Form.Item>
    );
  }
}
