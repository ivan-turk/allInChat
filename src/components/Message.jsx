import React from "react";
import { UserAuth } from "../context/AuthContext";

const Message = ({ imepropa }) => {
  const { currentUser } = UserAuth();

  return (
    <div>
      <div
        className={`chat ${
          imepropa.uid === currentUser.uid ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={imepropa.avatar} />
          </div>
        </div>
        <div className="chat-header">{imepropa.name}</div>
        <div className="chat-bubble">{imepropa.text}</div>
      </div>
    </div>
  );
};

export default Message;
