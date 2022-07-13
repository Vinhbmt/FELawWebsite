import axios from "axios";
import Cookies from "js-cookie";
import { SET_LOGIN } from "../constants";
import ApiAction from "./ApiAction";

class AuthAction extends ApiAction {

    actSetLogin(data) {
        return {
            type: SET_LOGIN,
            payload: data
        }
    }

    asyncLogout() {
        return (dispatch) => {
            dispatch(this.actSetLogout());
            dispatch(this.actSetAccountInfo(null));
        }
    }

    async asyncLogin(payload) {
        return async (dispatch) => {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:4000/api/v1/authentication/log-in',
                headers: {'Content-Type': 'application/json'}, 
                data: payload
            });
            if(response.status === 200) {
                Cookies.set('token', response.data.accessToken);
                Cookies.set('refresh-token', response.data.refreshToken);
                const response1 = await axios({
                    method: 'get',
                    url: 'http://localhost:4000/api/v1/authentication',
                    headers: {Authorization: `Bearer ${response.data.accessToken}`}
                });
                Cookies.set('role', response1.data.role, { expires: 2 });
                dispatch(this.actSetLogin({ ...response.data}));
            }
            return response;
        }
    }

    async asyncRegister(payload) {
        return async (dispatch) => {
            const response = await axios.post(`http://localhost:4000/api/v1/authentication/register`, payload)
            return response;
        }
    }

    async asyncUploadImage(data) {
        return async (dispatch) => {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:4000/api/v1/authentication/register_image',
                headers: {'Content-Type': 'multipart/form-data'}, 
                data: data
            });
            return response;
        }
    }

    async asyncGetAccountInfo() {
        return async (dispatch, getState) => {
            const { authState: { token, refreshToken } } = getState();
            let response;
            try {
                response = await axios({
                    method: 'get',
                    url: 'http://localhost:4000/api/v1/authentication',
                    headers: {Authorization: `Bearer ${token}`}, 
                });
                console.log(response);
                
                if(response.status === 200) {
                    dispatch(this.actSetAccountInfo(response.data));
                    return true;
                }
            }
            catch(error) {
                // if( response.status === 401) {
                    try {
                        const response1 = await axios({
                            method: 'post',
                            url: 'http://localhost:4000/api/v1/authentication/refresh-token',
                            data:  {refreshToken},
                        });
                        if(response1.status == 201){
                            Cookies.set('token', response1.data.accessToken);
                            response = await axios({
                                method: 'get',
                                url: 'http://localhost:4000/api/v1/authentication',
                                headers: {Authorization: `Bearer ${response1.data.accessToken}`}, 
                            });
                            dispatch(this.actSetAccountInfo(response.data));
                            return true;
                        }
                    } catch (error) {
                        alert("Token của bạn đã hết hạn");
                        dispatch(this.actSetLogout);
                        return false;
                    }
                
            }
        }
    }
}

export default new AuthAction();