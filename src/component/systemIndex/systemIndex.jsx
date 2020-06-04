import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, Icon } from "antd";
import Swiper from "swiper";
import Header from "../header/header";
import Login from "../login/loginx";
import Register from "../login/register";
import SwiperCard from "./components/swiperCard";
import { swiperData, footData } from "./utils/indexData";
import {connect} from "react-redux";
class SystemIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loginVisible: false, 
      registerVisible: false,
      isPageTop:true
    };
  }
  handleOk = (e) => {
    this.setState({
      loginVisible: false,
      registerVisible: false,
    });
  };
  handleCancel = (e) => {
    this.setState({
      loginVisible: false,
      registerVisible: false,
    });
  };
  makeJumpRout = (route) => {
    if (this.props.userConfig) {
      this.props.history.push(route);
    } else {
      this.setState({ loginVisible: true });
    }
  };
  componentDidMount() {
    //可以加上你需要的条件等，然后生成Swiper对象，
    //一定要检查是不是每次都生成了Swiper对象，否则可能出现不滑动的情况和别的情况等
    // new Swiper(".swiper-container", {
    //   autoplay: true, //自动 切换
    //   loop: true, // 循环模式选项
    //   // 如果需要分页器
    //   // pagination: {
    //   //   el: ".swiper-pagination",
    //   // },
    //   // 如果需要前进后退按钮
    //   // navigation: {
    //   //   nextEl: ".swiper-button-next",
    //   //   prevEl: ".swiper-button-prev",
    //   // },
    //   // 如果需要滚动条
    //   // scrollbar: {
    //   //   el: ".swiper-scrollbar"
    //   // },
    //   observer: true, //修改swiper自己或子元素时，自动初始化swiper
    //   observeParents: true, //修改swiper的父元素时，自动初始化swiper
    // });
    document.onmousewheel = () => {
        this.setState({isPageTop:document.body.scrollTop<200})
    }
  }
  componentWillUnmount(){
    document.onmousewheel = null;
  }

  render() {
    const modalProps = {
      showLoginModal: () => {
        this.setState({
          loginVisible: true,
          registerVisible: false,
        });
      },
      showRegisterModal: () => {
        this.setState({
          loginVisible: false,
          registerVisible: true,
        });
      },
    };
    return (
      <>
        <Modal
          title={this.state.loginVisible ? "请登录" : "注册"}
          visible={this.state.loginVisible || this.state.registerVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered
          wrapClassName={this.state.loginVisible ? "LoginModal" : "RegisterModal"}
          footer={null}
        >
          {this.state.loginVisible ? (
            <Login {...modalProps} handleOk={this.handleOk}/>
          ) : (
            <Register {...modalProps} handleOk={this.handleOk}/>
          )}
        </Modal>
        <Header {...modalProps} isPageTop={this.state.isPageTop}/>
        <div className="inForContainer">
          <div className="inforContent">
            <p className="inforTitle">它不止是问卷调查</p>
            <div className="inforBtnGroup">
              <div
                className="inforBtn"
                onClick={() => {
                  this.makeJumpRout("/formbuild");
                }}
              >
                <span>创建问卷</span>
                <Icon type="plus" />
              </div>
              <div
                className="inforBtn"
                onClick={() => {
                  this.makeJumpRout("/formList");
                }}
              >
                <span>问卷列表</span>
                <Icon type="menu" />
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-container">
          {/* <div className="swiper-wrapper"> */}
            {swiperData.map((item,index) => (
              // <div key={item.img} className="swiper-slide">
                <SwiperCard {...item} key={index} index={index}/>
              // </div>
            ))}
          {/* </div> */}
          {/* <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-scrollbar"></div> */}
        </div>
        <div className="footContainer">
          <div className="partOne">
            <div className="productLogoContainer">
              <div className="productLogo">
                <span>Osborn问卷</span>
                <span>email:1454030137@qq.com</span>
              </div>
            </div>
            {footData.map((infor, index) => (
              <div key={index} className="companyInfoContainer">
                <div className="companyInfo">
                  <span className="companyInfoTitle">{infor.inforTitle}</span>
                  <ul>
                    {infor.inforList.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <div className="FlexBlank" />
          </div>
          <div className="partTwo">
            <div className="copyrightInfo">
              <span>版权所有：1454030137&nbsp;&nbsp;osborn&nbsp;&nbsp;dyy</span>
            </div>
            <div className="copyrightInfo">
              <span>-四川师范大学-</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(connect(
  store => ({
    userConfig:store.login.userConfig
  }),{

  }
)(SystemIndex));
