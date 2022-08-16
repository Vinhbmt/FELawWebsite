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
  const [listMeetings, setListMeetings] = useState([]);

  const { socket, setSocket, setCall , call } = useContext(SocketContext);

  const asyncGetAccountInfo = async () => {
    const response = await dispatch(
      await AuthAction.asyncGetAccountInfo("lawyer")
    );
    if (!response) {
      navigate("/lawyer/login");
    }
  };
  console.log(accountInfo)

  useEffect(() => {
    asyncGetAccountInfo();
  }, []);

  function getCashString(amount) {
    if (!amount) {
        return '-'
    }
    const split = `${Math.abs(amount)}`.split('')
    const arrayLength = split.length

    if (arrayLength <= 3) {
        return `${amount}`
    }
    const numberOfComma = Math.floor((arrayLength - 1) / 3)

    for (let i = 1; i <= numberOfComma; i++) {
        split.splice(arrayLength - 3 * i, 0, ',')
    }
    amount < 0 && (split.unshift('-'))
    return split.join('')
    }

    const getListMeeting = async () => {
      const response = await dispatch(await AccountUserAction.asyncGetListAppointment(0))
      console.log(response);
      if(response.status === 200) {
      setListMeetings(response.data);
      }
  }

  useEffect(() => {
      getListMeeting();
  }, [])

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
        <div>{/* <img src={accountInfo.avatar} alt="avatar"></img> */}
          <div className="user-wallet">
            <div className="user-wallet-container">
              <div className="charge">Số dư khả dụng</div>
              <div className="wallet"><i className='fas  fa-wallet'></i>{` ${getCashString(accountInfo.balance)} VND`}</div>
            </div>
          </div>
          <div className="table-admin-home1">
            <h3>Khách hàng gần đây</h3>
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Họ</th>
                  <th>Tên</th>
                </tr>
              </thead>
              {listMeetings.length > 0 ?
                <tbody>
                  {listMeetings.map((user, index) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.userId.email}</td>
                        <td>{user.userId.firstName}</td>
                        <td>{user.userId.lastName}</td>
                      </tr>
                    )
                  })}
                </tbody>
                :
                <tbody>
                  <tr>
                    <td colSpan={5}>Không có người dùng</td>
                  </tr>
                </tbody>}
            </table>
          </div>
        </div>
      </div>
    )
  );
};

export default HomeLawyerScreen;
