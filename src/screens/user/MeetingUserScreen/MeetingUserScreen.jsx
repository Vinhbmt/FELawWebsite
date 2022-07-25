import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss"
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import meetingStatus from "../../../core/utils/meetingStatus";
import { Modal } from "react-bootstrap";

const MeetingUserScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [listMeeting, setListMeeting] = useState([])

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

    const getListMeeting = async () => {
        const response = await dispatch(await AccountUserAction.asyncGetListAppointment())
        console.log(response);
        if(response.status === 200) {
            await setListMeeting(response.data);
        }
    }

    useEffect(() => {
        getListMeeting();
    }, [])

    console.log(listMeeting)

    //view and approve lawyer
    const [ showProcessModal, setShowProcessModal ] = useState(false);
    //const [ pendingLawyer, setPendingLawyer ] = useState(null);

    const handleViewProcess = () => {
        setShowProcessModal(true);
    }
    const handleCloseViewProcess = () => {
        setShowProcessModal(false);
    }


    return (
        <div className="profile-container">
            <div className="padding2">
            </div>
            <div class="table-users">
                <div class="header-profile">Danh sách cuộc hẹn</div>

                <table cellspacing="0">
                    <tr className="title-table">
                        <th>Luật sư</th>
                        <th>Số điện thoại</th>
                        <th>Ngày</th>
                        <th>Giờ</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    {
                        listMeeting.length > 0 ? 
                        
                        listMeeting.map((m) => {
                                return(
                                    <tr>
                                        <td>{m.lawyerId.firstName + " " + m.lawyerId.lastName}</td>
                                        <td>{m.lawyerId.phone}</td>
                                        <td>{formatDate(m.meetingDate)}</td>
                                        <td>{formatTime(m.timeCode)}</td>
                                        <td>{meetingStatus.codeToStatus[m.status]}</td>
                                        <td onClick={() => {
                                            navigate(`/meeting/${m._id}`)
                                        }}>Xem chi tiết</td>
                                    </tr>
                                )
                            })
                        :
                        <tr>
                            <td colSpan={6}>Không có luật sư</td>
                        </tr>
                    }
                    {/* <tr>
                        <td>Lương</td>
                        <td>manhluong135@gmail.com</td>
                        <td>25/06/2022</td>
                        <td>8:00-10:00</td>
                        <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </td>
                    </tr>

                    <tr>
                        <td><img src="https://i.picsum.photos/id/1027/100/100.jpg" alt="" /></td>
                        <td>John Doe</td>
                        <td>john.doe@foo.com</td>
                        <td>01 800 2000</td>
                        <td>Blanditiis, aliquid numquam iure voluptatibus ut maiores explicabo ducimus neque, nesciunt rerum perferendis, inventore.</td>
                    </tr>

                    <tr>
                        <td><img src="https://i.picsum.photos/id/64/100/100.jpg" alt="" /></td>
                        <td>Jane Smith</td>
                        <td>jane.smith@foo.com</td>
                        <td>01 800 2000</td>
                        <td> Culpa praesentium unde pariatur fugit eos recusandae voluptas.</td>
                    </tr>

                    <tr>
                        <td><img src="https://i.picsum.photos/id/1025/100/100.jpg" alt="" /></td>
                        <td>John Smith</td>
                        <td>john.smith@foo.com</td>
                        <td>01 800 2000</td>
                        <td>Aut voluptatum accusantium, eveniet, sapiente quaerat adipisci consequatur maxime temporibus quas, dolorem impedit.</td>
                    </tr> */}
                </table>
            </div>

            {/* <Modal size="lg" show={showProcessModal} enforceFocus={false} className="modal-min modal-alert">
                <Modal.Header>
                    <Modal.Title>Cuộc hẹn</Modal.Title>
                    <button className="btn btn-light" onClick={handleCloseViewProcess}></button>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <div>
                            Điều khoản
                        </div>
                        <div className="processing">
                            <div className="processing1">
                                <div className="processing2"><i class="fa fa-recycle"></i></div>
                                <div>Chờ xác nhận</div>
                            </div>
                            <i class='fas fa-arrow-right'></i>
                            <div className="processing1">
                                <div className="processing2"><i class="fa fa-dollar"></i></div>
                                <div>Chờ thanh toán</div>
                            </div>
                            <i class='fas fa-arrow-right'></i>
                            <div className="processing1">
                                <div className="processing2"><i class="fa fa-comments"></i></div>
                                <div>Đang trao đổi</div>
                            </div>
                            <i class='fas fa-arrow-right'></i>
                            <div className="processing1">
                                <div className="processing2"><i class="fa fa-check-circle"></i></div>
                                <div>Đã hoàn thành</div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <button className="btn btn-danger">Logout</button> */}
                    {/* <button className="btn btn-default" onClick={handleCloseViewProcess}>Cancel</button>
                </Modal.Footer>
            </Modal> */} 
        </div>
    )
}

export default MeetingUserScreen;