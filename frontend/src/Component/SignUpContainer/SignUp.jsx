import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { signUp } from '../../Actions/authAction';

import "./SignUp.css";

const SignUpComponent = () => {

    const history = useHistory();

    const [data, setData] = useState({});
    const [valid, setValid] = useState(false);

    function validateForm() {
        const regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

        return data['email']?.length > 0 &&
            data['password']?.length > 5 &&
            data['name']?.length > 0 &&
            data['phone_number']?.length > 0 &&
            data['confirm_password']?.length > 0 &&
            data['password'] === data['confirm_password'] &&
            regex.test(data['password']);
    }

    function handleChange(event) {
        const obj = { ...data };
        obj[event.target.name] = event.target.value;
        setData(obj);
        setValid(validateForm())
    }

    async function handleSubmit() {
        const res = await signUp(data);
        if (res?.status === 201) {
            history.push('/signin')
        }
    }

    return (
        <>
            <div className="signup">
                <h1>Sign Up</h1>
                <div>
                    <label>Enter Name</label>
                    <input className="input-div" name="name" onChange={handleChange} />
                </div>
                <div>
                    <label>Enter Email</label>
                    <input className="input-div" name="email" onChange={handleChange} />
                </div>
                <div>
                    <label>Enter Password</label>
                    <input className="input-div" type="password" name="password" onChange={handleChange} />
                </div>
                <div>
                    <label>Enter Confirm Password</label>
                    <input className="input-div" type="password" name="confirm_password" onChange={handleChange} />
                </div>
                <div>
                    <label>Enter Phone Number</label>
                    <input className="input-div" name="phone_number" onChange={handleChange} />
                </div>
                <h5 style={{ color: "red" }}>Password must contain one uppercase letter, one lowercase letter, one number and minimum 6 character </h5>
                <div>
                    <button className={valid ? "signup-button" : "signup-button-disable"} onClick={handleSubmit} disabled={!validateForm()}>Sign Up</button>
                </div>
                <div>
                    <a href="/signin">Sign In</a>
                </div>
            </div >
        </>
    )
}

export default SignUpComponent;