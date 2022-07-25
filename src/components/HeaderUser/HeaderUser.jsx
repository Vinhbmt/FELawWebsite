import React, { useContext, useEffect, useState } from "react";
import {NavLink, useNavigate } from "react-router-dom";
import ReactLogo from './logo.svg';
import "./style.scss";
import classnames from "classnames";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import ApiAction from "../../redux/actions/ApiAction";
import AuthAction from "../../redux/actions/AuthAction";
import { Modal } from 'react-bootstrap';
import { SocketContext } from "../../core/config/socket.config";
import AccountUserAction from "../../redux/actions/AccountUserAction";
import { format } from "timeago.js";

const HeaderUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [openNoti, setOpenNoti] = useState(false);
    const [showCounter, setShowCounter] = useState(false);
    const {authState: {accountInfo, token}} = useSelector (state => {
        return { authState: state.authState };
    })
    const {socket} = useContext(SocketContext);

    
    
    const getListNotification = async () => {
        const response = await dispatch(await AccountUserAction.asyncGetNotification());
        if(response.status == 200) {
            setNotifications(response.data);
        }
    }

    useEffect(() => {
        getListNotification();
        socket.on("notification", (data) => {
            console.log(data);
            setNotifications((prev) => [data, ...prev]);
            setShowCounter(true);
        }); 
    }, [socket])

    

    console.log(notifications);

    const asyncGetAccountInfo = async () => {
            const response = await dispatch(await AuthAction.asyncGetAccountInfo("user"));
        }
    
    useEffect(() => {
            asyncGetAccountInfo();
    }, [])

    const [ logoutModal, setLogoutModal ] = useState(false);

    console.log(accountInfo);

    const handleShowLogout = () => {
        setLogoutModal(true);
    }
    const handleCloseLogout = () => {
        setLogoutModal(false);
    }


    const onSubmitLogout = async () =>{
        await dispatch(await AuthAction.asyncLogout());
        handleCloseLogout();
        navigate('/');
    }

    // useEffect(() => {
    //     onSubmitLogout()
    // }, [])

    
    return(
        <div className="header">
            <div className="header_logo">
                <img className="logo" onClick={() => {navigate('/')}} src={ReactLogo} alt="React Logo" />
            </div>
            {/* <div className="search-box">
                <input className="search-txt" type="text" placeholder="Type to search" />
                <a className="search-btn">
                    <i class="fa fa-search"></i>
                </a>
            </div> */}
            <nav className="dropdownmenu_container">
                <ul className="dropdownmenu_children">
                    <li>
                    <div class="dropdown">
                            <button class="dropbtn">Tìm luật sư</button>
                            <div class="dropdown-content">
                                <NavLink to="/major/LV01">Bảo hiểm</NavLink>
                                <NavLink to="/major/LV02">Dân sự</NavLink>
                                <NavLink to="/major/LV03">Đất đai</NavLink>
                                <NavLink to="/major/LV04">Doanh nghiệp</NavLink>
                                <NavLink to="/major/LV05">Giao thông vận tải</NavLink>
                                <NavLink to="/major/LV06">Hành chính</NavLink>
                                <NavLink to="/major/LV07">Hình sự</NavLink>
                                <NavLink to="/major/LV08">Hôn nhân gia đình</NavLink>
                                <NavLink to="/major/LV09">Lao động</NavLink>
                                <NavLink to="/major/LV10">Sở hữu trí tuệ</NavLink>
                                <NavLink to="/major/LV11">Thừa kế đất đai</NavLink>
                                <NavLink to="/major/LV12">Thuế</NavLink>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="dropdown">
                            <button class="dropbtn">Tư vấn pháp luật</button>
                            <div class="dropdown-content">
                                <NavLink to="/major/LV01">Bài viết pháp luật</NavLink>
                                <NavLink to="/major/LV01">Câu hỏi pháp luật</NavLink>
                                <NavLink to="/major/LV01">Biểu mẫu</NavLink>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="dropdown">
                            <button class="dropbtn">Dịch vụ pháp lý</button>
                        </div>
                    </li>
                    <li>
                    <div class="dropdown">
                            <button class="dropbtn">Đặt câu hỏi miễn phí</button>
                        </div>
                    </li>
                </ul>    
            </nav>
            <div className="login">
                {
                    accountInfo !== null && accountInfo.role == "user" ?
                    <>
                        <div className="account-info">
                            <div className="user-name">Hello {accountInfo.lastName}</div>
                                <div className="dropdown-content ">
                                    <NavLink to='/profile'>Trang cá nhân</NavLink>
                                    <NavLink to='/messenger'>Tin nhắn</NavLink>
                                    <NavLink to='/update_info'>Cập nhật thông tin</NavLink>
                                    <NavLink to='/change-password'>Đổi mật khẩu</NavLink>   
                                    <NavLink to='/meeting'>Cuộc hẹn</NavLink>                             
                                    <a onClick={handleShowLogout}>Đăng xuất</a>
                                </div>                     
                        </ div>
                        <span className="noti-icon"  onClick={() => {
                                setOpenNoti(!openNoti);
                                setShowCounter(false);
                                }
                            }
                            >
                            <img src="https://img.icons8.com/ios-filled/50/000000/appointment-reminders--v1.png"/>
                            {
                                notifications.length >0 && showCounter &&
                                <div className="counter">{notifications.length}</div>
                            }
                        </span>

                        {openNoti && (
                            <div className="notifications">
                            {notifications.map((n) => {
                                return(
                                    <span>
                                        <a className="notification" href={n.url} >{n.content}</a>
                                        <div className="messageBottom1">{format(n.createdAt)}</div>
                                    </span>
                                    
                                )
                            })}
                            {/* <button className="nButton" onClick={handleRead}>
                                Mark as read
                            </button> */}
                            </div>
                        )}
                    </>  
                    :
                    <div className="login-btn">
                        <a onClick={() => navigate(`/login`)}>Đăng nhập</a>                      
                    </div>
                    
                }
            </div>
            <Modal show={logoutModal} enforceFocus={false} className="modal-min modal-alert">
                    <Modal.Header>
                        <Modal.Title></Modal.Title>
                        <button className={classnames("btn-close")} onClick={handleCloseLogout}></button>
                    </Modal.Header>
                    <Modal.Body>
                        Xác nhận thoát? 
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" onClick={onSubmitLogout}>Đăng xuất</button>
                        <button className="btn btn-light" onClick={handleCloseLogout}>Hủy</button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default HeaderUser;