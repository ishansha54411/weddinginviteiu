import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import portalAPI from '../api'
import { connect } from 'react-redux'
import { renderTextInput } from "../components/field-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CommonFunctions } from "../methods";
const UpdatePassword = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const OnSubmit = async formValues => {
        let response=await portalAPI().post('authenticate/update-password',{
            password:formValues.password,
            email:searchParams.get("email"),
            token:searchParams.get("token")
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

            <Field component={renderTextInput} id="LoginFields" type="password" name="password" placeholder="Password" />
            <Field component={renderTextInput} id="LoginFields" type="password" name="confirmpassword" placeholder="Confirm Password" />

            <div className="flex-sb-m w-full p-t-3 p-b-32">
                <div className="contact100-form-checkbox">

                </div>

                <div>
                    {/* <NavLink
                        className=""
                        activeClassName=""
                        to="/forgot-password"
                        exact
                    >
                        Forgot Password?
                    </NavLink> */}

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
    if(formValues.password!==formValues.confirmpassword){
        errors.confirmpassword="Password Did't Match";
    }
    return errors;
}

const formWrapped = reduxForm({
    form: "UpdatePasswordForm", validate: validate
})(UpdatePassword)

export default connect()(formWrapped);