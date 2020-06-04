import React,{useEffect} from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ReactFormBuilder from "./component/formBuilder/formBuilder";
import Home from "./component/homePage/homeX";
import FormSubmitData from "./component/formData/formSubmitDataX";
import Submission from "./component/submission/submission";
import SubmissionTip from "./component/submission/successTip";
import FormLayout from "./component/layout/layout";
import SystemIndex from "./component/systemIndex/systemIndex";
import {setUserConfig} from "./component/login/redux/action";

const PrivateRoute = ({ component, path,userConfig,...rest }) => {
  return (
    <Route
      {...rest} render={props => (
      // localStorage.getItem('email') ? ( 
        userConfig ? ( 
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname:"/index",
            state: { from: props.location },
          }}
        />
      )
    )}
    />
  );
};

const PublicRoute = ({ component,userConfig,path, ...rest }) => {
  return (
    <Route
      {...rest} render={props => (
      userConfig ? (
        <Redirect
          to={{
            pathname: path,
          }}
        />
      ) : (
        React.createElement(component, props)
      )
    )}
    />
  );
};


const App = props => {
  useEffect(()=>{
    let userConfig = sessionStorage.getItem('userConfig')?JSON.parse(sessionStorage.getItem('userConfig')):null;
    if(userConfig){
      props.setUserConfig(userConfig);
      sessionStorage.removeItem('userConfig');
    }
  },[])
    return (
      <>
        <Router>
          <Switch>
            <PrivateRoute exact path="/formList" userConfig={props.userConfig} component={Home} />
            <PrivateRoute path="/formbuild" userConfig={props.userConfig} component={ReactFormBuilder} />
            <PrivateRoute path="/layout" userConfig={props.userConfig} component={FormLayout} />
            {/* <PrivateRoute path="/submission" userConfig={props.userConfig} component={Submission} /> */}
            <PrivateRoute path="/submitdata" userConfig={props.userConfig} component={FormSubmitData} />
            <Route path="/index" component={SystemIndex} />
            <Route path="/submission" component={Submission} />
            <Route path="/submissionTip" component={SubmissionTip} />
            {/* <PublicRoute path="/login" component={Login} /> */}
            <Redirect from="/*" to="/index" />
          </Switch>
        </Router> 
      </>
    );
}

export default connect(store => ({
  userConfig:store.login.userConfig
}),{
  setUserConfig
})(App);
