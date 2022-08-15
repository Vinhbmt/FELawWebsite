import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../../core/config/socket.config";
import AuthAction from "../../../redux/actions/AuthAction";
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import Message from "../../../components/Message/Message";
import "./style.scss";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MessageLawyerScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const {socket} = useContext(SocketContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [receiver, setReceiver] = useState(null);
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
    const response = await dispatch(await AuthAction.asyncGetAccountInfo("lawyer"));
    if(!response) {
      navigate('/lawyer/login');
    }
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

  const getConversation = async () => {
    const response = await dispatch(
      await AccountUserAction.asyncGetConversation(params.userId)
    );
    console.log(response);
    if (response.status == 200) {
      setMessageList(response.data.listMessages);
      setConversation(response.data.conversationId);
      setReceiver(response.data.receiver);
    }
  };

  const getListConversation = async () => {
    const response = await dispatch(
      await AccountUserAction.asyncGetListConversation()
    );
    console.log(response);
    if (response.status == 200) {
      setListConversation(response.data);
    }
  };

  useEffect(async () => {
    await getConversation();
    await getListConversation();
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [params]);

  const handleOpenConver = async (id) => {
    const response = await dispatch(
      await AccountUserAction.asyncGetConversation(id)
    );
    console.log(response)
    if (response.status == 200) {
      setMessageList(response.data.listMessages);
      setConversation(response.data.conversationId);
      setReceiver(response.data.receiver);
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
    <div className="message-screen14">
      <div className="message-screen-container13">
        <div className="message-screen-sidebar1">
          <div className="online-user1">
            <h3>Online User</h3>
            <img src="https://img.icons8.com/emoji/48/000000/green-circle-emoji.png" />
          </div>
          <div className="list-online-user1">
            { listConversation.length > 0 &&
            listConversation.map((c) => {
              return (
                <button className="list-conver1" onClick={() => navigate(`/lawyer/message/${c.receiver._id}`)}>
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
          {receiver ?
          <div className="message-navbar1">
            <div className="chat-username1"><strong>{receiver.firstName + " " + receiver.lastName} </strong></div>
            <div className="video-call">
              <i class="fas fa-video"></i>
            </div>
          </div>
          :
          <div className="message-navbar1"></div>
          }
          {
            messageList.length > 0 ?
          <div className="conversation1">
            {messageList.map((m) => {
              return (
                <div ref={scrollRef}>
                  <Message message={m} receiver={receiver} info={accountInfo} own={m.senderId == accountInfo.id} />
                </div>
              );
            })}
          </div>
          :
          <div className="conversation2" >Chưa có tin nhắn</div>
          }
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
