import config from "../../../config/config";
import { message } from "antd";
import { instanceAxios } from "../../../utils/tokenUtils";

export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_FAIL = "GET_PRODUCT_FAIL";
export const POST_SURVEY_SUCCESS = "POST_SURVEY_SUCCESS";
export const POST_SURVEY_FAIL = "POST_SURVEY_FAIL";
export const GET_FORM_COMPONENT = "GET_FORM_COMPONENT";

export const submitSubmission = (formId, values,callback,push) => dispatch => {
  instanceAxios({
    url: config.apiUrl + `/form/${formId}/submission?live=1`,
    method: "POST",
    headers: {
      "X-Custom-Header": "ProcessThisImmediately",
      "Content-Type": "application/json"
    },
    data: {
      data: values,
      state: "submitted"
    }
  })
    .then(response => {
      callback();
      push('/submissionTip');
    })
    .catch(err => {
      console.log(err);
    });
};

export const submitLayout = (layoutArray, formComponent) => dispatch => {
  let componentArray = formComponent.components.map(item => {
    let targetLayout = layoutArray.filter(layout => {
      return layout.i == item.key;
    });
    return {
      ...item,
      layout: targetLayout[0]
    };
  });
  let formData = {
    components: componentArray
  };

  instanceAxios({
    url: config.apiUrl + `/${formComponent.path}`,
    method: "PUT",
    headers: {
      "X-Custom-Header": "ProcessThisImmediately",
      "Content-Type": "application/json"
    },
    data: formData
  })
    .then(response => {
      message.success("设置成功!");
      setTimeout(() => {
        location.href = config.hostUrl+'/formList';
      }, 1000);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getSuccessAction = data => {
  return {
    type: GET_PRODUCT_SUCCESS,
    data
  };
};

export const getFormComponent = id => dispatch => {
  instanceAxios
    .get(config.apiUrl + "/form/" + id)
    .then(res => {
      dispatch({
        type: GET_FORM_COMPONENT,
        data: res.data
      });
    })
    .catch(err => {
      console.error(err);
    });
};

export const getFailAction = () => {
  return {
    type: GET_PRODUCT_FAIL
  };
};

export const postSuccessAction = () => {
  return {
    type: POST_SURVEY_SUCCESS
  };
};

export const postFailAction = () => {
  return {
    type: POST_SURVEY_FAIL
  };
};
