import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { signIn } from '../../Actions/authAction';

import "./SignIn.css";

const SignInComponent = () => {

    const history = useHistory();
    const [data, setData] = useState({});
    const [valid, setValid] = useState(false);

    function validateForm() {
        return data['email']?.length > 0 &&
            data['password']?.length > 0
    }

    function handleChange(event) {
        const obj = { ...data };
        obj[event.target.name] = event.target.value;
        setData(obj);
        setValid(validateForm())
    }

    async function handleSubmit() {
        const res = await signIn(data);
        if (res?.status === 200) {
            history.push('/')
        } else {

        }
    }

    return (
        <>

            <div className="signin">
                <h1>Sign In</h1>
                <div>
                    <label>Enter Email</label>
                    <input className="input-div" placeholder="Email" name="email" onChange={handleChange} />
                </div>
                <div>
                    <label>Enter Password</label>
                    <input className="input-div" placeholder="password" type="password" name="password" onChange={handleChange} />
                </div>
                <div>
                    <button className={valid ? "signin-button" : "signin-button-disable"} onClick={handleSubmit} disabled={!validateForm()}>Login</button>
                </div>
                <div>
                    <a href="/signup">Create Account</a>
                </div>
            </div>
        </>
    )
}

export default SignInComponent;