import { get, post } from "./requests";
import config from "../../../config/config";
import { instanceAxios } from "../../../utils/tokenUtils";

export const SET_DATA = "SET_DATA";
export const LOAD = "LOAD";
export const CREATE = "CREATE";
export const DELETE = "DELETE";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const SAVE = "SAVE";
export const SET_ITEM_ATTR = "SET_ITEM_ATTR";
export const CLEAR_FORM = "CLEAR_FORM";
export const SET_FORM_NAME = "SET_FORM_NAME";

export const SET_ITEM_VALUES = "SET_ITEM_VALUES";
export const INIT_FORM_DOM = "INIT_FORM_DOM";

export const RECALC_LAYOUT = "RECALC_LAYOUT";

let _saveUrl;
let _onPost;
let _onLoad;

export const setData = (data, saveData) => dispatch => {
  dispatch({
    type: SET_DATA,
    data: data
  });
  if (saveData) {
    dispatch({
      type: SAVE
    });
  }
};

export const load = (loadUrl, saveUrl, data) => dispatch => {
  _saveUrl = saveUrl;
  if (_onLoad) {
    _onLoad().then(x => dispatch({ type: SET_DATA, data: x }));
  } else if (loadUrl) {
    get(loadUrl).then(x => {
      if (data && data.length > 0 && x.length === 0) {
        data.forEach(y => x.push(y));
      }
      dispatch({ type: SET_DATA, data: x });
    });
  } else {
    dispatch({ type: SET_DATA, data: data });
  }
};

export const create = element => dispatch => {
  dispatch({
    type: CREATE,
    data: element
  });
};

export const deletek = dataArray => dispatch => {
  dispatch({
    type: DELETE,
    dataArray: dataArray
  });
};

export const updateOrder = elements => dispatch => {
  dispatch({
    type: SET_DATA,
    data: elements
  });
};

export const save = data => {
  if (_onPost) {
    _onPost({ task_data: data });
  } else if (_saveUrl) {
    post(_saveUrl, { task_data: data });
  }
};

const attrArray = ["customMessage", "maxLength", "minLength", "required", "isLimitLength"];
export const setItemAttr = (element, attr, value) => {
  if (attrArray.includes(attr)) {
    attr = "validate";
  }
  return {
    type: SET_ITEM_ATTR,
    data: element,
    attr,
    value
  };
};

var _checkMinAndMax = (components) => {
  const componentArray = components.map(component => {
    if (component.type === "SingleText" && component.validate.maxLength !== null && component.validate.minLength !== null && component.validate.maxLength < component.validate.minLength) {
      const tmpLength = component.validate.maxLength;
      component.validate.maxLength = component.validate.minLength;
      component.validate.minLength = tmpLength;
    }
    if (component.type === "NumberInput" && component.validate.max !== null && component.validate.min !== null && component.validate.max < component.validate.min) {
      const tmpLength = component.validate.max;
      component.validate.max = component.validate.min;
      component.validate.min = tmpLength;
    }
    return component;
  })
  return componentArray;
}

var _calcFormComponentLayout = (formDataArray) => {
  let y = 0;

  formDataArray.forEach((item) => {
    let domElement = document.getElementById(item.key);

    let newHeight = Math.floor((domElement.offsetHeight) / 30);

    item.layout.h = newHeight;
    item.layout.y = y;
    y += newHeight;
  })
}

export const saveForm = (
  formDataArray,
  submissionAccess,
  name,
  type,
  email,
  push
) => dispatch => {
  _calcFormComponentLayout(formDataArray);
  let formData = {
    display: "form",
    components: _checkMinAndMax(formDataArray),
    type: "resource",
    tags: ["common"],
    page: 0,
    submissionAccess: submissionAccess,
    title: name,
    path: new String((Math.random() * 1000000000) | 0),
    name: new String((Math.random() * 1000000000) | 0),
    // owner:localStorage.getItem('email')
    owner:email,
  };

  instanceAxios({
    url: config.apiUrl + "/form",
    method: "POST",
    data: formData,
    // headers: {
    //   "X-Custom-Header": "ProcessThisImmediately",
    //   "Content-Type": "application/json",
    // }
  }).then(response => {
    dispatch({
      type: CLEAR_FORM
    });

    // location.href = config.hostUrl;
    if(type == 'export'){
      push('/formList');
    }else{
      push('/layout?id='+response.data._id);
    }
  })
    .catch(err => {
        console.info(err);
    });

};
export const updateForm = (formDataArray, submissionAccess, title, path,type,push) => dispatch => {
  _calcFormComponentLayout(formDataArray);

  let formData = {
    display: "form",
    components: _checkMinAndMax(formDataArray),
    type: "resource",
    tags: ["common"],
    page: 0,
    submissionAccess: submissionAccess,
    title: title,
    path: path,
  };

  instanceAxios({
    url: config.apiUrl + `/${formData.path}`,
    method: "PUT",
    data: formData,
    headers: {
      "X-Custom-Header": "ProcessThisImmediately",
      "Content-Type": "application/json",
    }
  }).then(response => {
    dispatch({
      type: CLEAR_FORM
    });

    // location.href = config.hostUrl;
    if(type == 'export'){
     push('/submission?id='+response.data._id);
    }else{
      push('/layout?id='+response.data._id);
    }
  }).catch(err => {
      console.info(err);
  });

};

export const setFormName = name => {
  return {
    type: SET_FORM_NAME,
    name: name
  };
};
export const setItemValues = (element, attr, value) => {
  return {
    type: SET_ITEM_VALUES,
    data: element,
    attr,
    value
  };
};

// 当通过id进入时获取数据
export const initForm = (id) => dispatch => {
  instanceAxios
    .get(config.apiUrl + "/form/" + id)
    .then(res => {
      dispatch({
        type: INIT_FORM_DOM,
        data: res.data.components,
        localForm:res.data
      });
    })
    .catch(err => {
      // mockLoginAndSetData(false, true);
    });
};

export const setCalcLayout = (value) => {
  return {
    type: RECALC_LAYOUT,
    isCalcLayout: value
  };
};