import {
  GET_FORM_DATA,
  RECEIVED_FORM_DATA,
  RECEIVED_FORM_ALLDATA,
  CLEAR_FORM_DATA,
  CLEAR_FORM_DETAIL,
  GET_FORM_DETAIL,
  RECEIVED_FORM_DETAIL,
} from "./action";

const initState = {
  formData: [], // 用户提交的所以数据
  formAllData:[], 
  formDetail: [], // 一条数据的具体信息
  formHeader: [],
  forms: {components:[]},
  formDataLoading: false,
  formDetailLoading: false,
  submissionDataTotal:0,
};

const formSubmitDataReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_FORM_DATA: {
      return {
        ...state,
        formDataLoading: true
      };
    }

    case RECEIVED_FORM_DATA: {
      return {
        ...state,
        formDataLoading: false,
        token: action.token,
        formData: action.formData,
        forms: action.forms,
        submissionDataTotal: action.submissionDataTotal,
      };
    }

    case RECEIVED_FORM_ALLDATA:{
      return {
        ...state,
        formDataLoading: false,
        token: action.token,
        // formData: action.formData,
        formAllData: action.formAllData,
        forms: action.forms,
        submissionDataTotal: action.submissionDataTotal,
      };
    }

    case CLEAR_FORM_DATA: {
      return {
        ...state,
        formData: []
      };
    }

    case GET_FORM_DETAIL: {
      return {
        ...state,
        formDetailLoading: true
      };
    }

    case RECEIVED_FORM_DETAIL: {
      return {
        ...state,
        formDetailLoading: false,
        formDetail: action.formDetail
      };
    }

    case CLEAR_FORM_DETAIL: {
      return {
        ...state,
        formDetail: []
      };
    }
    default: {
      return state;
    }
  }
};

export default formSubmitDataReducer;
