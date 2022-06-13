import React, { useEffect, useState } from "react";
import classnames from 'classnames';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import './style.scss';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import Table from "../../../components/table/Table";
import lawyers from "../../../data";
import LawyerAdminAction from "../../../redux/actions/LawyerAdminAction";


const LawyerManagementScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [listLawyers, setListLawyers] = useState([]);
    const [listMajor, setListMajor] = useState([]);
    const [loading, setLoading] = useState(false);

    const getListLawyer = async () => {
        const response = await dispatch(await LawyerAdminAction.asyncGetLawyer());
        if(response.status === 200) {
            await setListLawyers(response.data);
            setLoading(false);
        }
    }

    useEffect(() => {
        getListLawyer();
    }, [loading])

    console.log(listLawyers);
    let field
    useEffect(() => {
        for (let i = 0; i < lawyers.length; i++ ){
            for(let j=0; j < lawyers[i].majorFields.length ; j++){
                if (listMajor.includes(lawyers[i].majorFields[j] ) == false ){
                    field = lawyers[i].majorFields[j];
                    console.log(field);
                    listMajor.push(field);
                }
            }
        }
    }, [field])
    
    //console.log(listLawyers)

    // validate form upload music
    const validateUploadLawyer= yup.object().shape({
        email: yup.string().required('Không thể bỏ trống').matches(new RegExp('^[a-zA-Z0-9@" "]|[à-ú]|[À-Ú]{2,100}$'), 'Email chỉ bao gồm chữ, số, kí tự @ và khoảng trắng, từ 2 - 100 ký tự'),
        firstName: yup.string().required('Không thể bỏ trống').matches(new RegExp('^[a-zA-Z" "]|[à-ú]|[À-Ú]{2,100}$'), 'Tên bài hát chỉ bao gồm chữ và khoảng trắng, từ 2 - 100 ký tự'),
        lastName: yup.string().required('Không thể bỏ trống').matches(new RegExp('^[a-zA-Z" "]|[à-ú]|[À-Ú]{2,100}$'), 'Tên bài hát chỉ bao gồm chữ và khoảng trắng, từ 2 - 100 ký tự'),       
        majorFields: yup.array().required('Không thể bỏ trống'),
        description: yup.string().required('Không thể bỏ trống'),
        ratingScore: yup.number().required('Không thể bỏ trống'),
        yearExperiences: yup.number().required('Không thể bỏ trống'),
        userRatesScore: yup.number().required('Không thể bỏ trống'),
    })


    const [ showUploadMusic, setShowUploadMusic ] = useState(false);

    const handleUploadMusicClose = () => {
        setShowUploadMusic(false);
    }

    const handleUploadMusicShow = () => {
        setShowUploadMusic(true);
    }

    // use hook form 
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({resolver: yupResolver(validateUploadLawyer)});


    // submit upload lawyer
    const onSubmitUploadLawyer = async (data) => {
        console.log("ddcm");
        const response = await dispatch(await LawyerAdminAction.asyncUploadLawyer(data));
        if(response.status === 201) {
            console.log("hello");
            //setListRenderMusic([response.data.data, ...listMusic]);
            reset();
            handleUploadMusicClose();
            setLoading(true);
        }
        if(response.status === 401) {
            navigate('/admin/login');
        }
    }


    // edit lawyer
    const [ showEditLawyer, setShowEditLawyer ] = useState(false);
    const [ updateLawyer, setUpdateLawyer ] = useState(null);
    const [ indexUpdateLawyer, setIndexUpdateLawyer ] = useState(null);
    const { register : register3, handleSubmit: handleSubmit3, formState: { errors : errors3, isSubmitting: isSubmitting3 }, reset : reset3 } = useForm({resolver: yupResolver(validateUploadLawyer)});

    const handleEditLawyerClose = () => {
        setShowEditLawyer(false);
        setUpdateLawyer(null);
        reset3();
    }

    const handleEditLawyerShow = (lawyer, index) => {
        setShowEditLawyer(true);
        setUpdateLawyer(lawyer);
        setIndexUpdateLawyer(index);
    }

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


    return (
        <div className="lawyer-admin-page">
            <div className={classnames("music-management")}>
                <h3 className={"admin-page-title"}>Quản lý luật sư</h3>
                <div className={classnames("music-management-action", "mg-b-10")}>
                    {/* <div>
                        <input placeholder="Tìm kiếm bài hát" ref={refSearchMusic} onKeyPress={onChangeSearchMusic}/>
                        <form className="mg-l-20">
                            <select id="category" defaultValue={slugCategory} onChange={onChangeSlugCategory}>
                                <option value={"all"}>Tất cả</option>
                                {listMajor.length > 0 && listMajor.map((category) => {
                                    return (
                                        <option key={category._id} value={category.slug_category}>{category.category}</option>
                                    )
                                })}
                            </select><br/>
                        </form>
                        <span className="mg-l-20">Tổng số: { slugCategory === "all" ? listMusic.length : listRenderMusic.length }</span>
                    </div> */}
                    <button className="btn-primary m-1" onClick={handleUploadMusicShow}>Tạo luật sư</button>
                </div>

                <div className="lawyer-info">
                    <table>
                        <thead>
                            <tr>
                                <th>Tên luật sư</th>
                                <th>Điểm đánh giá</th>
                                <th>Điểm người dùng</th>
                                <th>Năm kinh nghiệm</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        { listLawyers.length > 0 ?
                        <tbody>
                            { listLawyers.map((lawyer, index) => {
                                return (
                                    <tr key={lawyer.id}>
                                        <td>{lawyer.fullName}</td>
                                        <td>{lawyer.ratingScore}</td>
                                        <td>{lawyer.userRatesScore}</td>
                                        <td>{lawyer.yearExperiences}</td>
                                        <td>
                                            <span className="edit">
                                                <EditOutlined onClick={() => handleEditLawyerShow(lawyer, index)}  className={classnames("mg-r-20")} />
                                            </span>
                                            <span className="delete">
                                                <DeleteOutlined  onClick={() => handleShowDeleteLawyer(lawyer, index)}/>
                                            </span>
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

                {/* modal upload music */}
                <Modal show={showUploadMusic} enforceFocus={false} className="modal-min">
                    <Modal.Header>
                        <Modal.Title>Tạo luật sư</Modal.Title>
                        <button className={classnames("btn-close")} onClick={handleUploadMusicClose}></button>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmitUploadLawyer)}>
                            <div>
                                <label className={classnames("d-block mg-tb-10")} htmlFor="email">Email</label>
                                <input {...register('email')} type="text" className={classnames("width-350", `${errors.email ? "border border-danger" : ""}`)} id="email" placeholder="Email"/>
                                <p className="text-danger width-250">{errors.email?.message}</p>
                            </div>
                            <div>
                                <label className={classnames("d-block mg-tb-10")} htmlFor="firstName">First Name</label>
                                <input {...register('firstName')} type="text" className={classnames("width-350", `${errors.firstName ? "border border-danger" : ""}`)} id="firstName" placeholder="First Name"/>
                                <p className="text-danger width-250">{errors.firstName?.message}</p>
                            </div>
                            <div>
                                <label className={classnames("d-block mg-tb-10")} htmlFor="lastName">Last Name</label>
                                <input {...register('lastName')} type="text" className={classnames("width-350", `${errors.lastName ? "border border-danger" : ""}`)} id="lastName" placeholder="Last Name"/>
                                <p className="text-danger width-250">{errors.lastName?.message}</p>
                            </div>
                            <div>
                                <label className={classnames("d-inline-block mg-tb-20 mg-r-10")} htmlFor="majorFields">Lĩnh vực</label>
                                <select {...register('majorFields')} id="majorFields" defaultValue={""} multiple >
                                    {/* {listMajor.length > 0 && listMajor.map((category) => {
                                        return (
                                            <option key={category._id} value={category}>{category}</option>
                                        )
                                    })} */}
                                    <option value="dan su">Dan su</option>
                                    <option value="hinh su">Hinh su</option>
                                    <option value="thue">Thue</option>
                                </select>
                                <p className="text-danger width-250">{errors.majorFields?.message}</p>
                            </div>
                            <div>
                                <label className={classnames("d-block mg-tb-10")} htmlFor="description">Mô tả</label>
                                <textarea {...register('description')} type="text" className={classnames("width-350", `${errors.description ? "border border-danger" : ""}`)} id="description" />
                                <p className="text-danger width-250">{errors.description?.message}</p>
                            </div>
                            <div>
                                <label className={classnames("d-block mg-tb-10")} htmlFor="ratingScore">Rating Score</label>
                                <input {...register('ratingScore')} type="text" className={classnames("width-350", `${errors.ratingScore ? "border border-danger" : ""}`)} id="ratingScore" placeholder="Rating Score"/>
                                <p className="text-danger width-250">{errors.ratingScore?.message}</p>
                            </div>
                            <div>
                                <label className={classnames("d-inline-block mg-tb-20 mg-r-10")} htmlFor="yearExperiences">Năm kinh nghiệm</label>
                                <select {...register('yearExperiences')} id="yearExperiences" defaultValue={""} >                                   
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                                <p className="text-danger width-250">{errors.yearExperiences?.message}</p>
                            </div>
                            <div>
                                <label className={classnames("d-block mg-tb-10")} htmlFor="userRatesScore">User rate score</label>
                                <input {...register('userRatesScore')} type="text" className={classnames("width-350", `${errors.userRatesScore ? "border border-danger" : ""}`)} id="userRatesScore" />
                                <p className="text-danger width-250">{errors.userRatesScore?.message}</p>
                            </div>
                            <button className={classnames("width-350 mg-t-10", "btn-custom")} disabled={isSubmitting} type="submit">Tạo luật sư</button>
                        </form>
                    </Modal.Body>
                </Modal>

                 {/* modal edit music */}
                 <Modal show={showEditLawyer} enforceFocus={false} className="modal-lg modal-edit-music">
                    <Modal.Header>
                        <Modal.Title>Cập nhật thông tin luật sư</Modal.Title>
                        <button className={classnames("btn-close")} onClick={handleEditLawyerClose}></button>
                    </Modal.Header>
                    <Modal.Body>
                        { updateLawyer !== null &&
                        <>
                            <form onSubmit={handleSubmit3()}>
                            <div>
                                <label className={classnames("d-block mg-tb-10")} htmlFor="email">Email</label>
                                <input {...register('email')} type="text" defaultValue={updateLawyer.email} className={classnames("width-350", `${errors.email ? "border border-danger" : ""}`)} id="email" placeholder="Email"/>
                                <p className="text-danger width-250">{errors.email?.message}</p>
                            </div>
                            <div>
                                <label className={classnames("d-block mg-tb-10")} htmlFor="firstName">First Name</label>
                                <input {...register('firstName')} type="text" defaultValue={updateLawyer.firstName} className={classnames("width-350", `${errors.firstName ? "border border-danger" : ""}`)} id="firstName" placeholder="First Name"/>
                                <p className="text-danger width-250">{errors.firstName?.message}</p>
                            </div>
                            <div>
                                <label className={classnames("d-block mg-tb-10")} htmlFor="lastName">Last Name</label>
                                <input {...register('lastName')} type="text" defaultValue={updateLawyer.lastName} className={classnames("width-350", `${errors.lastName ? "border border-danger" : ""}`)} id="lastName" placeholder="Last Name"/>
                                <p className="text-danger width-250">{errors.lastName?.message}</p>
                            </div>
                            <div>
                                <label className={classnames("d-inline-block mg-tb-20 mg-r-10")} htmlFor="majorFields">Lĩnh vực</label>
                                <select {...register('majorFields')} id="majorFields" defaultValue={updateLawyer.majorFields[0]} multiple >
                                    {/* {listMajor.length > 0 && listMajor.map((category) => {
                                        return (
                                            <option key={category._id} value={category}>{category}</option>
                                        )
                                    })} */}
                                    <option value="dan su">Dan su</option>
                                    <option value="hinh su">Hinh su</option>
                                    <option value="thue">Thue</option>
                                </select>
                                <p className="text-danger width-250">{errors.majorFields?.message}</p>
                            </div>
                            <div>
                                <label className={classnames("d-block mg-tb-10")} htmlFor="description">Mô tả</label>
                                <textarea {...register('description')} type="text" defaultValue={updateLawyer.description} className={classnames("width-350", `${errors.description ? "border border-danger" : ""}`)} id="description" />
                                <p className="text-danger width-250">{errors.description?.message}</p>
                            </div>
                            <div>
                                <label className={classnames("d-block mg-tb-10")} htmlFor="ratingScore">Rating Score</label>
                                <input {...register('ratingScore')} type="text" defaultValue={updateLawyer.ratingScore} className={classnames("width-350", `${errors.ratingScore ? "border border-danger" : ""}`)} id="ratingScore" placeholder="Rating Score"/>
                                <p className="text-danger width-250">{errors.ratingScore?.message}</p>
                            </div>
                            <div>
                                <label className={classnames("d-inline-block mg-tb-20 mg-r-10")} htmlFor="yearExperiences">Năm kinh nghiệm</label>
                                <select {...register('yearExperiences')} id="yearExperiences" defaultValue={updateLawyer.yearExperiences} >                                   
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                                <p className="text-danger width-250">{errors.yearExperiences?.message}</p>
                            </div>
                            <div>
                                <label className={classnames("d-block mg-tb-10")} htmlFor="userRatesScore">User rate score</label>
                                <input {...register('userRatesScore')} type="text" defaultValue={updateLawyer.userRatesScore} className={classnames("width-350", `${errors.userRatesScore ? "border border-danger" : ""}`)} id="userRatesScore" />
                                <p className="text-danger width-250">{errors.userRatesScore?.message}</p>
                            </div>
                                <button className="btn-info" disabled={isSubmitting3} type="submit">Cập nhật thông luật sư</button>
                            </form>
                        </>}
                    </Modal.Body>
                </Modal>

                {/* modal delete music */}
                <Modal show={showDeleteLawyer} enforceFocus={false} className="modal-min modal-alert">
                    <Modal.Header>
                        <Modal.Title></Modal.Title>
                        <button className={classnames("btn-close")} onClick={handleCloseDeleteLawyer}></button>
                    </Modal.Header>
                    <Modal.Body>
                        Xác nhận xoá luật sư {delLawyer?.fullName}? 
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn-danger" onClick={onSubmitDeleteLawyer} >Xóa</button>
                        <button className="btn-light" onClick={handleCloseDeleteLawyer}>Hủy</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>

    )
}

export default LawyerManagementScreen