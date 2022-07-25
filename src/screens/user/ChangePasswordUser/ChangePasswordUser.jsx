import React from "react";
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import AuthAction from "../../../redux/actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import classnames from 'classnames';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import "./style.scss"
import { toast } from "react-toastify";

const ChangePasswordUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        authState: { accountInfo },
    } = useSelector((state) => {
        return { authState: state.authState };
    });

    const asyncGetAccountInfo = async () => {
        const response = await dispatch(await AuthAction.asyncGetAccountInfo("user"));
        if (!response) {
            navigate('/login');
        }
    };

    useEffect(() => {
        asyncGetAccountInfo();
    }, []);

    console.log(accountInfo);

    // validate form login
    const validateChangePasswordSchema = yup.object().shape({
        oldPassword: yup.string().required('Không thể bỏ trống'),
        newPassword: yup.string().required('Không thể bỏ trống').matches(new RegExp('^[a-zA-Z0-9]{8,}$'), 'Mật khẩu chỉ bao gồm chữ, số, tối thiếu 8 ký tự'),
    })

    // use hook form 
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({resolver: yupResolver(validateChangePasswordSchema)});


    const changePassword = async (data) => {
        try {
            const response = await dispatch(await AccountUserAction.asyncChangePassword(data))
            console.log(response);
            if(response.status == 200) {
                navigate("/");
                toast.success("Đổi mật khẩu thành công!");
                reset();
            }
        } catch (error) {
            toast.error("Mật khẩu cũ không chính xác!");
        }

    }

    return (
        <>
            <div className="padding2"></div>
            <div className='center5'>
                <h1>Đổi mật khẩu</h1>
                <form onSubmit={handleSubmit(changePassword)}>
                    <div className="txt_field">
                        <input {...register('oldPassword')} type="text" className={classnames("width-300", `${errors.oldPassword ? "border border-danger" : ""}`)} id="oldPassword" placeholder="Old password" />
                        <p className="text-danger">{errors.oldPassword?.message}</p>
                        <span></span>
                        <label><i class='fas fa-lock'></i>Mật khẩu cũ</label>
                    </div>
                    <div className="txt_field">
                        <input {...register('newPassword')} type="text" className={classnames("width-300", `${errors.newPassword ? "border border-danger" : ""}`)} id="newPassword" placeholder="New password" />
                        <p className="text-danger">{errors.newPassword?.message}</p>
                        <span></span>
                        <label><i class='fas fa-lock'></i>Mật khẩu mới</label>
                    </div>
                    <input type="submit" value="Change Password" />
                </form>
            </div>
        </>
    )
}

export default ChangePasswordUser;