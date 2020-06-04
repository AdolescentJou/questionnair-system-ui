import React from "react";

import BarChart from "../charts/barChart";
import DataTable from "../charts/dataTable";
import FanChart from "../charts/fanChart";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import {
  getSubmissionData,
  clearFormData,
  deleteFormData
} from "../redux/action";
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <div className="showDataContainer">
          <div className="formInfoContainer">
            <span>{this.props.forms.title}</span>
            <span>提交次数&nbsp;{this.props.submissionDataTotal}</span>
          </div>
            <Route path="/submitdata/barChart" render={() => <BarChart/>}></Route>
            <Route path="/submitdata/dataTable" render={() => <DataTable/>}></Route>
            <Route path="/submitdata/fanChart" render={() => <FanChart/>}></Route>
        </div>
    )
  }
}

export default connect(
  store => ({
    formData: store.formSubmitData.formData,
    forms: store.formSubmitData.forms,
    submissionDataTotal: store.formSubmitData.submissionDataTotal,
    loading: store.formSubmitData.formDataLoading
  }),
  {
    getSubmissionData,
    deleteFormData,
    clearFormData
  }
)(Content);
