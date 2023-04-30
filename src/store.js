import { configureStore,createSlice } from '@reduxjs/toolkit';
import { reducer as formReducer} from 'redux-form'
export const INITIAL_STATE_AUTH = {
    isSignedIn: localStorage.getItem("isSignedIn"),
    userToken: localStorage.getItem("portalUserToken"),
    userId: localStorage.getItem("portalUserId"),
    expirationTime: localStorage.getItem("SessionExpirationTime"),
    groups: []
 
}

const AuthSlice=createSlice({
    name: 'Auth',
    initialState: INITIAL_STATE_AUTH,
    reducers:{
        login(state,action){
            console.log('login called!');
            console.log(action);
            if(action.payload){
                localStorage.setItem("portalUserToken", action.payload.token);
                localStorage.setItem("portalUserId", action.payload.userId);
                localStorage.setItem("SessionExpirationTime", action.payload.expiration);
                localStorage.setItem("isSignedIn", true);
                return {
                    ...state,
                    isSignedIn: true,
                    userToken: action.payload.token,
                    userId: action.payload.userId,
                    expirationTime: action.payload.expiration,
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
        },
        logout(state,action){
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
    }
})

export const store =configureStore({
    reducer:{
        Auth:AuthSlice.reducer,
        form:formReducer
    }
})

export const {login} =AuthSlice.actions;
export const {logout}=AuthSlice.actions;

// console.log(JSON.stringify(store.getState()))
// store.dispatch({
//     type: 'Auth/login',
//     payload:''
// })