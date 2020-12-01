import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import auth from '../API/auth';

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setSuccess] = useState(false);

    const currentUser = auth.currentUser();

    const handleLogin = e => {
        e.preventDefault();
        setMessage("");
        setSuccess(false);
        auth.login(email, password).then(response => {
            console.log(response);
            setSuccess(true);
            props.history.push("/home");
            window.location.reload();
        }, error => {
            const errMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setMessage(errMessage);
            setSuccess(false);
        })
    }
    const handleEmailChange = e => {
        e.preventDefault();
        setEmail(e.target.value);
    };
    const handlePasswordChange = e => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    if (currentUser) {
        // console.log(currentUser);
        return <Redirect to="/home"/>
    }
    return (
        
        <div className="loginComp p-3 shadow-lg w-50 mx-auto my-5">
            <h5 className="text-center text-primary">Login</h5>
            <form className="my-2" onSubmit={handleLogin}>
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
                        <button type="submit" className="btn btn-primary">Login</button>
                    </>
                    )
                }
                {
                    message && (
                        <div className="form-group my-2 text-center">
                            <div className="alert alert-danger" role="alert">{message}</div>
                        </div>
                    )
                }
            </form>
            <div className="text-center ">
            <Link className="text-decoration-none" to="/register">No account? Register here!</Link>
            </div>
        </div>
    )
}

export default Login
