import React, {Component} from 'react';
import style from "../style/style.css";


class InputMessage extends Component {

  handleChange = e => {
    this.props.updateValueMessage(e.target.value);
  };
  render() {
    return (
      <div className={style.inputMessage}>
        <input onChange={this.handleChange} value={this.props.valueInputMessage} placeholder="Введите сообщение" />
      </div>
    );
  }
}

export default InputMessage;