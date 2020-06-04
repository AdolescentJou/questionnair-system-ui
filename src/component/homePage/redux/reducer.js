import { message } from "antd";
import { DELETE_FORM, RECIVE_FORMS } from "./action";

const initState = {
  formArray: [],
  total: 0,
};

export default function formsReducer(state = initState, action) {
  switch (action.type) {
    case DELETE_FORM:
      const newforms = state.formArray.filter(form => {
        return form.key !== payload.formId;
      });
      const deleteForm = state.formArray.filter(form => {
        return form.key === payload.formId;
      });
      if (newforms.length < state.formArray.length) {
        message.success(`已成功删除${deleteForm[0].name}表单`);
      }
      return {
        formArray: newforms
      };
    case RECIVE_FORMS:
      return {
        ...state,
        formArray: action.forms,
        total: action.total,
      };
    default:
      return state;
  }
}
