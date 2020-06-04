import { RECALC_LAYOUT, SET_DATA, LOAD, CREATE, DELETE, UPDATE_ORDER, SAVE, SET_ITEM_ATTR, CLEAR_FORM, SET_FORM_NAME, SET_ITEM_VALUES, INIT_FORM_DOM } from './action';

const initState = {
	data: [],
	name: "问卷名字",
	isCalcLayout: false,
	localForm:{},
};

const formBuilderReducer = (state = initState, action) => {
	switch (action.type) {
		case RECALC_LAYOUT: {
			return {
				...state,
				isCalcLayout: action.isCalcLayout
			}
		}
		case SET_DATA: {
			return {
				...state,
				data: action.data
			}
		}
		case CREATE: {
			let newData = [].concat(state.data, action.data);
			return {
				...state,
				data: newData
			}
		}
		case DELETE: {
			return {
				...state,
				data: action.dataArray
			}
		}
		case SET_ITEM_ATTR: {
			let newData = [...state.data];
			let index = newData.indexOf(action.data);
			newData[index][action.attr] = action.value;
			return {
				...state,
				data: newData
			}
		}
		case CLEAR_FORM: {
			return {
				data: [],
				name: "表单名字"
			}
		}
		case SET_FORM_NAME: {
			return {
				...state,
				name: action.name
			}
		}
		case SET_ITEM_VALUES: {
			let newData = [...state.data];
			let index = newData.indexOf(action.data);
			newData[index][action.attr] = {
				values:action.value,
				custom: "",
				json: "",
				resource: "",
				url: "",
			  };
			return {
				...state,
				data: newData
			}
		}
		case INIT_FORM_DOM: {
			return {
				...state,
				data: action.data,
				localForm:action.localForm
			}
		}
		default:
			return state;
	}
};

export default formBuilderReducer;