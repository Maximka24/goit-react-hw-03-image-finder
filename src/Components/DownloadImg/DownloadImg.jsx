import React, { PureComponent } from "react";
import s from "./DownloadImg.module.css";

export default class DownloadImg extends PureComponent {
  render() {
    return (
      <div className={s.DownloadContainer}>
        <button className={s.DownloadBtnImg} type="button">
          Add image
        </button>
      </div>
    );
  }
}
