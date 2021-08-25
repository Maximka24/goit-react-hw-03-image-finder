import React, { PureComponent } from "react";
import s from "./GetImg.module.css";

export default class GetImg extends PureComponent {
  render() {
    return (
      <div className={s.GetContainer}>
        <label>
          <input
            type="tel"
            placeholder="Search images..."
            name="number"
            // value={this.state.number}
            // onChange={this.handleChangeInput}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Наименование изображения может состоять только из букв!!!"
            required
          />
        </label>
      </div>
    );
  }
}
