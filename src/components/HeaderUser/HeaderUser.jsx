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
                            <button class="dropbtn">T??m lu???t s??</button>
                            <div class="dropdown-content">
                                <NavLink to="/major/LV01">B???o hi???m</NavLink>
                                <NavLink to="/major/LV02">D??n s???</NavLink>
                                <NavLink to="/major/LV03">?????t ??ai</NavLink>
                                <NavLink to="/major/LV04">Doanh nghi???p</NavLink>
                                <NavLink to="/major/LV05">Giao th??ng v???n t???i</NavLink>
                                <NavLink to="/major/LV06">H??nh ch??nh</NavLink>
                                <NavLink to="/major/LV07">H??nh s???</NavLink>
                                <NavLink to="/major/LV08">H??n nh??n gia ????nh</NavLink>
                                <NavLink to="/major/LV09">Lao ?????ng</NavLink>
                                <NavLink to="/major/LV10">S??? h???u tr?? tu???</NavLink>
                                <NavLink to="/major/LV11">Th???a k??? ?????t ??ai</NavLink>
                                <NavLink to="/major/LV12">Thu???</NavLink>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="dropdown">
                            <button class="dropbtn">T?? v???n ph??p lu???t</button>
                            <div class="dropdown-content">
                                <NavLink to="/major/LV01">B??i vi???t ph??p lu???t</NavLink>
                                <NavLink to="/major/LV01">C??u h???i ph??p lu???t</NavLink>
                                <NavLink to="/major/LV01">Bi???u m???u</NavLink>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="dropdown">
                            <button class="dropbtn">D???ch v??? ph??p l??</button>
                        </div>
                    </li>
                    <li>
                    <div class="dropdown">
                            <button class="dropbtn">?????t c??u h???i mi???n ph??</button>
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
                                    <NavLink to='/profile'>Trang c?? nh??n</NavLink>
                                    <NavLink to='/messenger'>Tin nh???n</NavLink>
                                    <NavLink to='/update_info'>C???p nh???t th??ng tin</NavLink>
                                    <NavLink to='/change-password'>?????i m???t kh???u</NavLink>   
                                    <NavLink to='/meeting'>Cu???c h???n</NavLink>                             
                                    <a onClick={handleShowLogout}>????ng xu???t</a>
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
                        <a onClick={() => navigate(`/login`)}>????ng nh???p</a>                      
                    </div>
                    
                }
            </div>
            <Modal show={logoutModal} enforceFocus={false} className="modal-min modal-alert">
                    <Modal.Header>
                        <Modal.Title></Modal.Title>
                        <button className={classnames("btn-close")} onClick={handleCloseLogout}></button>
                    </Modal.Header>
                    <Modal.Body>
                        X??c nh???n tho??t? 
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" onClick={onSubmitLogout}>????ng xu???t</button>
                        <button className="btn btn-light" onClick={handleCloseLogout}>H???y</button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default HeaderUser;