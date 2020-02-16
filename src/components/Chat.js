import React, {Component} from 'react';
import style from "../style/style.css";
import InputMessage from "./InputMessage";
import {eventBot, initBot, requestBot} from "../inquiries";
import Messages from "./Messages";

const UUID = '772c9859-4dd3-4a0d-b87d-d76b9f43cfa4';
const EUID = '00b2fcbe-f27f-437b-a0d5-91072d840ed3';

class Chat extends Component {
  state = {
    cuid: null,
    valueInputMessage: '',
    messages: []
  };
  beginChat = async () => {
    const cuid = await initBot(UUID);
    this.setState({cuid: cuid});
    localStorage.setItem('cuid', cuid);
    const newMessageBot = await eventBot(this.state.cuid, EUID);
    this.setState({messages: [newMessageBot]});
    localStorage.setItem('messages', JSON.stringify(this.state.messages))
  };

  componentDidMount = async () => {
    if (localStorage.getItem('cuid')) {
      this.setState({
        messages: await JSON.parse(localStorage.getItem('messages')) || [],
        cuid: localStorage.getItem('cuid') || null
      });
    } else {
      this.beginChat()
    }
  };

  newMessage = async () => {
    if (this.state.valueInputMessage !== '') {
      const newMessageClient = {
        author: 'messageClient',
        text: this.state.valueInputMessage
      };
      const newMessageBot = {
        author: 'messageBot',
        text: await requestBot(this.state.cuid, this.state.valueInputMessage)
      };
      this.setState((state) => {
        return {
          messages: [...state.messages, newMessageClient, newMessageBot],
          valueInputMessage: ''
        }
      });
      localStorage.setItem('messages', JSON.stringify(this.state.messages))
    }
  };

  updateValueMessage = value => {
    this.setState({valueInputMessage: value})
  };

  clearChat = async () => {
    localStorage.clear();
    this.setState({
      valueInputMessage: '',
      messages: []
    });
    this.beginChat();
  };

  render() {
    return (
      <div>
        <div className={style.chatAndMessage}>
          {this.state.messages.map((message,i) =>
            <div key={i}>
              <Messages messege={message}/>
            </div>
          )}
        </div>
        <InputMessage valueInputMessage={this.state.valueInputMessage} updateValueMessage={this.updateValueMessage}/>
        <div className={style.buttonsBox}>
          <button onClick={this.newMessage}>Отправить сообщение</button>
          <button onClick={this.clearChat} style={{float: 'right'}}>Удалить чат</button>
        </div>
      </div>
    );
  }
}

export default Chat;