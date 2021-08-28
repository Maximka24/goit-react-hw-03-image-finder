import React, { Component } from "react";

import PropTypes from "prop-types";

import s from "./DownloadImg.module.css";

export default class DownloadImg extends Component {
  render() {
    return (
      <div className={s.DownloadContainer}>
        {this.props.nameImgState !== "" && (
          <button
            className={s.DownloadBtnImg}
            onClick={this.props.onClickPageState}
          >
            Add image
          </button>
        )}
      </div>
    );
  }
}

DownloadImg.propTypes = {
  onSubmit: PropTypes.func,
};
