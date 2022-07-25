import "./style.scss";
import { format } from "timeago.js";

const Message = ({ message, own, receiver, info }) => {
  return (
    own ? 
    <div className="message own">
      <div className="messageTop">
        <img
          className="messageImg"
          src={info?.imgUrl || "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
          alt=""
        />
        <span>
          <p className="messageText">{message.content}</p>
          <div className="messageBottom">{format(message.createdAt)}</div>
        </span>
      </div>    
    </div>
    :
    <div className="message">
      <div className="messageTop">
        <img
          className="messageImg"         
          src={receiver?.imgUrl || "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
          alt=""
        />
        <span>
          <p className="messageText">{message.content}</p>
          <div className="messageBottom1">{format(message.createdAt)}</div>
        </span>
      </div>
    </div>
  );
}

export default Message;