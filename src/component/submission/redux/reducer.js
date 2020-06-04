import axios from 'axios';
import {
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    POST_SURVEY_SUCCESS,
    POST_SURVEY_FAIL,
    GET_FORM_COMPONENT,
    getSuccessAction,
    getFailAction,
    postSuccessAction,
    postFailAction,
} from './action';
import ActionButton from 'antd/lib/modal/ActionButton';


export const initialState = {
    isGetProductList: false,
    productList:[],
    isPostDataSuccess:false,
    formComponent: {
      components:[]
    }
};
  
  export default function SurveyReducer(state = initialState, { type, data, }) {
    switch (type) {
      case GET_FORM_COMPONENT: {
        return {
          ...state,
          formComponent: data
        }
      }
      case GET_PRODUCT_SUCCESS:
        return {
          productList:data.productList,
          isGetProductList: true,
        };
      case GET_PRODUCT_FAIL:
        return {
          ...state,
          isGetProductList: false,
        }
      case POST_SURVEY_SUCCESS:
          return {
            ...state,
            isPostDataSuccess:true
          }
      case POST_SURVEY_FAIL:
          return {
            ...state,
            isPostDataSuccess:false
          }
      default:
        return state;
    }
  }
  