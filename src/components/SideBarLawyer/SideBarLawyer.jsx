import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import AuthAction from "../../redux/actions/AuthAction";
import classnames from "classnames";
import './style.scss';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';

const SideBarLawyer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authState: { accountInfo, token } } = useSelector(state => {
        return { authState: state.authState };
    })

    //console.log(accountInfo);

    const [ logoutModal, setLogoutModal ] = useState(false);

    const handleShowLogout = () => {
        setLogoutModal(true);
    }
    const handleCloseLogout = () => {
        setLogoutModal(false);
    }

    // const asyncGetAccountInfo = async () => {
    //     const response = await dispatch(await AuthAction.asyncGetAccountInfo());
    //     if(!response) {
    //         navigate('/lawyer/login');
    //     }
    // }

    // useEffect(() => {
    //     if(token !== null && token !== undefined && token !== false) {
    //         asyncGetAccountInfo();
    //     }
    // }, [])

    const onSubmitLogout = async () => {
        await dispatch(await AuthAction.asyncLogout());
        navigate('/lawyer/login');
    }

    return(
        accountInfo !== null &&
         <div className={(classnames("left-menu1"))}>
            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <NavLink to="/lawyer/home">
                        <span>Xin chào {accountInfo.lastName}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/lawyer/update_lawyer_info'>
                        <span>Cập nhập thông tin</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/lawyer/appointment'>
                        <span>Cuộc hẹn</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/lawyer/message'>
                        <span>Tin nhắn</span>
                    </NavLink>
                </li>
                <li onClick={handleShowLogout}>
                    <a><span>Đăng xuất</span></a>
                </li>
            </ul>

            <Modal show={logoutModal} enforceFocus={false} className="modal-min modal-alert">
                    <Modal.Header>
                        <Modal.Title></Modal.Title>
                        <button className={classnames("btn-close")} onClick={handleCloseLogout}></button>
                    </Modal.Header>
                    <Modal.Body>
                        Xác nhận thoát? 
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" onClick={onSubmitLogout}>Logout</button>
                        <button className="btn btn-default" onClick={handleCloseLogout}>Cancel</button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default SideBarLawyer;