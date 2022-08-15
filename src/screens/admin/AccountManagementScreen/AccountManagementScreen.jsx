import React, { useContext, useEffect, useState } from "react";
import classnames from 'classnames';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import './style.scss';
import { EyeOutlined, DeleteOutlined, CloudUploadOutlined } from "@ant-design/icons"
import users from "../../../data";
import AccountAdminAction from "../../../redux/actions/AccountAdminAction";
import AuthAction from "../../../redux/actions/AuthAction";
import { UserStatus } from "../../../redux/constants";
import { toast } from 'react-toastify';
import { SocketContext } from "../../../core/config/socket.config";
import LawyerAdminAction from "../../../redux/actions/LawyerAdminAction";

const AccountManagementScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [listUsers, setListUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ratingScore, setRatingScore] = useState(null);
    const [activeSelect, setActiveSelect] = useState("0");
    const socket = useContext(SocketContext)

    const asyncGetAccountInfo = async () => {
        const response = await dispatch(await AuthAction.asyncGetAccountInfo("admin"));
        if (!response) {
            navigate('/admin/login');
        }
    }

    useEffect(() => {
        asyncGetAccountInfo();
    }, [])

    const getListUser = async (select) => {
        const response = await dispatch(await LawyerAdminAction.asyncGetLawyer(select, {}));
        if(response.status === 201) {
            console.log(response)
            await setListUsers(response.data);
            setLoading(false);
        }
    }

    useEffect(() => {
        getListUser(activeSelect);
    }, [activeSelect, loading])

    const handleBlockUser = async (user, type) => {
        const response = await dispatch( await LawyerAdminAction.asyncUpdateLawyer(user.email, type, ""));
        if(response.status == 200){
            setLoading(true);
            socket.emit("notification", {
                userId: user.id,
                content: "Tài khoản của bạn đã bị chặn!"
              });
            toast.warning("Đã chặn người dùng!");
        }
    }

    const handleUnblockUser = async (user, type) => {
        const response = await dispatch( await LawyerAdminAction.asyncUpdateLawyer(user.email, type, ""));
        if(response.status == 200){
            setLoading(true);
            socket.emit("notification", {
                userId: user.id,
                content: "Tài khoản của bạn đã được bỏ chặn!"
              });
            toast.warning("Đã bỏ chặn người dùng!");
        }
    }


    return (
        <div className="user-container">
            <h1>Quản lý người dùng</h1>
            <div className="status-select">
                <select defaultValue="1" onChange={(e) => setActiveSelect(e.target.value) }>
                    <option value="0">Đang hoạt động</option>
                    <option value="4">Bị chặn</option>                    
                </select>
            </div>
            <div  className="child-container">                
                <div className="user-info">
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Họ</th>
                                <th>Tên</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        { listUsers.length > 0 ?
                        <tbody>
                            { listUsers.map((user, index) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>
                                            {activeSelect == 0 &&
                                             <button className="btn btn-danger" onClick={handleBlockUser(user, 4)}>Chặn</button>
                                            }
                                            {activeSelect == 4 &&
                                             <button className="btn btn-danger" onClick={handleUnblockUser(user, 0)}>Bỏ chặn</button>
                                            }
                                        </td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                        :
                        <tbody>
                            <tr>
                                <td colSpan={5}>Không có người dùng</td>
                            </tr>
                        </tbody> }
                    </table>
                    {/* <Table
                        limit='10'
                        headData={userTableHead}
                        renderHead={(item, index) => renderHead(item, index)}
                        bodyData={users}
                        renderBody={(item, index) => renderBody(item, index)}
                    /> */}
                </div>
            </div>
        </div>
    )
}

export default AccountManagementScreen