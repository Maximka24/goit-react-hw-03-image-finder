import React, { Component } from "react";
import DownloadImg from "../DownloadImg/DownloadImg";
import ModalImg from "../ModaImg/ModalImg";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import s from "./ImgContainer.module.css";

const IMG_Get_API = "https://pixabay.com/api/";
const KEY_API = "22248336-3f9f08778186b55c7ac32d168";

export default class ImgContainer extends Component {
  state = {
    imgList: "",
    page: 1,
    error: null,
    showModal: false,
    targetImg: "",
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imgName !== this.props.imgName) {
      this.setState({ status: "load" });

      fetch(
        `${IMG_Get_API}?q=${this.props.imgName}&page=${this.state.page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(
            new Error(`Нет изображения с названием ${this.props.imgName}`)
          );
        })
        .then((img) => this.setState({ imgList: img.hits, status: "resolved" }))
        .catch((error) => this.setState({ error, status: "error" }));
    }

    if (prevState.page < this.state.page) {
      fetch(
        `${IMG_Get_API}?q=${this.props.imgName}&page=${this.state.page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => res.json())
        .then((img) =>
          this.setState((prevState) => ({
            imgList: [...prevState.imgList, ...img.hits],
          }))
        );
    }
  }

  modalRendImg = (e) => {
    if (e.target !== e.currentTarget) {
      this.setState(() => ({
        targetImg: e.target.currentSrc,
      }));
    }
  };

  toggleModal = (e) => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  onClickPageState = () => {
    this.setState((prevPage) => ({ page: prevPage.page + 1 }));
  };

  render() {
    const { imgList, error, status, showModal } = this.state;

    if (status === "idle") {
      return (
        <div className={s.ImgContainer}>Введите запросы в поле выше!! </div>
      );
    }

    if (status === "load") {
      return (
        <div className={s.ImgContainer}>
          <Loader type="Oval" color="#00BFFF" height={80} width={80} />
        </div>
      );
    }

    if (status === "error") {
      return <h1 className={s.ImgContainer}> {error.message} </h1>;
    }

    if (status === "resolved") {
      return (
        <>
          {/* {!imgList && <Loader type="Oval" color="#00BFFF" height={ 80 } width={ 80 } />} */}
          {imgList && (
            <ul className={s.ImageGallery} onClick={this.modalRendImg}>
              {imgList.map(({ id, webformatURL }) => (
                <li
                  key={id}
                  className={s.ImageGalleryItem}
                  onClick={this.toggleModal}
                >
                  <img
                    className={s.ImageGalleryItemImage}
                    src={webformatURL}
                    alt={`Картинка по запросу ${this.props.imgName}`}
                  />
                </li>
              ))}
            </ul>
          )}
          <DownloadImg
            nameImgState={this.state.imgList}
            onClickPageState={this.onClickPageState}
          />
          {showModal && (
            <ModalImg onClose={this.toggleModal}>
              <img
                src={this.state.targetImg}
                alt={`Картинка по запросу ${this.props.imgName}`}
              />
            </ModalImg>
          )}
        </>
      );
    }
  }
}
