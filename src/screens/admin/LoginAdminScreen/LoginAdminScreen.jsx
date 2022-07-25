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
import { useEffect } from "react";
import { toast } from 'react-toastify';

const LoginAdminScreen = () => {
    useTitle("Đăng nhập");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authState: { token } }  = useSelector(state => {
        return { authState: state.authState };
    })

    // useEffect(() => {
    //     if(token) navigate('/');
    // }, [])

    // validate form login
    const validateLoginSchema = yup.object().shape({
        email: yup.string().required('Không thể bỏ trống'),
        password: yup.string().required('Không thể bỏ trống'),
    })

    // use hook form 
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({resolver: yupResolver(validateLoginSchema)});

    const onSubmitLogin = async (data) => {
        try {
            const response = await dispatch(await AuthAction.asyncLogin({...data, role: "admin"}));          
            if(response.status === 200) {           
                const response1 = await dispatch(await AuthAction.asyncGetAccountInfo("admin"));
                if(response1) {
                    //console.log(response1)
                    navigate('/admin');
                    toast.success("Đăng nhập thành công !");
                } 
                else {
                    toast.error("Bạn không phải admin!")
                }
            }
        } catch (error) {
            toast.error("Tài khoản hoặc mật khẩu không đúng !");       
        }      
        reset();
    }


    return(
        <div className='center2'>
            <h2>Đăng nhập quản trị viên</h2>
            <form onSubmit={handleSubmit(onSubmitLogin)}>
                <div className="txt_field">
                    <input {...register('email')} type="text" className={classnames("width-300", `${errors.email ? "border border-danger" : ""}`)} id="email" placeholder="Email" />
                    <p className="text-danger">{errors.email?.message}</p>
                    <span></span>
                    <label><i class='fas fa-id-card'></i>Email</label>
                </div>
                <div className="txt_field">
                    <input {...register('password')} type="password" className={classnames("width-300", `${errors.password ? "border border-danger" : ""}`)} id="password" placeholder="Password" />
                    <p className="text-danger">{errors.password?.message}</p>
                    <span></span>
                    <label><i class='fas fa-lock'></i>Password</label>
                </div>
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default LoginAdminScreen;