import React from "react";
import { Input, Radio, Checkbox, Button } from "antd";
import { connect } from "react-redux";
import { setItemAttr, setCalcLayout } from "../../redux/action";

class CheckboxInspector extends React.Component {
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
      value: `选项`,
      shortcut: ""
    };
    const newValuesList = [...this.props.element.values, newItem];
    this.props.setItemAttr(this.props.element, "values", newValuesList);
  }
  deleteChooseItem(index) {
    let newValuesList = this.props.element.values.filter((item,i) => i!=index);
    this.props.setItemAttr(this.props.element, "values", newValuesList);
  }
  changeChooseItem(item, ev) {
    const { value } = ev.target;
    const newItem = {
      value: value,
      label: value,
      shortcut: ""
    };
    let newValuesList = [...this.props.element.values];
    let index = newValuesList.indexOf(item);
    newValuesList[index] = newItem;
    this.props.setItemAttr(this.props.element, "values", newValuesList);
  }

  // componentDidUpdate() {
  //   if (this.props.isCalcLayout) {
  //     let domElement = document.getElementById(this.props.element.key);

  //     const newLayout = {
  //       ...this.props.element.layout,
  //       h: Math.floor((domElement.offsetHeight) / 30)
  //     }
  //     this.props.setItemAttr(this.props.element, "layout", newLayout);

  //     this.props.setCalcLayout(false);
  //   }

  // }

  render() {
    const { label, validate, values, inline } = this.props.element;
    return (
      <div className="base-form-tool" key={Math.random()}>
        <p htmlFor="checkbox-title">标题</p>
        <Input
          id="checkbox-title"
          name="label"
          placeholder="下拉多选"
          value={label}
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
    data: store.formBuilder.data,
    isCalcLayout: store.formBuilder.isCalcLayout
  }),
  {
    setItemAttr,
    setCalcLayout
  }
)(CheckboxInspector);
