import ApiAction from "./ApiAction";
import axios from "axios";

class LawyerAdminAction extends ApiAction {

    async asyncGetLawyer(status) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/v1/users/lawyers?status=${status}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        }
    }

    async asyncGetActiveLawyer(status) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/v1/authentication?status=${status}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        }
    }
  
    async asyncDeleteLawyer(email) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'delete',
                url: `http://localhost:4000/api/v1/users?email=${email}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        }
    }

    async asyncUpdateLawyer(email, status, score) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            let url = `http://localhost:4000/api/v1/users/lawyer/approve?email=${email}&status=${status}`
            if (score) {
                url += `&ratingScore=${score}`
            }
            const response = await axios({
                method: 'put',
                url,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response;
        }
    }
}

export default new LawyerAdminAction();