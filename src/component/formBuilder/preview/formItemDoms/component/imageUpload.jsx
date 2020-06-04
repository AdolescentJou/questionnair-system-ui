import React, { Component } from 'react'
import ComponentBox from '../componentBox';
import { ComponentHeader } from '../utils/commonDom';
import { Input,Icon } from 'antd';

export default class EmailInput extends Component {
    constructor(props) {
        super(props);
        this.inputField = React.createRef();
    }

    render() {
        const props = {};
        props.type = 'number';
        props.className = 'form-control';
        props.name = this.props.data.field_name;

        if (this.props.mutable) {
            props.defaultValue = this.props.defaultValue;
            props.ref = this.inputField;
        }

        if (this.props.read_only) {
            props.disabled = 'disabled';
        }

        let baseClasses = 'SortableItem rfb-item';
        if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

        return (
            <ComponentBox
                {...this.props}
                className={baseClasses}
                content={
                    <>
                        <ComponentHeader {...this.props} />
                        <div className="form-group">
                        <div className="image-upload-container">
                            <Icon type="plus-circle" theme="filled" />
                            点击添加图片
                        </div>
                        </div>
                    </>
                }
            />
        );
    }
}
