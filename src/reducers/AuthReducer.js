import {ActionName} from '../actions/index'


export const INITIAL_STATE_AUTH = {
    isSignedIn: localStorage.getItem("isSignedIn"),
    userToken: localStorage.getItem("portalUserToken"),
    userId: localStorage.getItem("portalUserId"),
    expirationTime: localStorage.getItem("SessionExpirationTime"),
    groups: []
 
}
 
export const AuthReducer = (state = INITIAL_STATE_AUTH, action)=>{
    if(action.type === ActionName.LOGIN_USER){
        if(action.payload.data){
            localStorage.setItem("portalUserToken", action.payload.data.token);
            localStorage.setItem("portalUserId", action.payload.data.userId);
            localStorage.setItem("SessionExpirationTime", action.payload.data.expiration);
            localStorage.setItem("isSignedIn", true);
            return {
                ...state,
                isSignedIn: true,
                userToken: action.payload.data.token,
                userId: action.payload.data.userId,
                expirationTime: action.payload.data.expiration,
                error: null,
                groups: []
            }
        }
        else{
            localStorage.removeItem("portalUserToken");
            localStorage.removeItem("portalUserId");
            localStorage.removeItem("SessionExpirationTime");
            localStorage.removeItem("isSignedIn");
            return {
                ...state,
                isSignedIn: null,
                userToken: null,
                userId: null,
                expirationTime: null,
                error: action.payload.message,
                groups: []
            }
        }
    }
    if(action.type === ActionName.LOGOUT_USER){
        localStorage.removeItem("portalUserToken");
        localStorage.removeItem("portalUserId");
        localStorage.removeItem("SessionExpirationTime");
        localStorage.removeItem("isSignedIn");
        return {
            ...state,
            isSignedIn: null,
            userToken: null,
            userId: null,
            expirationTime: null,
            error: null,
            groups: []
        }
    }
    
    return state;
}