import React, { useEffect } from "react";
import portalAPI from '../api'
import { useNavigate, useSearchParams } from "react-router-dom";
import  RingLoader from "react-spinners/RingLoader";
import { CommonFunctions } from "../methods";

const VerifyEmail = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
    useEffect(()=>{
        (async ()=>{
            let response= await portalAPI.put("authenticate/confirm-email",{
                email:searchParams.get("email"),
                token:searchParams.get("token")
            });
            CommonFunctions.Message(response.data.statusCode,response.data.message)
            navigate('/')
        })();
        
    },[])
    return (<div className="wrap-login100">

        <form className="login100-form validate-form" >
            <div className="login100-form-title">
                <div className="pb-3">
                    Verifying Email
                </div>
            </div>
            
            <RingLoader color="blue"
            />
        </form>
        <div className="login100-more" >
        </div>
    </div>
    );
}
export default VerifyEmail;