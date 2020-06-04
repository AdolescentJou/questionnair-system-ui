import React, { PureComponent } from 'react';

export default class FormIcon extends PureComponent {
    render() {
        let name = '';
        let [icon, width] = this.props.icon;
        switch(icon) {
            case 'text': {
                name = "./image/icons/text.png";
                break;
            }
            case 'number': {
                name = "./image/icons/number.png";
                break;
            }
            case 'radio': {
                name = "./image/icons/radio.png";
                break;
            }
            case 'dropdown': {
                name = "./image/icons/dropdown.png";
                break;
            }
            case 'checkbox': {
                name = "./image/icons/checkbox.png";
                break;
            }
            case 'idcard': {
                name = "./image/icons/idcard.png";
                break;
            }
            case 'phone': {
                name = "./image/icons/phone.png";
                break;
            }
            case 'email': {
                name = "./image/icons/email.png";
                break;
            }
            case 'file': {
                name = "./image/icons/file.png";
                break;
            }
            case 'image': {
                name = "./image/icons/image.png";
                break;
            }
            case 'date': {
                name = "./image/icons/date.png";
                break;
            }
            case 'score':{
                name = "./image/icons/score.png";
                break;
            }
            default:
                name = "";
                return;
        }
        width = width ? width : 14;
        return (
            <i className="form-icon text" style={{backgroundImage: `url(${name})`, width: `${width}px`}}></i>
        )
    }
}
