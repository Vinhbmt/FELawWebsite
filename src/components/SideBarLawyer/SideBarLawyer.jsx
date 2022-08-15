import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import AuthAction from "../../redux/actions/AuthAction";
import AccountUserAction from "../../redux/actions/AccountUserAction";
import classnames from "classnames";
import "./style.scss";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { SocketContext } from "../../core/config/socket.config";
import { format } from "timeago.js";

const SideBarLawyer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [openNoti, setOpenNoti] = useState(false);
  const [showCounter, setShowCounter] = useState(false);
  const [meetingId, setMeetingId] = useState("");
  const {
    authState: { accountInfo, token },
  } = useSelector((state) => {
    return { authState: state.authState };
  });
  const {
    socket,
    setCall,
    answerCall,
    call,
    callAccepted,
    setCallAccepted,
    setName,
  } = useContext(SocketContext);

  const getListNotification = async () => {
    const response = await dispatch(
      await AccountUserAction.asyncGetNotification()
    );
    if (response.status == 200) {
      setNotifications(response.data);
    }
  };

  useEffect(() => {
    getListNotification();
    socket.on("notification", (data) => {
      console.log(data);
      setNotifications((prev) => [data, ...prev]);
      setShowCounter(true);
    });
    socket.on("callUser", ({ from, name: callerName, signal, meetingId }) => {
      console.log("123");
      setCall({
        isReceivingCall: true,
        from,
        name: callerName,
        signal,
        meetingId,
      });
      setVideoCallModal(true);
    });
  }, [socket]);

  console.log("call", call);

  const [logoutModal, setLogoutModal] = useState(false);
  const [videoCallModal, setVideoCallModal] = useState(true);

  const handleShowLogout = () => {
    setLogoutModal(true);
  };
  const handleCloseLogout = () => {
    setLogoutModal(false);
  };

  const handleCloseVideoCall = () => {
    setVideoCallModal(false);
    setCallAccepted(false);
  };

  const handleAcceptVideoCall = () => {
    navigate(`/videocall/${call.meetingId}`);
    setVideoCallModal(false);
    answerCall(accountInfo.lastName);
  };
  const asyncGetAccountInfo = async () => {
    const response = await dispatch(
      await AuthAction.asyncGetAccountInfo("lawyer")
    );
    if (!response) {
      navigate("/lawyer/login");
    }
  };

  useEffect(async () => {
    if (token !== null && token !== undefined && token !== false) {
      await asyncGetAccountInfo();
    }
  }, []);

  console.log('callAccepted',callAccepted);
  const onSubmitLogout = async () => {
    await dispatch(await AuthAction.asyncLogout());
    navigate("/lawyer/login");
  };

  return (
    accountInfo !== null && (
      <div className={classnames("left-menu1")}>
        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <NavLink to="/lawyer/home">
              <span>Xin chào {accountInfo.lastName}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/lawyer/update_lawyer_info">
              <span>Cập nhập thông tin</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/lawyer/change_password">
              <span>Đổi mật khẩu</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/lawyer/appointment">
              <span>Cuộc hẹn</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/lawyer/messenger">
              <span>Tin nhắn</span>
            </NavLink>
          </li>
          <li
            className="notification-sidebar"
            onClick={() => {
              setOpenNoti(!openNoti);
              setShowCounter(false);
            }}
          >
            <a>
              <span>Thông báo</span>
              {notifications.length > 0 && showCounter && (
                <span className="counter1">{notifications.length}</span>
              )}
            </a>
          </li>
          {openNoti && (
            <div className="notifications1">
              {notifications.map((n) => {
                return (
                  <span>
                    <a
                      className="notification"
                      href={n.url || "javascript:void(0)"}
                    >
                      {n.content}
                    </a>
                    <div className="messageBottom1">{format(n.createdAt)}</div>
                  </span>
                );
              })}
              {/* <button className="nButton" onClick={handleRead}>
                                Mark as read
                            </button> */}
            </div>
          )}
          <li onClick={handleShowLogout}>
            <a>
              <span>Đăng xuất</span>
            </a>
          </li>
        </ul>
        <Modal
          show={call.isReceivingCall && !callAccepted && videoCallModal}
          enforceFocus={false}
          className="modal-min modal-alert"
        >
          <Modal.Header>
            <Modal.Title></Modal.Title>
            <button
              className={classnames("btn-close")}
              onClick={handleCloseVideoCall}
            ></button>
          </Modal.Header>
          <Modal.Body>{call.name} đang gọi</Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={handleAcceptVideoCall}>
              Đồng ý
            </button>
            <button className="btn btn-danger" onClick={handleCloseVideoCall}>
              Từ chối
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={logoutModal}
          enforceFocus={false}
          className="modal-min modal-alert"
        >
          <Modal.Header>
            <Modal.Title></Modal.Title>
            <button
              className={classnames("btn-close")}
              onClick={handleCloseLogout}
            ></button>
          </Modal.Header>
          <Modal.Body>Xác nhận thoát?</Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={onSubmitLogout}>
              Logout
            </button>
            <button className="btn btn-default" onClick={handleCloseLogout}>
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  );
};

export default SideBarLawyer;
