import axios from "axios";
import {instanceAxios} from "../../../utils/tokenUtils";
import config from "../../../config/config";
import { message } from "antd";

export const DELETE_FORM = "DELETE_FORM";
export const RECIVE_FORMS = "RECIVE_FORMS";

export const deleteForm = formId => dispatch => {
  instanceAxios({
    url: config.apiUrl + `/form/${formId}`,
    method: "DELETE",
    headers: {
      "X-Custom-Header": "ProcessThisImmediately"
    }
  })
    .then(response => {
      response.data === "OK"
        ? (location.href = config.hostUrl+'/formList')
        : message.success("删除失败！", 2);
    })
    .catch(err => {
      console.log(err);
    });
};

let ignoreFormIdArray = ["user", "admin", "userLogin", "userRegister"];

var formatTime = time => {
  return time < 10 ? "0" + time : time;
};

var convertTime = time => {
  let date = new Date(time);

  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    formatTime(date.getDate()) +
    "  " +
    formatTime(date.getHours()) +
    ":" +
    formatTime(date.getMinutes())
  );
};

var getFormsTotal = resp => {
  let contentRangeValue = resp.headers["content-range"];
  const index = contentRangeValue.indexOf("/");
  return Number(contentRangeValue.substr(index + 1));
};

export const getForms = (pageSize, currentPage,email) => dispatch => {
  axios({
    url:
      config.apiUrl + 
      `/form?owner=${email}&limit=${pageSize}&skip=${(currentPage - 1) * pageSize }`,
      // `/form?limit=${pageSize}&skip=${(currentPage - 1) * pageSize + 4}`,
      method: "get"
  })
    .then(response => {
      dispatch({
        type: RECIVE_FORMS,
        total: getFormsTotal(response),
        forms: response.data
          .filter(item => {
            return !ignoreFormIdArray.includes(item.name);
          })
          .map(item => {
            return {
              key: item._id,
              created: convertTime(item.created),
              modified: convertTime(item.modified),
              name: item.title,
              _id: item._id,
              path: item.path,
              components: item.components
            };
          })
      });
    })
    .catch(err => {
      console.log(err);
    });
};

