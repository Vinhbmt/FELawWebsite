import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../../core/config/socket.config";
import AuthAction from "../../../redux/actions/AuthAction";
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import Message from "../../../components/Message/Message";
import "./style.scss";
import { useRef } from "react";

const MessageLawyerScreen = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [conversation, setConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [listConversation, setListConversation] = useState([]);
  const {
    authState: { accountInfo, token },
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

  // useEffect(() => {
  //     socket.on("message", (data) => {
  //         //console.log(data);
  //         setReceiverId(data.senderId);
  //     });
  // }, [])

  // console.log(receiverId);

  // const getConversation = async () => {
  //     const response = await dispatch(await AccountUserAction.asyncGetConversation(receiverId));
  //     if(response.status == 200){
  //         setMessageList(response.data.listMessages);
  //         setConversation(response.data.conversationId);
  //     }
  // }

  // useEffect(() => {
  //     getConversation();
  // }, [])

  const getListConversation = async () => {
    const response = await dispatch(
      await AccountUserAction.asyncGetListConversation()
    );
    console.log(response);
    if (response.status == 200) {
      setListConversation(response.data);
    }
  };

  useEffect(() => {
    getListConversation();
  }, []);

  const handleOpenConver = async (id) => {
    const response = await dispatch(
      await AccountUserAction.asyncGetConversation(id)
    );
    if (response.status == 200) {
      setMessageList(response.data.listMessages);
      setConversation(response.data.conversationId);
    }
  };

  socket.on("message", (data) => {
    console.log("receiver message", data);
    setMessageList([...messageList, data]);
  });

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

        setMessageList([
          ...messageList,
          {
            conversationId: conversation,
            senderId: accountInfo.id,
            content: newMessage,
          },
        ]);
        setNewMessage("");
        socket.emit("message", {
          conversationId: conversation,
          senderId: accountInfo.id,
          content: newMessage,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const sendMessage = async () => {
  //     if (currentMessage !== "") {
  //         const messageData = {
  //             author: accountInfo.lastName,
  //             message: currentMessage,
  //             time:
  //                 new Date(Date.now()).getHours() +
  //                 ":" +
  //                 new Date(Date.now()).getMinutes(),
  //         };

  //         await socket.emit("send_message", messageData);
  //         setMessageList((list) => [...list, messageData]);
  //         setCurrentMessage("");
  //     }
  // };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(event);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <div className="message-screen1">
      <div className="message-screen-container1">
        <div className="message-screen-sidebar1">
          <div className="online-user1">
            <h3>Online User</h3>
            <img src="https://img.icons8.com/emoji/48/000000/green-circle-emoji.png" />
          </div>
          <div className="list-online-user1">
            {listConversation.map((c) => {
              return (
                <div onClick={() => handleOpenConver(c.receiver._id)}>
                  {c.receiver.firstName + " " + c.receiver.lastName}{" "}
                </div>
              );
            })}
          </div>
        </div>
        <div className="message-screen-content1">
          <div className="message-navbar1">
            <div className="chat-username1">Vinh</div>
            <div className="video-call">
              <i class="fas fa-video"></i>
            </div>
          </div>
          <div className="conversation1">
            {messageList.map((m) => {
              return (
                <div ref={scrollRef}>
                  <Message message={m} own={m.senderId == accountInfo.id} />
                </div>
              );
            })}
          </div>
          <div className="input-chat1">
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

export default MessageLawyerScreen;
