import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../../core/customHook";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import classnames from 'classnames';
import './style.scss';
import AuthAction from "../../../redux/actions/AuthAction";
import LawyerAction from "../../../redux/actions/LawyerAction";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';


const UpdateLawyerScreen = () => {
    useTitle("Cập nhật thông tin");

    let AVATAR_DEFAULT_URL = "https://via.placeholder.com/100x100.png?text=PREVIEW"

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authState: { accountInfo, token } } = useSelector(state => {
        return { authState: state.authState };
    })

    const [loading, setLoading] = useState(false);

    const asyncGetAccountInfo = async () => {
        const response = await dispatch(await AuthAction.asyncGetAccountInfo("lawyer"));
        if (!response) {
            navigate('/lawyer/login');
        }
    }

    useEffect(() => {
        asyncGetAccountInfo();
    }, [loading])

    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [phone, setPhone] = useState(undefined)
    const [address, setAddress] = useState(undefined);
    const [avatar, setAvatar] = useState(undefined);
    const [idImage, setIdImage] = useState(undefined);
    const [degImage, setDegImage] = useState(undefined);

    const [preview, setPreview] = useState(AVATAR_DEFAULT_URL )
    const [image, setImage] = useState("");

    const [previewID, setPreviewID] = useState(AVATAR_DEFAULT_URL)
    const [previewDeg, setPreviewDeg] = useState(AVATAR_DEFAULT_URL)

    const url = `${process.env.REACT_APP_URL_BE}/api/v1/users/lawyer`;

    const onSubmitUpdate = async (e) => {
        e.preventDefault();
        console.log("helooo")
        let lawyerData = new FormData()
        firstName && lawyerData.append("firstName", firstName)
        lastName && lawyerData.append("lastName", lastName)
        address && lawyerData.append("address", address)
        phone && lawyerData.append("phone", phone)
        avatar && lawyerData.append("imgUrl", avatar)
        if(idImage && degImage){
        lawyerData.append("evidenceUrls", idImage)
        lawyerData.append("evidenceUrls", degImage)
        } 
        console.log([...lawyerData]);
        try {
            const response = await fetch('http://localhost:4000/api/v1/users/update', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: lawyerData
            })
            if (response.status === 200) {
                toast.success("Cập nhật thông tin thành công !");
                setLoading(!loading);
            }
        } catch (error) {
            toast.error("Cập nhật thông tin thất bại !"); 
        }
        
    }
    const handleIDImageChange = (e) => {
        setPreviewID(URL.createObjectURL(e.target.files[0]))      
        setIdImage(e.target.files[0])
        
    }
    const handleDegImageChange = (e) => {
        setPreviewDeg(URL.createObjectURL(e.target.files[0]))
        setDegImage(e.target.files[0])
    }
    const handleAvatarChange = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setAvatar(e.target.files[0])
    }

    // const asyncGetAccountInfo = async () => {
    //     const response = await dispatch(await AuthAction.asyncGetAccountInfo("lawyer"));
    //     if(!response) {
    //         navigate('/login');
    //     }
    // }

    // useEffect(async () => {
    //     asyncGetAccountInfo();
    // }, [])

    const validateUpdateUserInfoSchema = yup.object().shape({
        name: yup.string().required('Không thể bỏ trống').matches(new RegExp('^[a-zA-Z" "]|[à-ú]|[À-Ú]{4,50}$'), 'Tên người dùng chỉ bao gồm chữ, kí tự khoảng trắng, từ 4 - 50 ký tự'),
        email: yup.string().required('Không thể bỏ trống').email('Email không hợp lệ'),
        address: yup.string(),
    })

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: yupResolver(validateUpdateUserInfoSchema) });

    const onSubmitUpdateInfo = async (data) => {
        const response = await dispatch(await LawyerAction.asyncUpdateInfo(data));
        if (!response) {
            return navigate('/');
        }
        reset();
    }

    const onSubmitChangeAvatar = async (image) => {
        const formData = new FormData();
        formData.set('image', image);
        const response = await dispatch(await LawyerAction.asyncChangeAvatar(formData));
        if (!response) {
            return navigate('/');
        }
        reset();
    }

    return (
        accountInfo !== null &&
        <div className="user-page update-user-page">
            <div className="login-title mt-20 mb-20">
                <h1 className="title-format">Cập nhật thông tin</h1>
            </div>
            <div className="update-user">
                <form onSubmit={onSubmitUpdate} className='update-form'>
                    
                    {/* <div className="image-upload">
                        <div className='edit-image-source'>
                            <div className="alert alert-info image">
                                <img src={previewID != AVATAR_DEFAULT_URL ?  previewID : accountInfo?.evidenceUrls?.length && accountInfo.evidenceUrls[0] || previewID} alt="image-music" className="img img-fluid degidimage"></img>
                                <label className="btn btn-outline-primary btn-light btn-block m-2">
                                    IdImage
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleIDImageChange}
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            </div>
                        </div>

                        <div className='edit-image-source'>
                            <div className="alert alert-info image">
                                <img src={ previewDeg != AVATAR_DEFAULT_URL ?  previewDeg : accountInfo?.evidenceUrls?.length && accountInfo.evidenceUrls[1] || previewDeg} alt="image-music" className="img img-fluid degidimage"></img>
                                <label className="btn btn-outline-primary btn-light btn-block m-2">
                                    DeImage
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleDegImageChange}
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="image-upload">
                        <img className="avatar" src={preview != AVATAR_DEFAULT_URL ?  preview : accountInfo?.imgUrl || preview} alt="image-music"></img>
                        <label className='file-input-label btn-custom' htmlFor="image-input">
                            Đổi ảnh
                        </label>
                        <input type={"file"} id='image-input' name="image" accept='image/*' onChange={handleAvatarChange} hidden></input>
                    </div> */}
                    <div className="update-form2">
                        <div className="image-upload">
                            <div className='edit-image-source'>
                                <div className="alert alert-info image">
                                    <img src={previewID != AVATAR_DEFAULT_URL ?  previewID : accountInfo?.evidenceUrls?.length && accountInfo.evidenceUrls[0] || previewID} alt="image" className="img img-fluid degidimage"></img>
                                    <label className="btn btn-outline-primary btn-light btn-block m-2">
                                        IdImage
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleIDImageChange}
                                            accept="image/*"
                                            hidden
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className='edit-image-source'>
                                <div className="alert alert-info image">
                                    <img src={ previewDeg != AVATAR_DEFAULT_URL ?  previewDeg : accountInfo?.evidenceUrls?.length && accountInfo.evidenceUrls[1] || previewDeg} alt="image" className="img img-fluid degidimage"></img>                                       
                                    <label className="btn btn-outline-primary btn-light btn-block m-2">
                                        DeImage
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleDegImageChange}
                                            accept="image/*"
                                            hidden
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="image-upload">
                                <img className="avatar" src={preview != AVATAR_DEFAULT_URL ? preview : accountInfo?.imgUrl || preview} alt="avatar"></img>
                                <label className='file-input-label btn-custom' htmlFor="image-input">
                                    Đổi ảnh
                                </label>
                                <input type={"file"} id='image-input' name="image" accept='image/*' onChange={handleAvatarChange} hidden></input>
                            </div>
                            <div className="txt_field">
                                <input
                                    type="text"
                                    //className="form-control"
                                    //placeholder="Enter email"
                                    name="firstName"
                                    placeholder={accountInfo.firstName}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} />
                                <span></span>
                                <label><i class='fas fa-id-card'></i>First Name</label>
                            </div>
                            <div className="txt_field">
                                <input
                                    type="text"
                                    //className="form-control"
                                    //placeholder="Enter email"
                                    name="lastName"
                                    placeholder={accountInfo.lastName}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} />
                                <span></span>
                                <label><i class='fas fa-id-card'></i>Last Name</label>
                            </div>
                            <div className="txt_field">
                                <input
                                    type="text"
                                    //className="form-control"
                                    //placeholder="Enter email"
                                    name="adress"
                                    placeholder={accountInfo.address}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)} />
                                <span></span>
                                <label><i class='fas fa-address-book mr-2'></i>Address</label>
                            </div>
                            <div className="txt_field">
                                <input
                                    type="text"
                                    //className="form-control"
                                    //placeholder="Enter email"
                                    name="phone"
                                    placeholder={accountInfo.phone}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)} />
                                <span></span>
                                <label><i class='far fa-address-book mr-2'></i>Phone</label>
                            </div>
                        </div>
                    </div>
                    <div className="mg-t-20 update-lawyer-btn" >
                            <button className={classnames("width-300 btn-custom")} disabled={isSubmitting} type="submit">Cập nhật thông tin</button>
                        </div>
                        {
                            accountInfo.status == "3" &&
                            <div className="mg-t-20" >
                                <button className={classnames("width-300 btn-custom")} disabled={isSubmitting} type="submit">Gửi lại yêu cầu</button>
                            </div>
                        }
                </form>
            </div>
        </div>
    )
}

export default UpdateLawyerScreen