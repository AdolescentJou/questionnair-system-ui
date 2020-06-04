import React from 'react';
import ComponentBox from '../componentBox';
import { ComponentHeader} from '../utils/commonDom';
import {Checkbox,Rate} from 'antd';

export default class CheckboxInput extends React.Component {
    constructor(props) {
        super(props);
        this.inputField = React.createRef();
    }

    render() {
        const props = {};
        props.type = 'text';
        props.className = 'form-control';
        props.name = this.props.data.field_name;
        if (this.props.mutable) {
            props.defaultValue = this.props.defaultValue;
            props.ref = this.inputField;
        }
        let classNames = 'checkbox-label';
        let checkGroupLayout = this.props.data.inline ? "row-layout":"column-layout";

        let baseClasses = 'SortableItem rfb-item';
        if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

        if (this.props.read_only) {
            props.disabled = 'disabled';
        }
        const {values} = this.props.data;
        
        return (
            <ComponentBox
                {...this.props}
                className={baseClasses}
                content={
                    <>
                        <ComponentHeader {...this.props} />
                        <div className="form-group">
                            <div className="scoreInpurContainer">
                                <Rate allowHalf></Rate>
                            </div>
                        </div>
                    </>
                }
            />
        );
    }
}
