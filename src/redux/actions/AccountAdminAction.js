import ApiAction from "./ApiAction";
import axios from "axios";

class AccountAdminAction extends ApiAction {

    async asyncGetUser(status) {
        return async (dispatch, getState) => {
            const { authState: { token } } = getState()
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/v1/users?status=${status}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        }
    }
}

export default new AccountAdminAction();