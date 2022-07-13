import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../../core/config/socket.config";
import AuthAction from "../../../redux/actions/AuthAction";

const MessageLawyerScreen = () => {
    const dispatch = useDispatch();
    const socket = useContext(SocketContext)
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const { authState: { accountInfo, token } } = useSelector(state => {
        return { authState: state.authState };
    })

    const asyncGetAccountInfo = async () => {
        const response = await dispatch(await AuthAction.asyncGetAccountInfo());
    }

    useEffect(() => {
        asyncGetAccountInfo();
    }, [])
    console.log(accountInfo)

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                author: accountInfo.lastName,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });
      }, [socket]);


    return (
        <div className="chat-screen-container">
            <div className="chat-side">

            </div>
            <div className="chat-screen">
                
            </div>
        </div>
    )
}

export default MessageLawyerScreen;