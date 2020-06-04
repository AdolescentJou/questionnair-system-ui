import React from "react";
import SiderBar from "./components/sidebar";
import Header from "../header/header";
import Content from "./components/content";
class FormSubmitData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Header />
        <div className="formSubmitDataContainer">
          <SiderBar />
          <Content />
        </div>
      </>
    );
  }
}

export default FormSubmitData;
