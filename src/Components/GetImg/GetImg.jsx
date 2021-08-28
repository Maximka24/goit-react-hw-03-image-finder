import React, { Component } from "react";
import { BiSearch } from "react-icons/bi";

import PropTypes from "prop-types";

import s from "./GetImg.module.css";

export default class GetImg extends Component {
  state = {
    nameImg: "",
  };

  handleNameChangeInput = (event) => {
    this.setState({ nameImg: event.currentTarget.value.toLowerCase() });
  };

  handelSubmitForm = (event) => {
    event.preventDefault();

    if (this.state.nameImg.trim() === "") {
      return alert("Введите название картинки!");
    }

    this.props.onSubmit(this.state.nameImg);
    this.setState({ nameImg: "" });
  };

  render() {
    return (
      <div className={s.GetContainer}>
        <form onSubmit={this.handelSubmitForm}>
          <button className={s.BtnForm} type="submit">
            <BiSearch style={{ width: 24, height: 24 }} />
          </button>
          <input
            type="tel"
            placeholder="Search images..."
            name="number"
            value={this.state.nameImg}
            onChange={this.handleNameChangeInput}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Наименование изображения может состоять только из букв!!!"
            // required
          />
        </form>
      </div>
    );
  }
}

GetImg.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
