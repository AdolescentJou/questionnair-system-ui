import {
  LOGIN_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_LOADING,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  GET_ALL_EMAIL,
  SET_VCODE_MSG
} from "./action";
const initialState = {
  loginStatus: null,
  loginConfig:null,
  vCodeMsg:"",
  allEmails:[],
  userConfig:null
};
export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loginStatus: "loginLoading"
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginStatus: "loginFail"
      };
    case LOGIN_SUCCESS:
      window.onunload = function () {
        sessionStorage.setItem("userConfig", JSON.stringify(action.userConfig));
      };
      return {
        ...state,
        loginStatus: "loginSuccess",
        userConfig:action.userConfig
      };
    case LOGOUT_LOADING:
      return {
        ...state,
        loginStatus: "logoutLoading"
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loginStatus: "logoutFail"
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loginStatus: "logoutSuccess",
        userConfig:null
      };
    case GET_ALL_EMAIL:
      return {
        ...state,
        allEmails:action.allEmails
      }
    case  SET_VCODE_MSG:
      return {
        ...state,
        vCodeMsg:action.vCodeMsg
      }
    default:
      return state;
  }
}
