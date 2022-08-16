import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../../core/customHook";
import AccountAdminAction from "../../../redux/actions/AccountAdminAction";
import AuthAction from "../../../redux/actions/AuthAction";
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import meetingStatus from "../../../core/utils/meetingStatus";
import "./style.scss"

const AppointmentScreen = () => {
    useTitle("Cuộc hẹn với khách hàng");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [listMeetings, setListMeetings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ratingScore, setRatingScore] = useState(null);
    const [activeSelect, setActiveSelect] = useState("1");
    const [listMeeting, setListMeeting] = useState([]);

    const [socket, setSocket] = useState(null);
    const {
        authState: { accountInfo, token },
      } = useSelector((state) => {
        return { authState: state.authState };
      });

      function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('-');
    }

    function formatTime(time) {
        switch(time) {
            case 1: return "8:00-10:00";
            case 2: return "10:00-12:00";
            case 3: return "13:00-15:00";
            case 4: return "15:00-17:00";
            case 5: return "17:00-19:00";
        }
    }
    
      const asyncGetAccountInfo = async () => {
        const response = await dispatch(await AuthAction.asyncGetAccountInfo("lawyer"));
        if(!response) {
          navigate('/lawyer/login');
        }
      };
    
      useEffect(() => {
        asyncGetAccountInfo();
      }, []);

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

    console.log(listMeeting)

    
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
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        { listMeetings.length > 0 ?
                        <tbody>
                            { listMeetings.map((m, index) => {
                                return (
                                    <tr>
                                        <td>{m.userId.email}</td>
                                        <td>{m.userId.firstName + " " + m.userId.lastName}</td>
                                        <td>{formatDate(m.meetingDate)}</td>
                                        <td>{formatTime(m.timeCode)}</td>
                                        <td>{meetingStatus.codeToStatus[m.status]}</td>
                                        <td onClick={() => navigate(`${m._id}`)}>Xem chi tiết</td>
                                        {/* <td>
                                             <button className="btn btn-danger">Chặn</button>
                                        </td> */}
                                    </tr>
                                )
                            }) }
                        </tbody>
                        :
                        <tbody>
                            <tr>
                                <td colSpan={5}>Không có cuộc hẹn</td>
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