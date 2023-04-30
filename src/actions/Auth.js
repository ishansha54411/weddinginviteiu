import { ActionName } from './index'
import portalAPI from '../api'
export const SignIn=(email,password)=>async dispatch=>{
    var response=await portalAPI.post('authenticate/login',{
        email:email,
        password: password
    })
    console.log(response)
    if(response.statusCode===1){
        dispatch({
            type:ActionName.LOGIN_USER,
            payload:{
                message:null,
                data:response.data.data
            }
        })
    }
    else{
        dispatch({
            type:ActionName.LOGIN_USER,
            payload:{
                message: response.message,
                data:null
            }
        })
    }
}

export const SignOut=()=>{
    return ({
        type:ActionName.LOGOUT_USER
    })
}