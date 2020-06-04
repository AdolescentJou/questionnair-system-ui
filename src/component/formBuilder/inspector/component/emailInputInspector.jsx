import React from 'react';
import { Input, Checkbox  } from 'antd';
import { connect } from 'react-redux';
import { setItemAttr } from '../../redux/action';


class EmailInputInspector extends React.PureComponent {

  handleChangeAttr = (ev) => {
    this.props.setItemAttr(this.props.element, ev.target.name, ev.target.value);
  }

  render() {
    return (
        <div className="base-form-tool">
            <p htmlFor="email-title">标题</p>
            <Input id="email-title" placeholder="Email" name="text" onChange={this.handleChangeAttr} />

            <p htmlFor="email-tip">提示信息</p>
            <Input id="email-tip" placeholder="请输入提示信息" />

            <p htmlFor="email-err-tip">错误提示</p>
            <Input id="email-err-tip" placeholder="请输入错误提示" />

            <p htmlFor="email-default-value">默认值</p>
            <Input id="email-default-value" placeholder="请输入默认值" />

            <p htmlFor="email-tip">校验</p>
            <div className="checkbox-wrapper">
              <Checkbox>必填</Checkbox>
              <Checkbox>不允许重复</Checkbox>
              <Checkbox>格式校验</Checkbox>
            </div>
        </div>
    );
  }
}
export default connect(
  store => ({

  }),
  {
    setItemAttr
  }
)(EmailInputInspector)
