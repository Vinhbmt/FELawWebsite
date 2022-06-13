import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactLogo from './logo.svg';
import "./style.scss";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import ApiAction from "../../redux/actions/ApiAction";
import AuthAction from "../../redux/actions/AuthAction";

const HeaderUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {authState: {accountInfo, token}} = useSelector (state => {
        return { authState: state.authState };
    })


    const onSubmitLogout = () =>{
        dispatch(AuthAction.actLogout());
        navigate('/login');
    }

    // useEffect(() => {
    //     onSubmitLogout()
    // }, [])

    
    return(
        <div className="header">
            <div className="header_logo">
                <img className="logo" src={ReactLogo} alt="React Logo" />
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
                                <a href="#">Bảo hiểm</a>
                                <a href="#">Dân sự</a>
                                <a href="#">Đất đai</a>
                                <a href="#">Doanh nghiệp</a>
                                <a href="#">Giao thông vận tải</a>
                                <a href="#">Hành chính</a>
                                <a href="#">Hình sự</a>
                                <a href="#">Hôn nhân gia đình</a>
                                <a href="#">Lao động</a>
                                <a href="#">Sở hữu trí tuệ</a>
                                <a href="#">Thừa kế đất đai</a>
                                <a href="#">Thuế</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="dropdown">
                            <button class="dropbtn">Tư vấn pháp luật</button>
                            <div class="dropdown-content">
                                <a href="#">Bài viết pháp luật</a>
                                <a href="#">Câu hỏi pháp luật</a>
                                <a href="#">Biểu mẫu</a>
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
                    accountInfo == null ?
                    <a onClick={() => navigate(`/login`)}>Đăng nhập</a>
                    :
                    <div className="account-info">
                        <div className="user-name">Hello {accountInfo.lastName}</div>
                        <div>
                            <a onClick={() => {onSubmitLogout()}}>Đăng xuất</a>
                        </div>
                    </ div>
                }
            </div>
        </div>
    )
}

export default HeaderUser;