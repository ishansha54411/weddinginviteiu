import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { renderTextInput } from "../components/field-components";
import { connect,useDispatch,useSelector } from 'react-redux'
import { SignIn } from "../actions/Auth";
import {login} from '../store'
import portalAPI from '../api'
import { toast } from "react-toastify";

const Login = (props) => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const auth=useSelector((state)=>{
        return state.Auth
    });
    if(auth.isSignedIn && new Date(auth.expirationTime)>new Date())
    {
        navigate("/");
    }
    const OnSubmit = async formValues => {
        var response=await portalAPI.post('authenticate/login',{
            email:formValues.email,
            password: formValues.password
        })
        if(response.data.statusCode===1){
            dispatch(login(response.data.data))
        }
        else{
            toast.info(response.data.message)
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
            <Field component={renderTextInput} id="LoginFields" type="password" name="password" placeholder="Password" />


            <div className="flex-sb-m w-full p-t-3 p-b-32">
                <div className="contact100-form-checkbox">

                </div>

                <div>
                    <NavLink
                        className=""
                        activeClassName=""
                        to="/forgot-password"
                        exact
                    >
                        Forgot Password?
                    </NavLink>

                </div>
            </div>
            <div className="container-login100-form-btn">
                <button className="login100-form-btn">
                    Login
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
    return ({ signinError: state.Auth.error });
}
const mapDispatchToProps={
    SignIn
}
const validate = (formValues) => {
    const errors = {};
    if (!formValues.email) {
        errors.email = "Please Enter An Email";
    }
    if (!formValues.password) {
        errors.password = "Please Enter A Password";
    }
    return errors;
}

const formWrapped = reduxForm({
    form: "LoginUserForm", validate: validate
})(Login)

export default connect(mapStateToProps,mapDispatchToProps)(formWrapped);