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

    const bookingLawyer = async (data) => {
        const response = await dispatch(await AccountUserAction.asyncBookingLawyer(data))
        console.log(response);
        if(response.status == 201) {
            socket.emit("notification", {
                userId: response.data.lawyerId,
                content: `${accountInfo.firstName + " " + accountInfo.lastName} ???? ?????t l???ch h???n v???i b???n`,
                url: `http://localhost:3000/lawyer/appointment/${response.data._id}`
              });
            toast.success("?????t l???ch th??nh c??ng")
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
                <strong>C??c lu???t s?? c???a ch??ng t??i</strong>
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
                            <div className="rate-score mb-20">????nh gi?? c???a VLaw: {lawyer.ratingScore}</div>
                            <div className="address mb-10"><i className='fas fa-map-marker-alt mr-2'></i>{lawyer.address}</div>
                            <div className="fee mb-10"><i className='fas fa-clipboard-check mr-2'></i>M???c ph??: Li??n h???</div>
                        </div>
                    </div>
                    
                        {/* <h4>B???ng c???p</h4>
                        <div className="idImage">                            
                            <img className="IDImage" src={listImage[0]} alt="idImage" />
                        </div>
                        <h4>Ch???ng ch???</h4>
                        <div className="degImage">                           
                            <img className="DEGImage" src={listImage[1]} alt="degImage" />
                        </div> */}
                    <Fancybox options={{ infinite: false }}>
                        <div className="certi">
                            <h4>B???ng c???p</h4>
                            <button
                                data-fancybox="gallery"
                                data-src={listImage[0]}
                            //className="btn btn-primary"
                            >
                                <img className="IDImage" src={listImage[0]} alt="idImage" />
                            </button>

                            <h4>Ch???ng ch???</h4>
                            <button
                                data-fancybox="gallery"
                                data-src={listImage[1]}
                            //className="btn btn-primary"
                            >
                                <img className="IDImage" src={listImage[1]} alt="idImage" />
                            </button>
                        </div>
                    </Fancybox>
                    
                    <div className="phone-num">
                        <button className="btn btn-primary">{lawyer.phone}</button>
                    </div>
                    {accountInfo !== null &&
                        <div className="booking">                                                    
                            <button className="btn btn-primary" onClick={handleShowBooking}>?????t l???ch</button> 
                            <button className="btn btn-primary" onClick={() => navigate(`/messages/${lawyer.id}`)}>Nh???n tin</button>                                             
                        </div>
                    }
                </div>
                <div className="descrip-container1">
                    <section id="info">
                        <h2>Gi???i thi???u v??? lu???t s??</h2>
                        <p>
                            {lawyer.description}
                        </p>
                        <h2>L??nh v???c h??nh ngh???</h2>
                        <ul>
                            {listMajor.map((major) => {
                                return(
                                    <li>{convert(major)}</li>
                                )
                            })}
                        </ul>
                    </section>
                    <section id="fee">
                        <h2>M???c ph??</h2>
                        <p>Gi?? tr???c ti???p........Li??n h???</p>
                        <p>Gi?? qua email........Mi???n ph??</p>
                        <p>Gi?? qua ??i???n tho???i........Mi???n ph??</p>
                    </section>
                    <section>
                        <h2>Li??n h???</h2>
                    </section>
                    <section>
                        <h2>Th??ng tin lu???t s??</h2>
                    </section>
                    <section>
                        <h2>Nh???n x??t</h2><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span>
                    </section>
                </div>

                <Modal show={showBookingModal} enforceFocus={false} className="modal-min modal-alert">
                    <Modal.Header>
                        <Modal.Title>
                            ?????t l???ch v???i lu???t s?? {lawyer.fullName}
                        </Modal.Title>
                        <button className={classnames("btn-close")} onClick={handleCloseBooking}></button>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            <div className>
                                <h4>Ch???n ng??y</h4>
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
                                <h4>Ch???n gi???</h4>
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
                        <button className="btn btn-primary" onClick={() => bookingLawyer(bookingData)}>X??c nh???n</button>
                        <button className="btn btn-light" onClick={handleCloseBooking}>H???y</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}


export default ViewLawyerScreen