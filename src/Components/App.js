import React, { Component } from "react";
import "./App.module.css";

import GetImg from "./GetImg/GetImg.jsx";
import ImgContainer from "./ImgContainer/ImgContainer.jsx";

class App extends Component {
  state = {
    nameImg: "",
  };

  onSubmitNameState = (getNameImg) => {
    this.setState({
      nameImg: getNameImg,
    });
  };

  render() {
    return (
      <div className="App">
        <GetImg onSubmit={this.onSubmitNameState} />

        <ImgContainer imgName={this.state.nameImg} imgPage={this.state.page} />
      </div>
    );
  }
}

export default App;
