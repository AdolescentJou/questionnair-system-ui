import React ,{Fragment}from "react";
import { Card, Button,Popconfirm,Icon } from "antd";
import { withRouter } from "react-router-dom";
import { deleteForm } from "../redux/action";
import { connect } from "react-redux";
import config from "../../../config/config";
class FormCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleRouterPush = router => {
    const { _id } = this.props.form;
    if(router == "/submission"){
      window.open(config.hostUrl+'/submission?id='+_id,'_blank');  
    }else{
      this.props.history.push(router+`?id=${_id}`);
    }
  }
  
  handleDeleteForm = key => {
    this.props.deleteForm(key);
  };
  render() {
    const { _id,created ,modified,name} = this.props.form;
    
    return (
      <div>
        <Card
          title={<span><Icon type="book" />&nbsp;{name}</span>}
          extra={
            <Popconfirm
              placement="bottom"
              title={
              <Fragment>
                <p>确定要删除该问卷？</p>
                <p> 删除问卷会将问卷的所有提交数据删除 </p>
              </Fragment>
              }
              onConfirm={() => {
                this.handleDeleteForm(_id);
              }}
              okText="确定"
              cancelText="取消"
            >
              <a><Icon type="delete" />&nbsp;删除问卷</a>
            </Popconfirm>
          }
        >
        <div className="timeGroupContainer">
          <span>创建时间:&nbsp;{created}</span>
          <span>修改时间:&nbsp;{modified}</span>
        </div>
        <div className="btnGroupContainer">
          <Button onClick={()=>{this.handleRouterPush('/layout')}} type="link"><Icon type="build" />布局</Button>
          <Button onClick={()=>{this.handleRouterPush('/formbuild')}} type="link"><Icon type="edit" />编辑</Button>
          <Button onClick={()=>{this.handleRouterPush('/submission')}} type="link"><Icon type="form" />提交</Button>
          <Button onClick={()=>{this.handleRouterPush('/submitdata/dataTable')}} type="link"><Icon type="bar-chart" />数据</Button>
        </div>
        </Card>
      </div>
    );
  }
}

export default withRouter(connect(store => ({}), { deleteForm })(FormCard));
