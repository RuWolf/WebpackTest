import React, {Component} from 'react';
import style from "../style/style.css";
import Messages from "./Messages";

class Chat extends Component {
  state = {
    valueInputMessage: '',
    messages: [
      {
        author: 'messageBot',
        text: 'Hello'
      },
      {
        author: 'messageClient',
        text: 'test'
      },
      {
        author: 'messageBot',
        text: 'Hello'
      },
      {
        author: 'messageClient',
        text: 'test'
      }
    ]
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
      </div>
    );
  }
}

export default Chat;