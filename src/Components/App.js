import React, { Component } from "react";

import GetImg from "./GetImg/GetImg.jsx";
import ImgContainer from "./ImgContainer/ImgContainer.jsx";

class App extends Component {
  state = {
    nameImg: "",
    pageImg: 1,
  };

  onSubmitNameState = (getNameImg) => {
    this.setState({
      nameImg: getNameImg,
      pageImg: 1,
    });
  };

  onClickPageState = () => {
    this.setState((prevPage) => ({ pageImg: prevPage.pageImg + 1 }));
  };

  render() {
    return (
      <div className="App">
        <GetImg onSubmit={this.onSubmitNameState} />

        <ImgContainer
          onClickPageState={this.onClickPageState}
          imgName={this.state.nameImg}
          imgPage={this.state.pageImg}
        />
      </div>
    );
  }
}

export default App;
