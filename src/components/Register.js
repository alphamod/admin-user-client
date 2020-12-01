import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import auth from '../API/auth';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setSuccess] = useState(false);

    const currentUser = auth.currentUser();
    if (currentUser) {
        return <Redirect to="/home" />
    }
    const handleEmailChange = e => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handlePasswordChange = e => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    const handleRegister = e => {
        e.preventDefault();
        setMessage("");
        setSuccess(false);
        auth.register(email, password).then(response => {
            setMessage(response.data.message);
            setSuccess(true);
        }, error => {
            const errMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setMessage(errMessage);
            setSuccess(false);
        })
    }

    return (
        <div className="p-3 shadow-lg w-50 mx-auto my-5">
            <h5 className="text-center text-primary">Register</h5>
            <form className="my-2" onSubmit={handleRegister}>
                {!isSuccess &&
                    (<>
                        <div className="form-group">
                            <label htmlFor="email">Email :</label>
                            <input type="email" className="form-control" onChange={handleEmailChange} value={email} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password :</label>
                            <input type="password" className="form-control" onChange={handlePasswordChange} value={password} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </>
                    )
                }
                {
                    message && (
                        <div className="form-group my-2 text-center">
                            <div className={isSuccess ? "alert alert-success" : "alert alert-danger"} role="alert">{message}</div>
                        </div>
                    )
                }
            </form>
            <div className="text-center ">
                <Link className="text-decoration-none" to="/login">Have account? Login here!</Link>
            </div>
        </div>
    )
}

export default Register;
