import React from 'react';
import QuestionTip from "../../../../base/questionTip";

export default class HeaderBar extends React.Component {
  handleDestoryComponent = (e) =>{
    this.props.onDestroy(this.props.data);
    this.props.editModeOn({ element: "clearInspector" }, e);
  }
  render() {
    return (
      <div className="toolbar-header">
        <span className="label label-default">{this.props.data.label}
        {
          this.props.data.tooltip ? <QuestionTip tip={this.props.tooltip} show={true} /> : null
        }
        </span>
        {
          this.props.data.validate.required ? <span className="red-star">*</span> : null
        }
        <div className="toolbar-header-buttons">
          {/* {this.props.data.element !== 'LineBreak' &&
            <div className="btn is-isolated btn-school"
              onClick={this.props.editModeOn.bind(this.props.parent, this.props.data)}
            >
              <i className="is-isolated fa fa-clone"></i>
            </div>
          } */}
          <div className="btn is-isolated btn-school"
            onClick={this.handleDestoryComponent}>
            <i className="is-isolated fa fa-trash-o"></i>
          </div>
        </div>
      </div>
    );
  }
}
