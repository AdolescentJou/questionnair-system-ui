import React from "react";
import { Input, Checkbox, Button } from "antd";
import { connect } from "react-redux";
import { setItemAttr, setItemValues } from "../../redux/action";

class DropdownInspector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addChooseItem = this.addChooseItem.bind(this);
    this.handleChangeAttr = this.handleChangeAttr.bind(this);
  }
  handleChangeAttr(ev) {
    let { name, value, checked } = ev.target;
    const { validate } = this.props.element;
    switch (name) {
      case "customMessage": {
        validate.customMessage = value;
        value = validate;
        break;
      }
      case "required": {
        validate.required = checked;
        value = validate;
        break;
      }
      case "inputMask": {
        checked = checked ? "true" : "";
        break;
      }
    }
    this.props.setItemAttr(
      this.props.element,
      name,
      value != undefined ? value : checked
    );
  }
  addChooseItem() {
    const newItem = {
      label: `选项`,
      value: `选项`
    };
    const newValuesList = [...this.props.element.data.values, newItem];
    this.props.setItemValues(this.props.element, "data", newValuesList);
  }
  deleteChooseItem(index) {
    let newValuesList = this.props.element.values.filter((item,i) => i!=index);
    this.props.setItemValues(this.props.element, "data", newValuesList);

  }
  changeChooseItem(item, ev) {
    const { value } = ev.target;
    const newItem = {
      value: value,
      label: value,
      shortcut: ""
    };
    let newValuesList = [...this.props.element.data.values];
    let index = newValuesList.indexOf(item);
    newValuesList[index] = newItem;
    this.props.setItemValues(this.props.element, "data", newValuesList);
  }
  render() {
    const { label, validate, tooltip } = this.props.element;
    const { values } = this.props.element.data;
    return (
      <div className="base-form-tool">
        <p htmlFor="checkbox-title">标题</p>
        <Input
          id="checkbox-title"
          name="label"
          placeholder="多选框"
          value={label}
          onChange={this.handleChangeAttr}
        />
        <p htmlFor="email-tip">提示信息</p>
        <Input
          id="email-tip"
          name="tooltip"
          placeholder="请输入提示信息"
          value={tooltip}
          onChange={this.handleChangeAttr}
        />
        <p>选项</p>
        <div className="chooseitems">
          {values.map((item, index) => (
            <div className="ChooseItemWarp" key={index}>
              <img src="/image/icons/dragIcon.png" />
              <Input
                type="text"
                onChange={ev => {
                  this.changeChooseItem(item, ev);
                }}
                placeholder="选项"
                value={item.value}
              />
              <img
                src="/image/icons/deleteIcon.png"
                onClick={() => {
                  this.deleteChooseItem(index);
                }}
              />
            </div>
          ))}
          <Button onClick={this.addChooseItem} name="chooseItems" icon="plus">
            增加选项
          </Button>
        </div>
        <p htmlFor="email-tip">校验</p>
        <div className="checkbox-wrapper">
          <Checkbox
            name="required"
            checked={validate.required}
            onChange={this.handleChangeAttr}
          >
            必选
          </Checkbox>
        </div>
      </div>
    );
  }
}

export default connect(
  store => ({
    data: store.formBuilder.data
  }),
  {
    setItemAttr,
    setItemValues
  }
)(DropdownInspector);
