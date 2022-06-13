import ApiAction from "./ApiAction";
import axios from "axios";

class LawyerAdminAction extends ApiAction {

    async asyncGetLawyer() {
        return async (dispatch) => {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:4000/api/v1/users/lawyer',
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjdhYThmMThmZDRmN2Y0OWFhZTkzZDMiLCJpYXQiOjE2NTQyNDE3MTcsImV4cCI6MTY1NDI0NTMxN30.DeC35wMi5wMxmhUwkgJSoE0bfn8rkUeOFbuGgD6PmCs`
                }
            });
            return response;
        }
    }


    async asyncUploadLawyer(payload) {
        return async (dispatch) => {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:4000/api/v1/users/lawyer',
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjdhYThmMThmZDRmN2Y0OWFhZTkzZDMiLCJpYXQiOjE2NTQyNDE3MTcsImV4cCI6MTY1NDI0NTMxN30.DeC35wMi5wMxmhUwkgJSoE0bfn8rkUeOFbuGgD6PmCs`,
                    'Content-Type': 'application/json'
                }, 
                data: payload
            });
            return response;
        }
    }

    
    async asyncDeleteLawyer(email) {
        return async (dispatch) => {
            const response = await axios({
                method: 'delete',
                url: `http://localhost:4000/api/v1/users?email=${email}`,
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjdhYThmMThmZDRmN2Y0OWFhZTkzZDMiLCJpYXQiOjE2NTQyNDE3MTcsImV4cCI6MTY1NDI0NTMxN30.DeC35wMi5wMxmhUwkgJSoE0bfn8rkUeOFbuGgD6PmCs`
                }
            });
            return response;
        }
    }
}

export default new LawyerAdminAction();