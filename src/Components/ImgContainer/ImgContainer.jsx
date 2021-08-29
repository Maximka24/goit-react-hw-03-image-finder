import React, { Component } from "react";
import PropTypes from "prop-types";

import DownloadImg from "../DownloadImg/DownloadImg";
import ModalImg from "../ModalImg/ModalImg";
import ImageItem from "../ImgItem/ImgItem";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import s from "./ImgContainer.module.css";

export default class ImgContainer extends Component {
  render() {
    if (this.props.imgStatus === "idle") {
      return (
        <div className={s.ImgContainer}>Введите запросы в поле выше!! </div>
      );
    }

    if (this.props.imgStatus === "error") {
      return (
        <h1 className={s.ImgContainer}> {this.props.errorApi.message} </h1>
      );
    }

    if (this.props.imgStatus === "load") {
      return (
        <div className={s.ImgContainer}>
          <Loader type="Oval" color="#00BFFF" height={50} width={50} />
        </div>
      );
    }

    if (this.props.imgStatus === "resolved") {
      return (
        <>
          {this.props.imgList && (
            <ImageItem
              imgName={this.props.imgName}
              imgList={this.props.imgList}
              onClickOpenModal={this.props.modalRendImg}
              onClickToggleModal={this.props.toggleModal}
            />
          )}
          {this.props.statusLoad && (
            <div className={s.ImgContainer}>
              <Loader type="Oval" color="#00BFFF" height={50} width={50} />
            </div>
          )}

          <DownloadImg
            nameImgState={this.props.imgName}
            onClickPageState={() => {
              this.props.onClickPageState();
            }}
          />

          {this.props.showModal && (
            <ModalImg onClose={this.props.toggleModal}>
              <img
                src={this.props.targetImg}
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
  modalRendImg: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  imgName: PropTypes.string.isRequired,
  imgPage: PropTypes.number.isRequired,
  imgList: PropTypes.array.isRequired,
  imgStatus: PropTypes.string.isRequired,
  statusLoad: PropTypes.bool.isRequired,
  showModal: PropTypes.bool.isRequired,
};
