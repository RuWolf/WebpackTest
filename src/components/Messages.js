import style from "../style/style.css";
import React from "react";

function Messages(props) {
  return (
    <div className={style.messageInChat}>
      <div className={style[props.messege.author]} dangerouslySetInnerHTML={{__html: props.messege.text}}/>
    </div>
  );
}

export default Messages;