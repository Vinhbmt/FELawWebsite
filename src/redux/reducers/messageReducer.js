import Cookies from 'js-cookie';
import { SET_ACCOUNT_INFO, SET_LOGIN } from '../constants';

const messageInitState = {
    conversationId: null,
    senderId: null,
    receiverId: null,
    content: null
}


const handleMessageState = (state =  messageInitState, action) => {
    switch(action.type) {
        case SET_LOGIN:
            return {
                ...state,
                token: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                role: action.payload.role
            }
        case SET_ACCOUNT_INFO:
            return {
                ...state,
                accountInfo: action.payload
            }
        default:
            return state;
    }
}

export default handleAuthState;