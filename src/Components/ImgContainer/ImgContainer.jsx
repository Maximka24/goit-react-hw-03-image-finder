import React, { Component } from "react";
import PropTypes from "prop-types";

import DownloadImg from "../DownloadImg/DownloadImg";
import ModalImg from "../ModalImg/ModalImg";
import ImageItem from "../ImgItem/ImgItem";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import s from "./ImgContainer.module.css";

const IMG_Get_API = "https://pixabay.com/api/";
const KEY_API = "22248336-3f9f08778186b55c7ac32d168";

export default class ImgContainer extends Component {
  state = {
    imgList: "",
    error: null,
    showModal: false,
    targetImg: "",
    status: "idle",
    statusLoad: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imgName !== this.props.imgName) {
      this.setState({ imgList: "", status: "load" });

      fetch(
        `${IMG_Get_API}?q=${this.props.imgName}&page=${this.props.imgPage}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(
            new Error(`Нет изображения с названием ${this.props.imgName}`)
          );
        })
        .then((img) =>
          this.setState((prevState) => ({
            imgList: [...prevState.imgList, ...img.hits],
            status: "resolved",
            // statusLoad: false,
          }))
        )
        .catch((error) => this.setState({ error, status: "error" }));
    }

    if (prevProps.imgPage < this.props.imgPage) {
      this.setState({ statusLoad: true });

      fetch(
        `${IMG_Get_API}?q=${this.props.imgName}&page=${this.props.imgPage}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(
            new Error(`Нет изображения с названием ${this.props.imgName}`)
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

  toggleModal = (e) => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    const { imgList, error, status, showModal, statusLoad } = this.state;

    if (status === "idle") {
      return (
        <div className={s.ImgContainer}>Введите запросы в поле выше!! </div>
      );
    }

    if (status === "error") {
      return <h1 className={s.ImgContainer}> {error.message} </h1>;
    }

    if (status === "load") {
      return (
        <div className={s.ImgContainer}>
          <Loader type="Oval" color="#00BFFF" height={50} width={50} />
        </div>
      );
    }

    if (status === "resolved") {
      return (
        <>
          {imgList && (
            <ImageItem
              imgName={this.props.imgName}
              imgList={imgList}
              onClickOpenModal={this.modalRendImg}
              onClickToggleModal={this.toggleModal}
            />
          )}
          {statusLoad && (
            <div className={s.ImgContainer}>
              <Loader type="Oval" color="#00BFFF" height={50} width={50} />
            </div>
          )}

          <DownloadImg
            nameImgState={this.state.imgList}
            onClickPageState={() => {
              this.props.onClickPageState();
            }}
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

ImgContainer.propTypes = {
  onClickPageState: PropTypes.func.isRequired,
  imgName: PropTypes.string.isRequired,
  imgPage: PropTypes.number.isRequired,
};
