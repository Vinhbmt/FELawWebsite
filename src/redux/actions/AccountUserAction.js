import ApiAction from "./ApiAction";
import axios from "axios";

class AccountUserAction extends ApiAction {

    async asyncGetDetailLawyer(lawyerId) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/v1/users/lawyer?id=${lawyerId}`,
                // headers: {
                //     Authorization: `Bearer ${token}`
                // }
            });
            return response;
        }
    }

    async asyncBookingLawyer(data) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'post',
                url: `http://localhost:4000/api/v1/meetings`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                data: data
            });
            return response;
        }
    }

    async asyncGetListAppointment() {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/v1/meetings`,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response;
        }
    }

    async asyncGetAppointment(id) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/v1/meetings/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response;
        }
    }

    async asyncGetLawyerFreeTime(lawyerId, meetingDate) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/v1/meetings/lawyer?lawyerId=${lawyerId}&meetingDate=${meetingDate}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response;
        }
    }

    async asyncGetConversation(userId) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/v1/chat/get-conversation?userId=${userId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response;
        }
    }

    async asyncGetListConversation() {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/v1/chat/list-conversation`,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response;
        }
    }

    async asyncPostMessage(data) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'post',
                url: `http://localhost:4000/api/v1/chat/create-message`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                data: data
            });
            return response;
        }
    }

    async asyncGetPayment() {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/v1/payment`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        }
    }

    async asyncProcessPayment(data) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'post',
                url: `http://localhost:4000/api/v1/payment`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                data: data
            });
            return response;
        }
    }

    async asyncGetNotification() {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/v1/notification`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        }
    }

    async asyncChangePassword(data) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'put',
                url: `http://localhost:4000/api/v1/authentication/change-password`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                data: data
            });
            return response;
        }
    }

    async asyncUpdateInfo(data) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'put',
                url: `http://localhost:4000/api/v1/users/update`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type':'multipart/form-data'
                },
                data: data
            });
            return response;
        }
    }

}

export default new AccountUserAction();