import React, { Component } from "react";

import GetImg from "./GetImg/GetImg.jsx";
import ImgContainer from "./ImgContainer/ImgContainer.jsx";

const IMG_Get_API = "https://pixabay.com/api/";
const KEY_API = "22248336-3f9f08778186b55c7ac32d168";

class App extends Component {
  state = {
    imgList: [],
    nameImg: "",
    pageImg: 1,
    status: "idle",
    targetImg: "",
    error: null,
    statusLoad: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { nameImg, pageImg } = this.state;

    if (prevState.nameImg !== nameImg) {
      this.setState({ imgList: [], status: "load" });

      fetch(
        `${IMG_Get_API}?q=${nameImg}&page=${pageImg}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(
            new Error(`Нет изображения с названием ${nameImg}`)
          );
        })
        .then((img) =>
          this.setState((prevState) => ({
            imgList: [...prevState.imgList, ...img.hits],
            status: "resolved",
          }))
        )
        .catch((error) => this.setState({ error, status: "error" }));
    }

    if (prevState.pageImg < pageImg) {
      this.setState({ statusLoad: true });

      fetch(
        `${IMG_Get_API}?q=${nameImg}&page=${pageImg}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(
            new Error(`Нет изображения с названием ${nameImg}`)
          );
        })
        .then((img) =>
          this.setState((prevState) => ({
            imgList: [...prevState.imgList, ...img.hits],
            statusLoad: false,
          }))
        )
        .then(this.scrollToTarget)
        .catch((error) => this.setState({ error, status: "error" }));
    }
  }

  onSubmitNameState = (getNameImg) => {
    this.setState({
      nameImg: getNameImg,
      pageImg: 1,
    });
  };

  onClickPageState = () => {
    this.setState((prevPage) => ({ pageImg: prevPage.pageImg + 1 }));
  };

  scrollToTarget() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  modalRendImg = (e) => {
    if (e.target !== e.currentTarget) {
      this.setState(() => ({
        targetImg: e.target.currentSrc,
      }));
    }
  };

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    return (
      <div className="App">
        <GetImg onSubmit={this.onSubmitNameState} />

        <ImgContainer
          imgList={this.state.imgList}
          imgName={this.state.nameImg}
          imgPage={this.state.pageImg}
          imgStatus={this.state.status}
          errorApi={this.state.error}
          statusLoad={this.state.statusLoad}
          showModal={this.state.showModal}
          targetImg={this.state.targetImg}
          onClickPageState={this.onClickPageState}
          modalRendImg={this.modalRendImg}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}

export default App;
