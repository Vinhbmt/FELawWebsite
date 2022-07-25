import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../../core/customHook";
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import * as yup from 'yup';
import classnames from 'classnames';
import AuthAction from "../../../redux/actions/AuthAction";
import './style.scss';
import { toast } from "react-toastify";

const UpdateInfoUser = () => {
    useTitle("Cập nhật thông tin");

    let AVATAR_DEFAULT_URL = "https://via.placeholder.com/100x100.png?text=PREVIEW"

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authState: { accountInfo, token } } = useSelector(state => {
        return { authState: state.authState };
    })

    const [loading, setLoading] = useState(false);

    const asyncGetAccountInfo = async () => {
        const response = await dispatch(await AuthAction.asyncGetAccountInfo("user"));
        if (!response) {
            navigate('/login');
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
    const [preview, setPreview] = useState(AVATAR_DEFAULT_URL )

    const handleAvatarChange = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setAvatar(e.target.files[0])
    }

    const onSubmitUpdate = async (e) => {
        e.preventDefault();
        console.log("helooo")
        let userData = new FormData()
        firstName && userData.append("firstName", firstName)
        lastName && userData.append("lastName", lastName)
        address && userData.append("address", address)
        phone && userData.append("phone", phone)
        avatar && userData.append("imgUrl", avatar)
        console.log([...userData]);
        try {
            const response = await dispatch(await AccountUserAction.asyncUpdateInfo(userData));
            console.log(response);
            if (response.status === 200) {
                navigate('/');
                toast.success("Cập nhật thông tin thành công !");
                setLoading(!loading);
            }
        } catch (error) {
            toast.error("Cập nhật thông tin thất bại !"); 
        }
        
    }

    const validateUpdateUserInfoSchema = yup.object().shape({
        name: yup.string().required('Không thể bỏ trống').matches(new RegExp('^[a-zA-Z" "]|[à-ú]|[À-Ú]{4,50}$'), 'Tên người dùng chỉ bao gồm chữ, kí tự khoảng trắng, từ 4 - 50 ký tự'),
        email: yup.string().required('Không thể bỏ trống').email('Email không hợp lệ'),
        address: yup.string(),
    })

    return (           
        accountInfo !== null &&
        <>
            <div className="padding2"></div>
            <div className="user-page update-user-page1">
                <div className="login-title mt-20 mb-20">
                    <h1 className="title-format">Cập nhật thông tin</h1>
                </div>
                <div className="update-user1">
                    <form onSubmit={onSubmitUpdate} className='update-form'>
                        <div className="update-form2">
                            <div>
                                <div className="image-upload">
                                    <img className="avatar" src={preview != AVATAR_DEFAULT_URL ? preview : accountInfo?.imgUrl || preview} alt="avatar"></img>
                                    <label className='file-input-label btn-custom' htmlFor="image-input">
                                        Đổi ảnh
                                    </label>
                                    <input type={"file"} id='image-input' name="image" accept='image/*' onChange={handleAvatarChange} hidden></input>
                                </div>
                            </div>
                            <div>
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
                            <button className={classnames("width-300 btn-custom")} type="submit">Cập nhật thông tin</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateInfoUser;