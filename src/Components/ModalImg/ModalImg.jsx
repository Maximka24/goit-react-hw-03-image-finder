import React, { Component } from "react";
import { createPortal } from "react-dom";

import s from "./ModalImg.module.css";

const modalRoot = document.querySelector("#modal-root");
// const backDrop = document.querySelector('#Overlay')

export default class ModalImg extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleClickKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleClickKeyDown);
  }

  handleClickKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleClickBackDrop = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div
        id="Overlay"
        className={s.Overlay}
        onClick={this.handleClickBackDrop}
      >
        <div className={s.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
