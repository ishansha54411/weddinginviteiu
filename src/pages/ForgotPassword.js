import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import portalAPI from '../api'
import { connect } from 'react-redux'
import { renderTextInput } from "../components/field-components";
import { useNavigate } from "react-router-dom";
import { CommonFunctions } from "../methods";
const ForgotPassword = (props) => {

  const navigate = useNavigate();
    const OnSubmit = async formValues => {
        let response=await portalAPI.post('authenticate/forgot-password',{
            email: formValues.email,
            verifyTokenURL:window.location.origin+'/update-password'
        });
        CommonFunctions.Message(response.data.statusCode,response.data.message)
        if(response.data.statusCode===1){
            navigate("/");
        }
    }
    return (<div className="wrap-login100">
        <form className="login100-form validate-form"  onSubmit={props.handleSubmit(OnSubmit)}>
            <div className="login100-form-title">
                <div className="pb-3">
                    Forgot Password
                </div>
            </div>

            <Field component={renderTextInput} id="LoginFields" name="email" placeholder="Email" />
            <div className="flex-sb-m w-full p-t-3 p-b-32">
                <div class="contact100-form-checkbox">

                </div>

                <div>

                </div>
            </div>
            <div className="container-login100-form-btn">
                <button className="login100-form-btn">
                    Reset Password
                </button>

            </div>
        </form>
        <div className="login100-more" >
        </div>
    </div>
    );
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.email) {
        errors.email = "Please Enter An Email";
    }
    return errors;
}

const formWrapped = reduxForm({
    form: "ForgetPasswordForm", validate: validate
})(ForgotPassword)

export default connect()(formWrapped);