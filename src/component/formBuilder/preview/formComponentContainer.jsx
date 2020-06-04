import FormComponent from './formComponent';
import EmptyFormComponent from './formItemDoms/component/formComponentEmpty';
import SingleText from "./formItemDoms/component/singleText";
import NumberInput from "./formItemDoms/component/numberInput";
import RadioButtons from "./formItemDoms/component/radioButtons";
import EmailInput from './formItemDoms/component/emailInput';
import PhoneInput from './formItemDoms/component/phoneInput';

import CheckboxInput from "./formItemDoms/component/checkboxInput";
import IdCardInput from "./formItemDoms/component/idCardInput";
import DropDown from "./formItemDoms/component/dropDown";

import MultiDropDown from "./formItemDoms/component/multiDropDown";
import ScoreInput from "./formItemDoms/component/scoreInput";
import FileUpload from "./formItemDoms/component/fileUpload";
import ImageUpload from "./formItemDoms/component/imageUpload";
import DateInput from "./formItemDoms/component/dateInput";
const FormElements = {};

FormElements.SingleText = FormComponent(SingleText);
FormElements.NumberInput = FormComponent(NumberInput);
FormElements.RadioButtons = FormComponent(RadioButtons);
FormElements.EmptyFormComponent = FormComponent(EmptyFormComponent);
FormElements.EmailInput = FormComponent(EmailInput);
FormElements.PhoneInput = FormComponent(PhoneInput);

FormElements.CheckboxInput = FormComponent(CheckboxInput);
FormElements.IdCardInput = FormComponent(IdCardInput);
FormElements.DropDown = FormComponent(DropDown);

FormElements.MultiDropDown = FormComponent(MultiDropDown);
FormElements.ScoreInput = FormComponent(ScoreInput);
FormElements.FileUpload = FormComponent(FileUpload);
FormElements.ImageUpload = FormComponent(ImageUpload);
FormElements.DateInput = FormComponent(DateInput);
export default FormElements;
