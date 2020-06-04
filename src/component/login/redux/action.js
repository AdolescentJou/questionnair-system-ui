import axios from "axios";
import config from "../../../config/config";
import { message } from "antd";

export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const LOGOUT_LOADING = "LOGOUT_LOADING";
export const LOGOUT_FAIL = "LOGOUT_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const GET_ALL_EMAIL = "GET_ALL_EMAIL";
export const SET_VCODE_MSG = "SET_VCODE_MSG";
//登录
export const mockLoginAndSetData = (email, password,callback) => dispatch => {
  dispatch({
      type:LOGIN_LOADING
  });
  axios({
    url: config.apiUrl + "/user/login",
    method: "post",
    data: {
      data: {
        email,
        password
      }
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      dispatch({
        type:LOGIN_SUCCESS,
        userConfig:{
          email,
          password
        }
      });
      // location.href = "/index";
      callback();
    })
    .catch(err => {
      console.error(err);
      message.error("账号或密码错误");
      dispatch({
        type:LOGIN_FAIL
      });
    });
};

//页面刷新获取登录信息
export const setUserConfig = userConfig => dispatch => {
  dispatch({
    type:LOGIN_SUCCESS,
    userConfig
  });
}

//退出登录
export const mockLogoutAndRemoveData = () => dispatch => {
  axios({
    url: config.apiUrl + "/logout",
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      window.onunload = ()=>{};
      dispatch({
        type:LOGOUT_SUCCESS,
      })
    })
    .catch(err => {
      message.error("注销失败");
      console.error(err);
    });
};

//注册
export const registerUser = (name, email, password,callback) => dispatch => {
  axios({
    url: config.apiUrl + "/user/register",
    method: "post",
    data: {
      data: {
        email,
        password,
        name
      }
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      message.success("注册成功", 1);
      callback();
    })
    .catch(err => {
      message.error("注册失败", 1);
      console.error(err);
    });
};

//得到所有用户
export const getAllEmails = () => dispatch => {
  axios({
    url: config.apiUrl + "/user/login",
    method: "post",
    data: {
      data: {
        "email": "123@123.com",
        "password": "123"
      }
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
        axios({
          url: config.apiUrl + "/user/submission",
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "x-jwt-token":response.headers["x-jwt-token"]
          }
        })
          .then(res => {
            dispatch({
              type:GET_ALL_EMAIL,
              allEmails:res.data
            });
          })
          .catch(err => {
            console.error(err);
          });
    })
    .catch(err => {
      console.error(err);
    });
}

//设置验证码
export const setVcodeMsg = vCodeMsg => dispatch => {
  dispatch({
    type:SET_VCODE_MSG,
    vCodeMsg
  })
}

// axios({
//     url: config.apiUrl + "/access",
//     method: "get",
//     data: {
//       ...config.loginData
//     },
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//     .then(response => {
//       let authenticatedId = response.data.roles.authenticated._id;

//       dispatch({
//         type: RECEIVED_ACCESS_DATA,
//         access: [
//           {
//             roles: [
//               response.data.roles.administrator._id,
//               authenticatedId,
//               response.data.roles.anonymous._id
//             ],
//             type: "read_all"
//           }
//         ]
//       });

//       dispatch({
//         type: RECEIVED_SUBMIT_ACCESS,
//         submissionAccess: [
//           { roles: [authenticatedId], type: "create_own" },
//           { roles: [authenticatedId], type: "read_own" },
//           { roles: [authenticatedId], type: "update_own" },
//           { roles: [authenticatedId], type: "delete_own" }
//         ]
//       });
//     })
//     .catch(err => {
//       console.error(err);
//     });