import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
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
import { SocketContext } from "../../../core/config/socket.config";
import { connectSocket } from "../../../core/config/socket.config";

import { useState } from "react";
import { useContext } from "react";

const LoginScreen = () => {
    useTitle("Đăng nhập");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authState: {accountInfo, token } }  = useSelector(state => {
        return { authState: state.authState };
    })

    const {socket, setSocket} = useContext(SocketContext);
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
            const response = await dispatch(await AuthAction.asyncLogin({...data}));
            if(response.status === 200) {   
                console.log(response);        
                const response1 = await dispatch(await AuthAction.asyncGetAccountInfo("lawyer"));
                if(response1) {
                    console.log(response1)
                    navigate('/lawyer');
                    toast.success("Đăng nhập thành công !");
                    setSocket(connectSocket(response.data.accessToken));
                } 
                else {
                    toast.error("Bạn không phải luật sư!")
                }
            }
        } catch (error) {
            toast.error("Tài khoản hoặc mật khẩu không đúng !");       
        }
        reset();
                   
    }
    

    return(
        <div className='center3'>
            <h1>Đăng nhập</h1>
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
                <div class="signup_link">
                    Don't have an account?
                    <Link className="nav-link" to="/lawyer/register">Sign up</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginScreen;