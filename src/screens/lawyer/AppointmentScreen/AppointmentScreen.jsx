import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../../core/customHook";
import AccountAdminAction from "../../../redux/actions/AccountAdminAction";
import "./style.scss"

const AppointmentScreen = () => {
    useTitle("Cuộc hẹn với khách hàng");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [listUsers, setListUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ratingScore, setRatingScore] = useState(null);
    const [activeSelect, setActiveSelect] = useState("1");

    const [socket, setSocket] = useState(null);

    
    return (
        <div className="appoint-container">
            <h1>Quản lý cuộc hẹn</h1>
            <div  className="child-container">                
                <div className="appoint-info">
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Tên khách hàng</th>
                                <th>Ngày</th>
                                <th>Giờ</th>
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

export default AppointmentScreen;