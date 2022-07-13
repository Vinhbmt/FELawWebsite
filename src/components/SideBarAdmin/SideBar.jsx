import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import AuthAction from "../../redux/actions/AuthAction";
import classnames from "classnames";
import './style.scss';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';

const SideBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authState: { accountInfo, token } } = useSelector(state => {
        return { authState: state.authState };
    })

    const [ logoutModal, setLogoutModal ] = useState(false);

    const handleShowLogout = () => {
        setLogoutModal(true);
    }
    const handleCloseLogout = () => {
        setLogoutModal(false);
    }

    // const asyncGetAccountInfo = async () => {
    //     const response = await dispatch(await AuthAction.asyncGetAccountInfo("admin"));
    //     if(!response) {
    //         navigate('/admin/login');
    //     }
    // }

    // useEffect(async () => {
    //     if(token !== null && token !== undefined && token !== false) {
    //         asyncGetAccountInfo();
    //     }
    // }, [])

    const onSubmitLogout = async () => {
        await dispatch(await AuthAction.asyncLogout());
        navigate('/admin/login');
    }

    return(
        // accountInfo !== null &&
         <div className={(classnames("left-menu"))}>
            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <NavLink to="/admin/home">
                        <span>Admin</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/admin/account'>
                        <span>Quản lý tài khoản</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/admin/lawyer'>
                        <span>Quản lý luật sư</span>
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
                        <button className="btn btn-danger" onClick={onSubmitLogout}>Đăng xuất</button>
                        <button className="btn btn-light" onClick={handleCloseLogout}>Hủy</button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default SideBar;