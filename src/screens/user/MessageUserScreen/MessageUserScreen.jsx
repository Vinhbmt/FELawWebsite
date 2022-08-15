import React, { useContext, useRef } from "react";
import "./style.scss";
import { SocketContext } from "../../../core/config/socket.config";
import { useState } from "react";
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import useSelection from "antd/lib/table/hooks/useSelection";
import AuthAction from "../../../redux/actions/AuthAction";
import Message from "../../../components/Message/Message";
import axios from "axios";

const MessageUserScreen = () => {
  const {socket} = useContext(SocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [listConversation, setListConversation] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const {
    authState: { accountInfo },
  } = useSelector((state) => {
    return { authState: state.authState };
  });

  const scrollRef = useRef();

  const asyncGetAccountInfo = async () => {
    const response = await dispatch(await AuthAction.asyncGetAccountInfo("user"));
    if(!response) {
      navigate('/login');
    }
  };

  useEffect(() => {
    asyncGetAccountInfo();
  }, []);

  console.log(accountInfo);

  const getConversation = async () => {
    const response = await dispatch(
      await AccountUserAction.asyncGetConversation(param.lawyerId)
    );
    console.log(response);
    if (response.status == 200) {
      setMessages(response.data.listMessages);
      setConversation(response.data.conversationId);
      setReceiver(response.data.receiver);
    }
  };

  useEffect(async () => {
    await getConversation();
    await getListConversation();
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [param]);

  const getListConversation = async () => {
    const response = await dispatch(
      await AccountUserAction.asyncGetListConversation()
    );
    console.log(response);
    if (response.status == 200) {
      setListConversation(response.data);
    }
  };

  // useEffect(() => {
  //   getListConversation();
  // }, []);

  const handleOpenConver = async (id) => {
    const response = await dispatch(
      await AccountUserAction.asyncGetConversation(id)
    );
    if (response.status == 200) {
      setMessages(response.data.listMessages);
      setConversation(response.data.conversationId);
    }
  };

  socket.on("message", (data) => {
    console.log("receiver message", data);
    setMessages([...messages, data]);
  });
  //   useEffect(() => {}, []);

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

        setMessages([
          ...messages,
          {
            conversationId: conversation,
            senderId: accountInfo._id,
            content: newMessage,
          },
        ]);
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
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(event);
    }
  };

  return (
    listConversation != null &&
    <div className="message-screen">
      <div className="message-screen-padding"></div>
      <div className="message-screen-container">
        <div className="message-screen-sidebar1">
          <div className="online-user">
            <h3>Online User</h3>
            <img src="https://img.icons8.com/emoji/48/000000/green-circle-emoji.png" />
          </div>
          <div className="list-online-user">
            {listConversation.map((c) => {
              return (
                <button className="list-conver" onClick={() => navigate(`/messages/${c.receiver._id}`)}>
                  <div>
                    <img src={c.receiver.imgUrl} />
                  </div>
                  <p className="list-conver-nav">{c.receiver.firstName + " " + c.receiver.lastName}</p> 
                </button>
                
              );
            })}
          </div>
        </div>
        <div className="message-screen-content1">
          <div className="message-navbar">
            <div className="chat-username"><strong>{receiver?.firstName + " " + receiver?.lastName}</strong></div>
            
          </div>
          <div className="conversation">
            { messages &&
            messages.map((m) => {
              return (
                <div ref={scrollRef}>
                  <Message message={m} receiver={receiver} info={accountInfo} own={m.senderId === accountInfo._id} />
                </div>
              );
            })}
          </div>
          <div className="input-chat">
            <input
              placeholder="Type something"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default MessageUserScreen;
