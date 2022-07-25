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
import lawyers from "../../../data";
import LawyerAdminAction from "../../../redux/actions/LawyerAdminAction";
import AuthAction from "../../../redux/actions/AuthAction";
import { UserStatus } from "../../../redux/constants";
import { io } from "socket.io-client";
import { toast } from 'react-toastify';
import Fancybox from "../../../components/fancyBox/FancyBox";
import { SocketContext } from "../../../core/config/socket.config";




const LawyerManagementScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [listLawyers, setListLawyers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ratingScore, setRatingScore] = useState(null);
    const [activeSelect, setActiveSelect] = useState("1");
    const {socket} = useContext(SocketContext);
  

    const asyncGetAccountInfo = async () => {
        const response = await dispatch(await AuthAction.asyncGetAccountInfo("admin"));
        if (!response) {
            navigate('/admin/login');
        }
    }

    useEffect(() => {
        asyncGetAccountInfo();
    }, [])

    const getListLawyer = async (select) => {
        const response = await dispatch(await LawyerAdminAction.asyncGetLawyer(select, {}));
        if(response.status === 201) {
            await setListLawyers(response.data);
            setLoading(false);
        }
    }

    useEffect(() => {
        getListLawyer(activeSelect);
    }, [activeSelect])

    console.log(activeSelect)
    
    //console.log(listLawyers)

    //view and approve lawyer
    const [ showInfoModal, setShowInfoModal ] = useState(false);
    const [ pendingLawyer, setPendingLawyer ] = useState(null);

    const handleViewLawyer = (lawyer) => {
        setShowInfoModal(true);
        setPendingLawyer(lawyer);
    }
    const handleCloseViewLawyer = () => {
        setShowInfoModal(false);
        setPendingLawyer(null);
    }
    console.log(pendingLawyer)

    //filter lawyer according to status
    

    // delete music
    const [ delLawyer, setDelLawyer ] = useState(null);
    const [ indexDelLawyer, setIndexDelLawyer] = useState(null);
    const [ showDeleteLawyer, setShowDeleteLawyer ] = useState(false);

    const handleShowDeleteLawyer  = (lawyer, index) => {
        setShowDeleteLawyer(true);
        setDelLawyer(lawyer);
    }

    const handleCloseDeleteLawyer = () => {
        setShowDeleteLawyer(false);
        setDelLawyer(null);
        setIndexDelLawyer(null);
    }

    const onSubmitDeleteLawyer = async () => {
        const response = await dispatch( await LawyerAdminAction.asyncDeleteLawyer(delLawyer.email));
        if(response.status === 200) {
            handleCloseDeleteLawyer();
        }
        if(response.status === 401) {
            navigate('/admin/login');
        }
    }


    const handleUpdateLawyer = async (lawyer, type, data) => {
        const response = await dispatch( await LawyerAdminAction.asyncUpdateLawyer(lawyer.email, type, data));
        if(response.status == 200){
            setShowInfoModal(false);
            setLoading(true);
            socket.emit("notification", {
                userId: lawyer.id,
                content: "Tài khoản của bạn đã được xác thực"
              });
            toast.success("Xác nhận thành công !");
        }
    }


    return (
        <div className="lawyer-container">
            <h1>Quản lý luật sư</h1>
            <div className="status-select">
                <select defaultValue="1" onChange={(e) => setActiveSelect(e.target.value) }>
                    <option value="3">Từ chối</option>
                    <option value="2">Đã xác thực</option>                    
                    <option value="1">Chờ xác thực</option>
                </select>
            </div>
            <div  className="child-container">                
                <div className="lawyer-info">
                    <table>
                        <thead>
                            <tr>
                                <th>Tên luật sư</th>
                                <th>Lĩnh vực</th>
                                <th>Mô tả</th>
                                <th>Năm kinh nghiệm</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        { listLawyers.length > 0 ?
                        <tbody>
                            { listLawyers.map((lawyer, index) => {
                                return (
                                    <tr key={lawyer.id} onClick={() => handleViewLawyer(lawyer)}>
                                        <td>{lawyer.fullName}</td>
                                        <td>{lawyer.majorFields && Array.isArray(lawyer.majorFields) ? lawyer.majorFields.join(",") : " " }</td>
                                        <td>{`${lawyer.description.substring(0, 50)}...`}</td>
                                        <td>{lawyer.yearExperiences}</td>
                                        <td>
                                             <EyeOutlined className="view" onClick={showInfoModal} />
                                        </td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                        :
                        <tbody>
                            <tr>
                                <td colSpan={5}>Không có luật sư</td>
                            </tr>
                        </tbody> }
                    </table>
                    {/* <Table
                        limit='10'
                        headData={lawyerTableHead}
                        renderHead={(item, index) => renderHead(item, index)}
                        bodyData={lawyers}
                        renderBody={(item, index) => renderBody(item, index)}
                    /> */}
                </div>

                <Modal show={showInfoModal} enforceFocus={false} className="modal-min modal-alert">
                    <Modal.Header>
                        <Modal.Title>
                            {pendingLawyer !== null &&
                                <div>
                                Thông tin chi tiết luật sư {pendingLawyer.fullName}
                                </div>
                            }
                        </Modal.Title>
                        <button className={classnames("btn-close")} onClick={handleCloseViewLawyer}></button>
                    </Modal.Header>
                    <Modal.Body>
                        {pendingLawyer !== null &&
                        <>
                            <div className='edit-image-source'>
                                <div className="alert alert-info image">
                                    <span>Ảnh chứng minh thư nhân dân</span>
                                    <img src={pendingLawyer.evidenceUrls[0]} alt="image-music" className="img img-fluid "></img>
                                </div>
                                <div className="alert alert-info image">
                                    <span>Ảnh bằng cấp</span>
                                    <img src={pendingLawyer.evidenceUrls[1]} alt="image-music" className="img img-fluid "></img>
                                </div>
                            </div>
                            <div className="alert alert-info info-lawyer">
                                <div className="field-info">
                                    <label className="label-field">Email:</label>
                                    <div className="">{pendingLawyer.email}</div>
                                </div>                               
                                <div className="field-info">
                                    <label className="label-field">Họ và tên:</label>
                                    <div className="">{pendingLawyer.fullName}</div>
                                </div>
                                <div className="major-info">
                                    <label className="label-field">Lĩnh vực:</label>
                                    {pendingLawyer.majorFields.map((major) => {
                                        return (
                                            <ul>
                                                <li>{major}</li>
                                            </ul>
                                        )
                                    })}
                                </div>

                                <div >
                                    <label className="label-field">Mô tả:</label>
                                    <br/>
                                    <p>{pendingLawyer.description}</p>
                                </div>
                                <div className="field-info">
                                    <label className="label-field">Năm kinh nghiệm:</label>
                                    <div className="">{pendingLawyer.yearExperiences}</div>
                                </div>
                                
                                    <div class="field-info">
                                    <label className="label-field">Điểm đánh giá:</label>
                                    { activeSelect !== "2" ?
                                        <input
                                            type="number"
                                            //className="form-control"
                                            //placeholder="Enter email"
                                            name="ratingScore"
                                            value={ratingScore}
                                            onChange={(e) => setRatingScore(e.target.value)} />
                                            
                                        :

                                        <div className="">{pendingLawyer.ratingScore}</div>
                                }
                                    </div>
                                    
                            </div>                           
                        </>
                        }
                    </Modal.Body>
                    {
                       activeSelect !== "2" ?
                        <Modal.Footer>
                            <button className="btn btn-primary" onClick={()  => handleUpdateLawyer(pendingLawyer, 2, ratingScore)} >Xác nhận</button>
                            <button className="btn btn-danger" onClick={()  => handleUpdateLawyer(pendingLawyer, 3)} >Từ chối</button>
                            <button className="btn btn-light" onClick={handleCloseViewLawyer}>Hủy</button>
                        </Modal.Footer>
                        :
                        <Modal.Footer>
                            <button className="btn-light" onClick={handleCloseViewLawyer}>Cancel</button>
                        </Modal.Footer>
                    }
                </Modal>
            </div>
        </div>

    )
}

export default LawyerManagementScreen