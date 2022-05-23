import React, { useEffect, useRef } from "react";
import Moment from "react-moment";
import userdp from "../../images/user.png"

const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  return (
    <li class={`${msg.from === user1 ? "sent" : "replies"}`} ref={scrollRef}>
      <img src={userdp} alt="" />

      <p className="messagetext">
      <div className="messagetextwrap">
          {msg.media ? (
            <a href={msg.media} >
              <div>
                <embed
                  src={msg.media}
                  style={{overflow:"hidden"}}
                  frameBorder="0"
                  width="200px"
                  height="200px"
                />
              </div>
            </a>
          ) : null}
          {msg.text}
        </div>
        <small>
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </p>
    </li>
  );
};

export default Message;
