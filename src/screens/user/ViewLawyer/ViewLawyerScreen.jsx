import React, { useContext, useEffect, useState } from "react";
import lawyers from "../../../data";
import { Modal } from 'react-bootstrap';
import classnames from 'classnames';
import "./style.scss"
import SmallCard from "../../../components/cards/SmallCard";
import DatePicker from "react-datepicker";
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import AuthAction from "../../../redux/actions/AuthAction";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify"

import convert from "../../../core/utils/majorConvert";
import Fancybox from "../../../components/fancyBox/FancyBox";
import { SocketContext } from "../../../core/config/socket.config";
import { Rating } from '@mui/material';

const ViewLawyerScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {authState: {accountInfo, token}} = useSelector (state => {
        return { authState: state.authState };
    })
    const {socket} = useContext(SocketContext);
    const [ showBookingModal, setShowBookingModal ] = useState(false);
    const [lawyer, setLawyer] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [listMajor, setListMajor] = useState([]);
    const [listImage, setListImage] = useState([]);
    const [time, setTime] = useState(0);
    const [bookingData, setBookingData] = useState({lawyerId: "", meetingDate: "", timeCode: 0})
    const [avaiTime, setAvaiTime] = useState([]);
    //console.log(window.location.pathname[8]);

    const asyncGetAccountInfo = async () => {
        const response = await dispatch(await AuthAction.asyncGetAccountInfo("user"));
        // if (!response) {
        //     navigate('/login');
        // }
    }

    useEffect(() => {
        asyncGetAccountInfo();
    }, [])
    console.log(accountInfo);


    const handleShowBooking = () => {
        setShowBookingModal(true);
    }

    const handleCloseBooking = () => {
        setShowBookingModal(false);
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    

    const getDetailLawyer = async () => {
        const response = await dispatch(await AccountUserAction.asyncGetDetailLawyer(params.lawyerId))
        if(response.status == 200) {
            setLawyer(response.data);
            setListMajor(response.data.majorFields);
            setListImage(response.data.evidenceUrls);
            setBookingData({...bookingData, lawyerId: params.lawyerId});
        }
    }
    console.log(lawyer);

    const bookingLawyer = async (data) => {
        const response = await dispatch(await AccountUserAction.asyncBookingLawyer(data))
        console.log(response);
        if(response.status == 201) {
            socket.emit("notification", {
                userId: response.data.lawyerId,
                content: `${accountInfo.firstName + " " + accountInfo.lastName} đã đặt lịch hẹn với bạn`,
                url: `http://localhost:3000/lawyer/appointment/${response.data._id}`
              });
            toast.success("Đặt lịch thành công")
            handleCloseBooking();
        }
    }

    const onSubmitChooseDate = async(lawyerId, meetingDate) => {
        const response = await dispatch(await AccountUserAction.asyncGetLawyerFreeTime(lawyerId, meetingDate))
        if(response.status == 200) {
            setAvaiTime(response.data);
            //console.log(response);
        }
    }

    useEffect(() => {
        getDetailLawyer();
    }, [])

    useEffect(() => {
        onSubmitChooseDate();
    }, [])

    const [previewID, setPreviewID] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW")

    return (
        <>
            <div className="padding">
                <strong>Các luật sư của chúng tôi</strong>
                <p>Justice delayed is justice denied.</p>
                <span>William E. Gladstone</span>
            </div>
            <div className="container">
                <div className="info-container" >
                    <div className="image-detail-info">
                        <div className="image">
                            <img src={lawyer.imgUrl} alt="Vinh" />
                        </div>
                        <div className="detail-info">
                            <div className="lawyer-name">{lawyer.fullName}</div>
                            <div className="rating"><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span></div>
                            <div className="rate-score mb-20">Đánh giá của VLaw: {lawyer.ratingScore}</div>
                            <div className="address mb-10"><i className='fas fa-map-marker-alt mr-2'></i>{lawyer.address}</div>
                            <div className="fee mb-10"><i className='fas fa-clipboard-check mr-2'></i>Mức phí: Liên hệ</div>
                        </div>
                    </div>
                    
                        {/* <h4>Bằng cấp</h4>
                        <div className="idImage">                            
                            <img className="IDImage" src={listImage[0]} alt="idImage" />
                        </div>
                        <h4>Chứng chỉ</h4>
                        <div className="degImage">                           
                            <img className="DEGImage" src={listImage[1]} alt="degImage" />
                        </div> */}
                    <Fancybox options={{ infinite: false }}>
                        <div className="certi">
                            <div>
                                <h4>Bằng cấp</h4>
                                <button
                                    data-fancybox="gallery"
                                    data-src={listImage[0]}
                                //className="btn btn-primary"
                                >
                                    <img className="IDImage" src={listImage[0]} alt="idImage" />
                                </button>
                            </div>

                            <div>
                                <h4>Chứng chỉ</h4>
                                <button
                                    data-fancybox="gallery"
                                    data-src={listImage[1]}
                                //className="btn btn-primary"
                                >
                                    <img className="IDImage" src={listImage[1]} alt="idImage" />
                                </button>
                            </div>
                        </div>
                    </Fancybox>
                    
                    <div className="phone-num">
                        <button className="btn btn-primary">{lawyer.phone}</button>
                    </div>
                    {accountInfo !== null &&
                        <div className="booking">                                                    
                            <button className="btn btn-primary" onClick={handleShowBooking}>Đặt lịch</button> 
                            <button className="btn btn-primary" onClick={() => navigate(`/messages/${lawyer.id}`)}>Nhắn tin</button>                                             
                        </div>
                    }
                </div>
                <div className="descrip-container1">
                    <section id="info">
                        <h2>Giới thiệu về luật sư</h2>
                        <p>
                            {lawyer.description}
                        </p>
                        <h2>Lĩnh vực hành nghề</h2>
                        <ul>
                            {listMajor.map((major) => {
                                return(
                                    <li>{convert(major)}</li>
                                )
                            })}
                        </ul>
                    </section>
                    <section id="fee">
                        <h2>Mức phí</h2>
                        <p>Giá trực tiếp........Liên hệ</p>
                        <p>Giá qua email........Miễn phí</p>
                        <p>Giá qua điện thoại........Miễn phí</p>
                    </section>
                    <section>
                        <h2>Liên hệ</h2>
                    </section>
                    <section>
                        <h2>Thông tin luật sư</h2>
                    </section>
                    <section>
                        <h2>Nhận xét</h2>
                        {/* <div className="user-feedback">
                            <Rating name="read-only" value={4} readOnly />
                            <div className="user-comment">
                                <div className="user-name1">
                                    <p>Nguyễn Công Vinh</p>
                                </div>
                                <div className="comment">
                                    <p>Tôi cảm ơn LS Nguyễn Công Quyền thuộc Đoàn luật sư thành phố Hà Nội có kiến thức pháp luật rất sâu sắc, đồng thời luôn có sự nhiệt tình trách nhiệm cao đã giúp đỡ cho người thân của tôi trong vụ án hình sự vừa qua. Một kết quả ngoài mong đợi của gia đình. Cảm ơn Luật sư chúc Luật sư luôn khoẻ mạnh.</p>
                                </div>
                            </div>
                        </div> */}
                        {lawyer.feedbacks != null && 
                            lawyer.feedbacks.map((f) => {
                                return (
                                    <div className="user-feedback">
                                        <Rating name="read-only" value={f.rating} readOnly />
                                        <div className="user-comment">
                                            <div className="user-name1">
                                                <p>{f.user.firstName + " " + f.user.lastName}</p>
                                            </div>
                                            <div className="comment">
                                                <p>{f.feedback}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* <div className="user-feedback">
                            <Rating name="read-only" value={5} readOnly />
                            <div className="user-comment">
                                <div className="user-name1">
                                    <p>Lương Tiến Mạnh</p>
                                </div>
                                <div className="comment">
                                    <p>Thay mặt gia đình xin được cám ơn Luật sư rất nhiều. Luật sư đã bào chữa thành công, ngoài sự mong đợi của gia đình cho người thân của chúng tôi trong vụ án hình sự. Tôi rất hài lòng về trách nhiệm, về tinh người và về kiến thức pháp luật của Luật sư. Chúc LS Nguyễn Công Quyền khoẻ mạnh và thành công hơn nữa!</p>
                                </div>
                            </div>
                        </div> */}
                    </section>
                </div>

                <Modal show={showBookingModal} enforceFocus={false} className="modal-min modal-alert">
                    <Modal.Header>
                        <Modal.Title>
                            Đặt lịch với luật sư {lawyer.fullName}
                        </Modal.Title>
                        <button className={classnames("btn-close")} onClick={handleCloseBooking}></button>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            <div className>
                                <h4>Chọn ngày</h4>
                                <DatePicker 
                                    selected={startDate} 
                                    onChange={(date) => {
                                        setStartDate(date);
                                        setBookingData({...bookingData, meetingDate: formatDate(date)});
                                        onSubmitChooseDate(params.lawyerId, formatDate(date));
                                    }} 
                                />
                            </div>
                            <div className="choose-time">
                                <h4>Chọn giờ</h4>
                                <div>
                                    <button disabled={!avaiTime.includes(1)} onClick={() => setBookingData({...bookingData, timeCode: 1})}>8:00</button>
                                    <button disabled={!avaiTime.includes(2)} onClick={() => setBookingData({...bookingData, timeCode: 2})}>10:00</button>
                                    <button disabled={!avaiTime.includes(3)} onClick={() => setBookingData({...bookingData, timeCode: 3})}>12:00</button>
                                    <button disabled={!avaiTime.includes(4)} onClick={() => setBookingData({...bookingData, timeCode: 4})}>14:00</button>
                                    <button disabled={!avaiTime.includes(5)} onClick={() => setBookingData({...bookingData, timeCode: 5})}>16:00</button>
                                </div>
                                {/* <select value={bookingData.timeCode} onChange={(e) => setBookingData({...bookingData, timeCode: e.target.value})}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select> */}
                            </div>
                        </>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={() => bookingLawyer(bookingData)}>Xác nhận</button>
                        <button className="btn btn-light" onClick={handleCloseBooking}>Hủy</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}


export default ViewLawyerScreen