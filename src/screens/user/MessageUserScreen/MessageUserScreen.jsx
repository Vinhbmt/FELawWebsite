import React, { useContext, useRef } from "react";
import "./style.scss";
import { SocketContext } from "../../../core/config/socket.config";
import { useState } from "react";
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useSelection from "antd/lib/table/hooks/useSelection";
import AuthAction from "../../../redux/actions/AuthAction";
import Message from "../../../components/Message/Message";
import axios from "axios";

const MessageUserScreen = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const param = useParams();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    authState: { accountInfo },
  } = useSelector((state) => {
    return { authState: state.authState };
  });

  const scrollRef = useRef();

  const asyncGetAccountInfo = async () => {
    const response = await dispatch(await AuthAction.asyncGetAccountInfo());
  };

  useEffect(() => {
    asyncGetAccountInfo();
  }, []);

  const getConversation = async () => {
    const response = await dispatch(
      await AccountUserAction.asyncGetConversation(param.lawyerId)
    );
    console.log(response);
    if (response.status == 200) {
      setMessages(response.data.listMessages);
      setConversation(response.data.conversationId);
    }
  };

  useEffect(() => {
    getConversation();
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log("receiver message", data);
      setMessages([...messages, data]);
    });
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = {
      content: newMessage,
      conversationId: conversation,
    };

    try {
      const res = await dispatch(
        await AccountUserAction.asyncPostMessage(message)
      );
      if (res.status == 201) {
        console.log(res);

        setMessages([...messages, res.data]);
        setNewMessage("");
        socket.emit("message", {
          conversationId: conversation,
          senderId: accountInfo._id,
          content: newMessage,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(messages);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-screen">
      <div className="message-screen-padding"></div>
      <div className="message-screen-container">
        <div className="message-screen-sidebar">
          <div className="online-user">
            <h3>Online User</h3>
            <img src="https://img.icons8.com/emoji/48/000000/green-circle-emoji.png" />
          </div>
          <div className="list-online-user">
            <ul>
              <li>Vinh</li>
              <li>Vinh</li>
              <li>Vinh</li>
              <li>Vinh</li>
              <li>Vinh</li>
              <li>Vinh</li>
              <li>Vinh</li>
            </ul>
          </div>
        </div>
        <div className="message-screen-content">
          <div className="message-navbar">
            <div className="chat-username">Vinh</div>
            <div className="video-call">
              <i class="fas fa-video"></i>
            </div>
          </div>
          <div className="conversation">
            {messages.map((m) => {
              return (
                <div ref={scrollRef}>
                  <Message message={m} own={m.senderId === accountInfo._id} />
                </div>
              );
            })}
          </div>
          <div className="input-chat">
            <input
              placeholder="Type something"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageUserScreen;
