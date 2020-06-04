import React from "react";
import ComponentBox from "../componentBox";
import { ComponentHeader } from "../utils/commonDom";
import { Checkbox, Select } from "antd";

export default class CheckboxInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    props.type = "text";
    props.className = "form-control";
    props.name = this.props.data.field_name;
    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }
    let classNames = "checkbox-label";
    let checkGroupLayout = this.props.data.inline
      ? "row-layout"
      : "column-layout";

    let baseClasses = "SortableItem rfb-item";
    if (this.props.data.pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }

    if (this.props.read_only) {
      props.disabled = "disabled";
    }
    const { values } = this.props.data;

    return (
      <ComponentBox
        {...this.props}
        className={baseClasses}
        content={
          <>
            <ComponentHeader {...this.props} />
            <div className="form-group">
              <select
                style={{
                  marginTop: 10,
                  width: "100%",
                  height: 34,
                  color: "rgba(0, 0, 0, 0.65)",
                  fontSize: 14,
                  backgroundColor: "#fff",
                  border: "1px solid rgb(204, 204, 204)"
                }}
              >
                <option>&nbsp;&nbsp;请选择</option>
              </select>
            </div>
          </>
        }
      />
    );
  }
}
