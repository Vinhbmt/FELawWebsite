import { useNavigate, Link } from "react-router-dom";
import { useTitle } from "../../../core/customHook";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import classnames from 'classnames';
import './style.scss';
import AuthAction from "../../../redux/actions/AuthAction";
import { useEffect } from "react";
import {toast } from 'react-toastify';

const RegisterScreen = () => {
    useTitle("Đăng ký");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { authState: { token } }  = useSelector(state => {
    //     return { authState: state.authState };
    // })

    // useEffect(() => {
    //     if(token) navigate('/');
    // }, [])

    // validate form register
    const validateRegisterSchema = yup.object().shape({
        email: yup.string().email('Email không hợp lệ').required('Không thể bỏ trống'),
        firstName: yup.string().required('Không thể bỏ trống').matches(new RegExp('^[a-zA-Z]|[à-ú]|[À-Ú]{4,50}$'), 'Tên người dùng chỉ bao gồm chữ, từ 4 - 50 ký tự'),
        lastName: yup.string().required('Không thể bỏ trống').matches(new RegExp('^[a-zA-Z]|[à-ú]|[À-Ú]{4,50}$'), 'Tên người dùng chỉ bao gồm chữ, từ 4 - 50 ký tự'),
        password: yup.string().required('Không thể bỏ trống').matches(new RegExp('^[a-zA-Z0-9]{8,}$'), 'Mật khẩu chỉ bao gồm chữ, số, tối thiếu 8 ký tự')
    })

    // use hook form 
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({resolver: yupResolver(validateRegisterSchema)});

    const onSubmitRegister = async (data) => {
        const { email , firstName , lastName , password } = data;
        try {
            const response = await dispatch(await AuthAction.asyncRegister({email, firstName, lastName, password}));
            if(response.status === 201) {
                navigate('/login');
                toast.success("Tạo tài khoản thành công !");
            }
        } catch (error) {
            
        }
        
    }

    return(
            <div className='center5'>
                <h1 className="title-format">Tạo tài khoản mới</h1>
                <form onSubmit={handleSubmit(onSubmitRegister)} className='register-form'>
                    <div className="txt_field">
                        <input {...register('email')} type="text" className={classnames("width-300", `${errors.email ? "border border-danger" : ""}`)} id="email" placeholder="Email"/>
                        <p className="text-danger">{errors.email?.message}</p>
                        <span></span>
                        <label><i class='fas fa-id-card'></i>Email</label>
                    </div>
                    <div className="txt_field">
                        <input {...register('firstName')} type="text" className={classnames("width-300", `${errors.firstName ? "border border-danger" : ""}`)} id="firstName" placeholder="First Name"/>
                        <p className="text-danger">{errors.firstName?.message}</p>
                        <span></span>
                        <label><i class='fas fa-address-book mr-2'></i>Họ</label>
                    </div>
                    <div className="txt_field">
                        <input {...register('lastName')} type="text" className={classnames("width-300", `${errors.lastName ? "border border-danger" : ""}`)} id="lastName" placeholder=" Last Name"/>
                        <p className="text-danger">{errors.lastName?.message}</p>
                        <span></span>
                        <label><i class='far fa-address-book mr-2'></i>Tên</label>
                    </div>
                    <div className="txt_field">
                        <input {...register('password')} type="password" className={classnames("width-300", `${errors.password ? "border border-danger" : ""}`)} id="password" placeholder="Password"/>
                        <p className="text-danger">{errors.password?.message}</p>
                        <span></span>
                        <label><i class='fas fa-lock'></i>Mật khẩu</label>
                    </div>
                    <input type="submit" value="Create account" />
                    <div class="signup_link">
                        Already have an account?
                        <Link className="nav-link" to="/login">Sign in</Link>
                    </div>
                </form>
            </div>
    )
}

export default RegisterScreen;