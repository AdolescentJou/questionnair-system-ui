import { combineReducers } from "redux";
import SurveyReducer from '../component/submission/redux/reducer';
import homeReducer from "../component/homePage/redux/reducer";
import formSubmitDataReducer from "../component/formData/redux/reducer";
import formBuilderReducer from '../component/formBuilder/redux/reducer';
import loginReducer from '../component/login/redux/reducer';
const reducers = combineReducers({
    formSubmitData: formSubmitDataReducer,
    forms: homeReducer,
    survey: SurveyReducer,
    formBuilder: formBuilderReducer,
    login:loginReducer
});

export default reducers;
