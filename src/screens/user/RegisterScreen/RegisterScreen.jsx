import { useNavigate } from "react-router-dom";
import { useTitle } from "../../../core/customHook";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import classnames from 'classnames';
import './style.scss';
import AuthAction from "../../../redux/actions/AuthAction";
import { useEffect } from "react";

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
        console.log("helooo")
        const response = await dispatch(await AuthAction.asyncRegister({email, firstName, lastName, password}));
        if(response.status === 201) {
            navigate('/login');
        }
    }

    return(
        <div className="user-page register-user-page">
            <div className='register-content'>
                <div className='register-title mg-tb-20'>
                    <h3 className="title-format">Tạo tài khoản mới</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmitRegister)} className='register-form'>
                    <div>
                        <label className={classnames("d-block")} htmlFor="email">Email</label>
                        <input {...register('email')} type="text" className={classnames("width-300", `${errors.email ? "border border-danger" : ""}`)} id="email" placeholder="Email"/>
                        <p className="text-danger">{errors.email?.message}</p>
                    </div>
                    <div>
                        <label className={classnames("d-block")} htmlFor="firstName">First Name</label>
                        <input {...register('firstName')} type="text" className={classnames("width-300", `${errors.firstName ? "border border-danger" : ""}`)} id="firstName" placeholder=" First Name"/>
                        <p className="text-danger">{errors.firstName?.message}</p>
                    </div>
                    <div>
                        <label className={classnames("d-block")} htmlFor="lastName">Last Name</label>
                        <input {...register('lastName')} type="text" className={classnames("width-300", `${errors.lastName ? "border border-danger" : ""}`)} id="lastName" placeholder=" Last Name"/>
                        <p className="text-danger">{errors.lastName?.message}</p>
                    </div>
                    <div>
                        <label className={classnames("d-block")} htmlFor="password">Mật khẩu</label>
                        <input {...register('password')} type="password" className={classnames("width-300", `${errors.password ? "border border-danger" : ""}`)} id="password" placeholder="Password"/>
                        <p className="text-danger">{errors.password?.message}</p>
                    </div>
                    <div className="mg-t-20" style={{"textAlign": "center"}}>
                        <button className={classnames("width-300 btn-custom")} disabled={isSubmitting} type="submit">Đăng ký</button>
                    </div>
                </form>
                <div className="navigate-login" onClick={() => navigate('/login')}>Đăng nhập ngay!</div>
            </div>
        </div>
    )
}

export default RegisterScreen;