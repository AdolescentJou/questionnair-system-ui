import React from "react";
import { Button, Pagination, Spin ,Icon,Empty} from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteForm, getForms } from "./redux/action";
import { initToken } from "../../utils/tokenUtils";
import Header from "../header/header";
import FormCard from "./components/formCard";
import Footer from "../base/footer";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 6
    };
  }

  onChangePages = (current, pageSize) => {
    this.setState({
      pageSize,
      currentPage: current
    });
    this.props.getForms(pageSize, current,this.props.userConfig.email);
  };

  componentDidMount() {
    const {email,password} = this.props.userConfig;
    initToken(email,password)
      .then(() => {
        this.props.getForms(this.state.pageSize, this.state.currentPage,this.props.userConfig.email);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <>
        <Header />
        <div className="FormListNav">
          <div className="NavTitle">问卷列表</div>
          <div className="flexBlank" />
          <div className="NavBtn">
            <Button type="primary">
              <Link to="/formbuild"><Icon type="plus"/>创建问卷</Link>
            </Button>
            <Button type="primary">
              <Link to="/index">返回首页</Link>
            </Button>
          </div>
        </div>
        <div className="FormCardListContainer">
          {this.props.forms.length == 0 ? (
            <div style={{textAlign:"center",marginTop:200}}><Empty /></div>
          ) : (
            this.props.forms.map(item => (
              <FormCard form={item} key={item._id} />
            ))
          )}
          {this.props.total > 6 && (
            <Pagination
              onChange={this.onChangePages}
              defaultCurrent={this.state.currentPage}
              total={Math.ceil(this.props.total)}
              pageSize={this.state.pageSize}
            />
          )}
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    forms: state.forms.formArray,
    total: state.forms.total,
    userConfig:state.login.userConfig
  };
};

export default connect(mapStateToProps, {
  deleteForm,
  getForms
})(Home);
