import React from 'react';
import xss from 'xss';
import HeaderBar from './headerBar';

const myxss = new xss.FilterXSS({
    whiteList: {
        u: [],
        br: [],
        b: [],
        i: [],
        ol: ['style'],
        ul: ['style'],
        li: [],
        p: ['style'],
        sub: [],
        sup: [],
        div: ['style'],
        em: [],
        strong: [],
        span: ['style'],
    },
});

const ComponentLabel = (props) => {
    const hasRequiredLabel = (props.data.hasOwnProperty('required') && props.data.required === true && !props.read_only);

    return (
        <label className={props.className || ''}>
            <span dangerouslySetInnerHTML={{ __html: myxss.process(props.data.label) }} />
            {
                hasRequiredLabel &&
                <span className="label-required label label-danger">Required</span>
            }
        </label>
    );
};

const ComponentHeader = (props) => {
    if (props.mutable) {
        return null;
    }
    return (
        <div>
            {props.data.pageBreakBefore &&
                <div className="preview-page-break">Page Break</div>
            }
            <HeaderBar
                parent={props.parent}
                editModeOn={props.editModeOn}
                data={props.data}
                onDestroy={props._onDestroy}
                onEdit={props.onEdit}
                static={props.data.static}
                required={props.data.required}
                tip={props.data.tip} 
            />
        </div>
    );
};

export { ComponentHeader, ComponentLabel };