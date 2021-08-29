import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./ImgItem.module.css";

export default class ImageItem extends Component {
  render() {
    return (
      <ul className={s.ImageGallery} onClick={this.props.onClickOpenModal}>
        {this.props.imgList.map(({ id, webformatURL }) => (
          <li
            key={id}
            className={s.ImageGalleryItem}
            onClick={this.props.onClickToggleModal}
          >
            <img
              className={s.ImageGalleryItemImage}
              src={webformatURL}
              alt={`Картинка по запросу ${this.props.imgName}`}
            />
          </li>
        ))}
      </ul>
    );
  }
}

ImageItem.propTypes = {
  onClickOpenModal: PropTypes.func,
  onClickToggleModal: PropTypes.func,
  imgName: PropTypes.string.isRequired,
  imgList: PropTypes.array,
};
