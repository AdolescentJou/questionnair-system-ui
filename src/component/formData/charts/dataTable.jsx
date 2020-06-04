import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ConfigProvider, Button } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { initToken } from "../../../utils/tokenUtils";
import ControlTable from "../components/controlTable";
import locationUtils from "../../../utils/locationUtils";
import ExportJsonExcel from "js-export-excel";
import {
  getSubmissionData,
  getAllSubmissionData,
  clearFormData,
  deleteFormData
} from "../redux/action";

class FormSubmitData extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submissionArray: [],
      formId: locationUtils.getUrlParamObj().id,
      currentPage: 1,
      pageSize: 10
    };
  }

  onChangePages = (currentPage, pageSize) => {
    this.setState({
      currentPage,
      pageSize
    });
    this.props.getSubmissionData(this.state.formId, pageSize, currentPage);
  };

  componentDidMount() {
    
    const {email,password} = this.props.userConfig;
    initToken(email,password)
      .then(() => {
        this.props.getSubmissionData(
          this.state.formId,
          this.state.pageSize,
          this.state.currentPage
        );
        this.props.getAllSubmissionData(this.state.formId);
      })
      .catch(err => {
        console.error(err);
      });
  }
  componentWillUnmount() {
    this.props.clearFormData();
  }

  transforDataByType = data => {
      for( let key in data){
        if ({}.toString.call(data[key]) == "[object Array]") {
          if (data[key].length!=0&&{}.toString.call(data[key][0]) == "[object Object]") {
            data[key] = data[key][0].name
          }
          else{
            data[key] = data[key].join(",");
          }
        }
      }
      return data;
  }

  //将数据导出为文档
  exportData = () => {
    var option = {};
    let dataTable = this.props.formAllData.map(item => this.transforDataByType(item.data));
    let filterArr = this.props.forms.components.map(item => item.key);
    let headerArr = this.props.forms.components.map(item => item.label);
    option.fileName = "问卷数据";
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: this.props.forms.title,
        sheetFilter: filterArr,
        sheetHeader: headerArr
      }
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  };

  _cutFileName = name => {
    if (name.length > 8) {
      return name.substr(0, 8);
    } else {
      return name;
    }
  };

  render() {
    const { formData, forms } = this.props;
    
    let columns = this.props.forms.components.map(item => {
      return {
        title: item.label,
        dataIndex: item.key,
        key: item.key
      };
    });
    const data = formData.map(item => {
      let submissionData = item.data;
      for (var key in submissionData) {
        if ({}.toString.call(submissionData[key]) == "[object Array]") {
          if (submissionData[key].length!=0&&{}.toString.call(submissionData[key][0]) == "[object Object]") {
            submissionData[key] = 
            <span>
              {this._cutFileName(submissionData[key][0].name)}
              &nbsp; &nbsp;
              <a
                href={submissionData[key][0]["url"]}
                download={submissionData[key][0]["name"]}
                style={{ textDecoration: "none" }}
              >
                点击下载
              </a>
            </span>
          }
          else{
            submissionData[key] = submissionData[key].join(",");
          }
        } 
      }
      submissionData.id = item.id;
      return submissionData;
    });

    const paginationProps = {
      defaultCurrent: 1,
      position: "bottom",
      showQuickJumper: true,
      pageSize: this.state.pageSize,
      total: this.props.submissionDataTotal,
      loading: this.props.loading,
      current: this.state.currentPage,
      onChange: (current, pageSize) => {
        this.onChangePages(current, pageSize);
      },
      onShowSizeChange: (current, pageSize) => {
        this.onChangePages(current, pageSize);
      }
    };
    return (
      <>
        <div className="form-submit-data-table">
          <Button onClick={this.exportData}>导出数据</Button>
          <ConfigProvider locale={zhCN}>
            <ControlTable
              columns={columns}
              data={data}
              paginationProps={paginationProps}
            />
          </ConfigProvider>
        </div>
      </>
    );
  }
}

export default connect(
  store => ({
    formData: store.formSubmitData.formData,
    formAllData: store.formSubmitData.formAllData,
    forms: store.formSubmitData.forms,
    submissionDataTotal: store.formSubmitData.submissionDataTotal,
    loading: store.formSubmitData.formDataLoading,
    userConfig:store.login.userConfig
  }),
  {
    getSubmissionData,
    getAllSubmissionData,
    deleteFormData,
    clearFormData
  }
)(FormSubmitData);
