import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import LawyerAction from "../../../redux/actions/LawyerAction";
import { SocketContext } from "../../../core/config/socket.config";
import "./style.scss"

const ViewAppointment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [meetingInfo, setMeetingInfo] = useState(null);
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const {authState: {accountInfo, token}} = useSelector (state => {
        return { authState: state.authState };
    })
    const {socket, callUser, setName} = useContext(SocketContext);

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

    const getAppointment = async () => {
        const response = await dispatch(await AccountUserAction.asyncGetAppointment(params.meetingId))
        console.log(response);
        if(response.status == 200) {
            setMeetingInfo(response.data);
            setName(response.data.lawyerId.lastName);
        }
    }

    useEffect(() => {
        getAppointment();
        setLoading(false)
    }, [loading]);

    socket.on("notification",() => {
        setLoading(true);
    })

    const handleSubmitAppointment = async () => {
        const response = await dispatch(await LawyerAction.asyncUpdateAppointment({"meetingId": params.meetingId, "status": 1, "price": price}));
        console.log(response);
        if(response.status == 200) {
            socket.emit("notification", {
                userId: meetingInfo.userId._id,
                content: `Luật sư ${meetingInfo.lawyerId.firstName + " " + meetingInfo.lawyerId.lastName} đã xác nhận cuộc hẹn`,
                url: `http://localhost:3000/meeting/${meetingInfo._id}`
              });
            toast.success("Xác nhận thành công !");
            setLoading(true);
            //todo: noti to user
        }
    }

    const handleCallVideo = () => {
        navigate(`/videocall/${meetingInfo._id}`);
        callUser(meetingInfo.userId.socketId, meetingInfo.lawyerId.socketId);
    } 

    return(
        meetingInfo != null &&
        <div className="view-appoint-container">
            <div >
                <div className="processing">
                    <div className="processing1">
                        <div className={meetingInfo.status == 0 ? "processing0" : "processing2"}><i class="fa fa-recycle"></i></div>
                        {meetingInfo.status == 0 ?
                            <div>Chờ xác nhận</div>
                            :
                            <div>Đã xác nhận</div>
                        }
                    </div>
                    <i class='fas fa-arrow-right'></i>
                    <div className="processing1">
                        <div className={meetingInfo.status < 2 ? "processing0" : "processing2"}><i class="fa fa-dollar"></i></div>
                        {meetingInfo.status < 2 ?
                            <div>Chờ thanh toán</div>
                            :
                            <div>Đã thanh toán</div>
                        }
                    </div>
                    {/* <i class='fas fa-arrow-right'></i>
                    <div className="processing1">
                        <div className={meetingInfo.status < 3 ? "processing0" : "processing2"}><i class="fa fa-comments"></i></div>
                        <div>Đang trao đổi</div>
                    </div> */}
                    <i class='fas fa-arrow-right'></i>
                    <div className="processing1">
                        <div className={meetingInfo.status < 3 ? "processing0" : "processing2"}><i class="fa fa-check-circle"></i></div>
                        {meetingInfo.status < 2 ?
                            <div>Chưa hoàn thành</div>
                            :
                            <div>Đã hoàn thành</div>
                        }
                    </div>
                </div>
            </div>
            <div className="detail-meeting-container">
                <div className="detail-meeting-title">Thông tin chi tiết cuộc hẹn</div>
                <div className="detail-meeting">
                    <div className="detail-meeting-info">
                        <div className="detail-meeting-info1">
                            <label>Tên khách hàng: </label>
                            <div>{meetingInfo.userId.firstName + " " + meetingInfo.userId.lastName}</div>
                        </div>
                        <div className="detail-meeting-info1">
                            <label>Thời gian: </label>
                            <div>{formatTime(meetingInfo.timeCode)}</div>
                        </div>
                        <div className="detail-meeting-info1">
                            <label>Ngày: </label>
                            <div>{formatDate(meetingInfo.meetingDate)}</div>
                        </div>
                        {meetingInfo.status == 2 &&
                        <div className="video-call">
                            <i onClick={handleCallVideo} class="fas fa-video"></i>
                        </div>
                        }
                    </div>
                </div>
                
            </div>
            {
            meetingInfo.status == 0 &&
            <div className="meeting-lawyer-btn">
                <div>Nhập giá cho cuộc hẹn</div>
                <input type="number" onChange={(e) => setPrice(e.target.value)} />
                <button className="btn-primary" onClick={handleSubmitAppointment} >Xác nhận</button>
            </div>
            }
        </div>
    )
}

export default ViewAppointment;