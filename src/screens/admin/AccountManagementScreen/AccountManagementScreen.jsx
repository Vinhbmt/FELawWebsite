import React, { useEffect, useState } from "react";
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
import { UserStatus } from "../../../redux/constants";

const AccountManagementScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [listUsers, setListUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ratingScore, setRatingScore] = useState(null);
    const [activeSelect, setActiveSelect] = useState("1");

    const getListUser = async () => {
        const response = await dispatch(await AccountAdminAction.asyncGetUser());
        if(response.status === 200) {
            await setListUsers(response.data);
            setLoading(false);
        }
    }

    useEffect(() => {
        getListUser();
    }, [])

    return (
        <div className="user-container">
            <h1>Quản lý người dùng</h1>
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
                                             <button className="btn btn-danger">Chặn</button>
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