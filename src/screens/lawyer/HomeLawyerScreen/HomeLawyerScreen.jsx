import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AuthAction from "../../../redux/actions/AuthAction";
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import { useDispatch, useSelector } from "react-redux";
import { UserStatus } from "../../../redux/constants";
import { BellOutlined, ConsoleSqlOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import "./style.scss";
import { SocketContext } from "../../../core/config/socket.config";

const HomeLawyerScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState();
  const {
    authState: { accountInfo, token },
  } = useSelector((state) => {
    return { authState: state.authState };
  });
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");

  const { socket, setSocket, setCall , call } = useContext(SocketContext);

  useEffect(() => {
    socket.on("notification", showNoti);
  }, []);

  const showNoti = () => {
    alert("Xác nhận luật sư thành công");
  };

  const asyncGetAccountInfo = async () => {
    const response = await dispatch(
      await AuthAction.asyncGetAccountInfo("lawyer")
    );
    if (!response) {
      navigate("/lawyer/login");
    }
  };

  useEffect(() => {
    asyncGetAccountInfo();
  }, []);

  // console.log(accountInfo);
  // useEffect(() => {
  //     if(accountInfo != null){
  //         setSocket(accountInfo?.id)
  //     }
  // }, [])

  // useEffect(() => {
  //     setUser(accountInfo.email);
  // }, [])

  // console.log(user);

  // useEffect(() => {
  //     setSocket(io("http://localhost:5000"));
  // }, []);
  // console.log(socket)

  // useEffect(() => {
  //     socket?.emit("newUser", user);
  // }, [socket, user]);

  // // useEffect(() => {
  // //     socket.on("getNotification", (data) => {
  // //       setNotifications((prev) => [...prev, data]);
  // //     });
  // //   }, [socket]);

  // const displayNotification = ({ senderName, type }) => {
  //     let action;

  //     if (type === 2) {
  //         action = "approved";
  //     } else if (type === 3) {
  //         action = "not approved";
  //     } else {
  //         action = "delete";
  //     }
  //     return (
  //         <span className="notification">{`Admin ${action} your account.`}</span>
  //     );
  // };

  // const handleRead = () => {
  //     setNotifications([]);
  //     setOpen(false);
  // }

  return (
    accountInfo !== null && (
      <div className="lawyer-page">
        <h1>Chào mừng đến với trang quản trị web luật sư</h1>
        <div>{/* <img src={accountInfo.avatar} alt="avatar"></img> */}</div>
      </div>
    )
  );
};

export default HomeLawyerScreen;
