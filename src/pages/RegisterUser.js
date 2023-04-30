import React from "react";
import { NavLink } from "react-router-dom";
import { Field, formValues, reduxForm } from "redux-form";
import { renderTextInput } from "../components/field-components";
import { connect } from 'react-redux'
import portalAPI from '../api'
import { CommonFunctions } from "../methods";
import { useNavigate } from "react-router-dom";

const RegisterUser = (props) => {
    
  const navigate = useNavigate();
    const OnSubmit = async formValues => {
        let response=await portalAPI().post('authenticate/register',{
            email: formValues.email,
            password: formValues.password,
            name: formValues.name,
            verifyTokenURL:window.location.origin+'/weddinginviteiu/#/verify-email'
        });
        CommonFunctions.Message(response.data.statusCode,response.data.message)
        if(response.data.statusCode===1){
            navigate("/");
        }
    }
    return (<div className="wrap-login100">

        <form className="login100-form validate-form" onSubmit={props.handleSubmit(OnSubmit)}>
            <div className="login100-form-title">
                <div className="pb-3">
                <NavLink
                    to="/"
                    exact
                >
                    Wedding
                </NavLink>
                </div>
            </div>
            <Field component={renderTextInput} id="LoginFields" name="email" placeholder="Email" />
            <Field component={renderTextInput} id="LoginFields" name="user" placeholder="User Name" />
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
                    Register User
                </button>

            </div>
            {/* <NavLink
                className="container-login100-form-btn login100-form-btn"
                activeClassName=""
                to="/"
                exact
            >
                cancel
            </NavLink> */}

        </form>
        <div className="login100-more" >
        </div>
    </div>
    );
}
const mapStateToProps = (state) => {
    return ({ signinError: state.Auth.error, token: state.Auth.userToken });
}
const mapDispatchToProps={
    
}
const validate = (formValues) => {
    const errors = {};
    if (!formValues.email) {
        errors.email = "Please Enter An Email";
    }

    if (!formValues.user) {
        errors.user = "Please Enter A User Name";
    }

    if(!formValues.password){
        errors.password = "Please Enter A Password";
    }

    if(formValues.password!==formValues.confirmpassword){
        errors.confirmpassword="Password Did't Match";
    }
    return errors;
}

const formWrapped = reduxForm({
    form: "RegisterUserForm", validate: validate
})(RegisterUser)

export default connect(mapStateToProps,mapDispatchToProps)(formWrapped);