import axios from "axios";
import { message } from "antd";
import config from "../../../config/config";
import { instanceAxios, initToken } from "../../../utils/tokenUtils";

export const GET_FORM_DATA = "GET_FORM_DATA";
export const RECEIVED_FORM_DATA = "RECEIVED_FORM_DATA";
export const RECEIVED_FORM_ALLDATA = "RECEIVED_FORM_ALLDATA";
export const CLEAR_FORM_DATA = "CLEAR_FORM_DATA";
export const CLEAR_FORM_DETAIL = "CLEAR_FORM_DETAIL";
export const GET_FORM_DETAIL = "GET_FORM_DETAIL";
export const RECEIVED_FORM_DETAIL = "RECEIVED_FORM_DETAIL";
export const DELETE_FORM_DATA = "DELETE_FORM_DATA";

var getSubmissionDataTotal = resp => {
  let contentRangeValue = resp.headers["content-range"];
  const index = contentRangeValue.indexOf("/");
  return Number(contentRangeValue.substr(index + 1));
};

export const getSubmissionData = (formId, pageSize, currentPage) => dispatch => {

  dispatch({
    type: "GET_FORM_DATA"
  });
  axios.get(config.apiUrl + `/form/${formId}`).then(res => {
    let forms = res.data;
    instanceAxios
      .get(config.apiUrl + `/form/${formId}/submission?limit=${pageSize}&skip=${(currentPage - 1) * pageSize}`, {
        headers: {
          "X-Custom-Header": "ProcessThisImmediately",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        dispatch({
          type: RECEIVED_FORM_DATA,
          forms,
          submissionDataTotal: getSubmissionDataTotal(res),
          formData: res.data.map(item => {
            return {
              id: item._id,
              data: item.data
            };
          })
        });
      });
  });
};

export const getAllSubmissionData = formId => dispatch => {
  dispatch({
    type: "GET_FORM_DATA"
  });
  axios.get(config.apiUrl + `/form/${formId}`).then(res => {
    let forms = res.data;
    instanceAxios
      .get(config.apiUrl + `/form/${formId}/submission`, {
        headers: {
          "X-Custom-Header": "ProcessThisImmediately",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        dispatch({
          type: RECEIVED_FORM_ALLDATA,
          forms,
          submissionDataTotal: getSubmissionDataTotal(res),
          formAllData: res.data.map(item => {
            return {
              id: item._id,
              data: item.data
            };
          })
        });
      });
  });
}

// 获得表单数据详情
export const getFormDetail = id => dispatch => {
  dispatch({
    type: GET_FORM_DETAIL
  });

  axios
    .get("http://localhost:8000/mock/formDetailMock.json")
    .then(res => {
      dispatch({
        type: RECEIVED_FORM_DETAIL,
        formDetail: res.data.data
      });
    })
    .catch(err => {
      console.warn(err);
    });
};

export const deleteFormData = (
  formId,
  submissionId,
  getSubmissionData
) => dispatch => {
  instanceAxios({
    url: config.apiUrl + `/form/${formId}/submission/${submissionId}`,
    method: "DELETE",
    headers: {
      "X-Custom-Header": "ProcessThisImmediately",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      getSubmissionData(formId);
    })
    .catch(err => {
      console.log(err);
    });
};

// 清空表单数据
export const clearFormData = () => {
  return {
    type: CLEAR_FORM_DATA
  };
};

// 清空表单数据详情的数据
export const clearFormDetail = () => {
  return {
    type: CLEAR_FORM_DETAIL
  };
};
