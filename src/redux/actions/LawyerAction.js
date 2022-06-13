import axios from "axios";
import Cookies from "js-cookie";
import { SET_LOGIN } from "../constants";
import ApiAction from "./ApiAction";

class LawyerAction extends ApiAction {

    actSetLogin(data) {
        return {
            type: SET_LOGIN,
            payload: data
        }
    }

    actLogout() {
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
                Cookies.set('token', response.data.accessToken, { expires: 2 });
                Cookies.set('role', response.data.role, { expires: 2 });
                dispatch(this.actSetLogin({ ...response.data}));
            }
            return response;
        }
    }

    async asyncRegister(payload) {
        return async (dispatch) => {
            const response = await axios({
                method: 'post',
                url: 'https://lawyer-connect.herokuapp.com/api/v1/users/lawyer',
                headers: {'Content-Type': 'multipart/form-data'}, 
                body: payload,
            });
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
            const { authState: { token } } = getState();
            const response = await axios({
                method: 'get',
                url: 'http://localhost:4000/api/v1/authentication',
                headers: {Authorization: `Bearer ${token}`}, 
            });
            if( response.status === 401) {
                dispatch(this.actSetLogout());
                return false;
            }
            if(response.status === 200) {
                console.log(response.data);
                dispatch(this.actSetAccountInfo(response.data));
                return true;
            }
        }
    }
}

export default new LawyerAction();

export const setSearch = (searchQuery) => {
    return {
        type:"SET_SEARCH_QUERY",
        payload: searchQuery
    };
};

export const register = async (data) => await axios.post( 'https://lawyer-connect.herokuapp.com/api/v1/users/lawyer', data)