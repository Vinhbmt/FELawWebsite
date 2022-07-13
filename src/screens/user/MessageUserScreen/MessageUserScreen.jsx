import React, { useContext } from "react";
import "./style.scss"
import { SocketContext } from "../../../core/config/socket.config";
import { useState } from "react";
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useSelection from "antd/lib/table/hooks/useSelection";
import AuthAction from "../../../redux/actions/AuthAction";

const MessageUserScreen = () => {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    const param = useParams();
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState(null);
    const [conversation, setConversation] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const { authState: { accountInfo } } = useSelector(state => {
        return { authState: state.authState };
    })

    const asyncGetAccountInfo = async () => {
        const response = await dispatch(await AuthAction.asyncGetAccountInfo());
    }

    useEffect(() => {
        asyncGetAccountInfo();
    }, [])

    console.log(accountInfo)

    const sow = () => {
        alert("ddcm");
    }

    socket.on("message",sow);

    
    const getConversation = async () => {
        const response = await dispatch(await AccountUserAction.asyncGetConversation(param.lawyerId));
        console.log(response);
        if(response.status == 200){
            setMessages(response.data.listMessages);
            setConversation(response.data.conversationId);
        }
    }

    useEffect(() => {
        getConversation();
    }, [])

    const handleSendMessage = () => {
        socket.emit("message", {
            conversationId: conversation,
            senderId:accountInfo.id,
            content: newMessage
        })
    }
    

    return(
        <div className="message-screen">
            <div className="message-screen-padding"></div>
            <div className="message-screen-container">
                <div className="message-screen-sidebar">
                    <div className="online-user">
                        <h3>Online User</h3>
                        <img src="https://img.icons8.com/emoji/48/000000/green-circle-emoji.png"/>
                    </div>
                    <div className="list-online-user">
                        <ul>
                            <li>
                                Vinh
                            </li>
                            <li>
                                Vinh
                            </li>
                            <li>
                                Vinh
                            </li>
                            <li>
                                Vinh
                            </li>
                            <li>
                                Vinh
                            </li>
                            <li>
                                Vinh
                            </li>
                            <li>
                                Vinh
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="message-screen-content">
                    <div className="message-navbar">
                        <div className="chat-username">
                            Vinh
                        </div>
                        <div className="video-call"><i class='fas fa-video'></i></div>
                    </div>
                    <div className="conversation">
                        {messages.map((m) => {
                            return (
                                <div className={m.senderId == param.lawyerId ? "guest" : "me"}>{m.content}</div>
                            )
                        })}
                    </div>
                    <div className="input-chat">
                        <input placeholder="Type something" onChange={(e) => setNewMessage(e.target.value)} />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageUserScreen