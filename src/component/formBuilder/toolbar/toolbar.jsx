import React from "react";
import ToolbarItem from "./tollbarItem";
import ID from "../../../utils/UUID";
// import store from '../../../stores/store';
import { create } from "../redux/action";
import { connect } from "react-redux";
import { Divider, Icon } from "antd";

class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    const questionnaireItems = this.props.items
      ? this.props.items
      : this._questionnaireItems();
    const dataItems = this.props.items
      ? this.props.items
      : this._dataItems();
    this.state = {
      questionnaireItems,
      dataItems,
      store: props.data
    };

    this.create = this.create.bind(this);
  }

  _buildDefaultProp(customProps) {
    return {
      ...customProps,
      autofocus: false,
      hidden: false,
      input: true
    };
  }

  //问卷相关的组件
  _questionnaireItems() {
    return [
      this._buildDefaultProp({
        inputType: "radio",
        label: "单选",
        tooltip: "",
        type: "RadioButtons",
        defaultValue: "",
        inline: false,
        validate: {
          required: true,
          customMessage: ""
        },
        icon: ["radio", 14],
        values: [{ value: "选项", label: "选项", shortcut: "" }]
      }),
      this._buildDefaultProp({
        label: "下拉单选",
        tooltip: "",
        type: "DropDown",
        defaultValue: "",
        validate: {
          required: true,
          customMessage: ""
        },
        icon: ["dropdown", 16],
        data: {
          values: [
            {
              value: "选项",
              label: "选项"
            }
          ],
          custom: "",
          json: "",
          resource: "",
          url: ""
        },
        dataSrc: "values"
      }),
      this._buildDefaultProp({
        label: "多选",
        tooltip: "",
        type: "CheckboxInput",
        inline: false,
        validate: {
          required: true,
          customMessage: ""
        },
        values: [
          {
            value: "选项",
            label: "选项",
            shortcut: ""
          }
        ],
        icon: ["checkbox", 16]
      }),
      //********************************************新添加组件 */
      this._buildDefaultProp({
        label: "下拉多选",
        tooltip: "",
        type: "MultiDropDown",
        inline: false,
        validate: {
          required: true,
          customMessage: ""
        },
        values: [
          {
            value: "选项",
            label: "选项",
            shortcut: ""
          }
        ],
        icon: ["dropdown", 16]
      }),
      this._buildDefaultProp({
        label: "评分",
        tooltip: "",
        type: "ScoreInput",
        inline: false,
        validate: {
          required: true,
          customMessage: ""
        },
        icon: ["score", 18]
      }),
    ];
  }

  //数据相关的组件
  _dataItems() {
    return [
      this._buildDefaultProp({
        inputFormat: "plain",
        label: "单行文本",
        placeholder: "",
        tooltip: "",
        type: "SingleText",
        defaultValue: "",
        unique: false,
        validate: {
          required: true,
          customMessage: "",
          maxLength: null,
          minLength: null
        },
        icon: ["text", 16]
      }),
      this._buildDefaultProp({
        inputType: "number",
        label: "数字",
        placeholder: "",
        tooltip: "",
        type: "NumberInput",
        defaultValue: "",
        validate: {
          required: true,
          customMessage: "",
          max: null,
          min: null
        },
        icon: ["number", 19]
      }),
      this._buildDefaultProp({
        inputFormat: "plain",
        inputType: "text",
        inputMask: "",
        label: "身份证号码",
        placeholder: "",
        tooltip: "",
        type: "IdCardInput",
        defaultValue: "",
        unique: false,
        validate: {
          required: true,
          customMessage: ""
        },
        icon: ["idcard", 23]
      }),
      this._buildDefaultProp({
        inputType: "tel",
        inputMask: "",
        inputFormat: "plain",
        label: "手机号",
        tooltip: "",
        type: "PhoneInput",
        defaultValue: "",
        placeholder: "",
        unique: false,
        validate: {
          required: true,
          customMessage: ""
        },
        icon: ["phone", 16]
      }),
      this._buildDefaultProp({
        inputFormat: "plain",
        inputType: "email",
        label: "Email",
        placeholder: "",
        tooltip: "",
        type: "EmailInput",
        defaultValue: "",
        validate: {
          required: true,
          customMessage: "",
          maxLength: null,
          minLength: null
        },
        icon: ["email", 18]
      }),
      // **************************************新添加组件
      // this._buildDefaultProp({
      //   label: "附件",
      //   imageSize: "200",
      //   tooltip: "",
      //   filePattern: "*",
      //   fileSize: "2",
      //   fileUnit: "MB",
      //   fileCount: "1" ,
      //   type: "FileUpload",
      //   storage: "base64",
      //   validate: {
      //     required: false,
      //     customMessage: ""
      //   },
      //   icon: ["file", 18]
      // }),
      // this._buildDefaultProp({
      //   label: "图片",
      //   imageSize: "200",
      //   tooltip: "",
      //   filePattern: "*",
      //   fileSize: "2",
      //   fileUnit: "MB",
      //   fileCount: "1" ,
      //   type: "ImageUpload",
      //   storage: "base64",
      //   validate: {
      //     required: false,
      //     customMessage: ""
      //   },
      //   icon: ["image", 18]
      // }),
      this._buildDefaultProp({
        inputFormat: "plain",
        inputType: "email",
        label: "日期",
        placeholder: "",
        tooltip: "",
        type: "DateInput",
        defaultValue: "",
        validate: {
          required: true,
          customMessage: "",
          maxLength: null,
          minLength: null
        },
        icon: ["date", 18]
      }),
    ];
  }

  create(item) {
    let key = ID.uuid();

    let elementOptions = {
      ...item,
      id: key,
      key: key,
      layout: { i: key, x: 2, y: 0, w: 8, h: 3, minH: 2, minW: 2 },
      element: item.type
    };

    return elementOptions;
  }

  render() {
    return (
      <div className="react-form-builder-toolbar">
        <p><Icon type="form" />&nbsp;&nbsp;问卷组件</p>
        <ul>
          {this.state.questionnaireItems.map((item, i) => (
            <ToolbarItem
              data={item}
              key={`toolbarItem${i}`}
              onCreate={this.create}
            />
          ))}
        </ul>
        <Divider/>
        <p><Icon type="bar-chart"/>&nbsp;&nbsp;数据组件</p>
        <ul>
          {this.state.dataItems.map((item, i) => (
            <ToolbarItem
              data={item}
              key={`toolbarItem${i}`}
              onCreate={this.create}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  store => ({
    data: store.formBuilder
  }),
  {
    create
  }
)(Toolbar);
