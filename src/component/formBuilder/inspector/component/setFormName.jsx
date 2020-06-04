import React from "react";
import { connect } from "react-redux";
import { Input, Checkbox } from "antd";
import { setFormName } from "../../redux/action";

class FormName extends React.PureComponent {
  handleChangeName = ev => {
    let { value } = ev.target;
    this.props.setFormName(value);
  };

  render() {
    const { name } = this.props;
    return (
      <div className="base-form-tool">
        <p htmlFor="email-title">标题</p>
        <Input
          name="formName"
          placeholder="请输入表单名"
          value={name}
          onChange={this.handleChangeName}
        />
      </div>
    );
  }
}

export default connect(
  store => ({
    name: store.formBuilder.name
  }),
  {
    setFormName
  }
)(FormName);
