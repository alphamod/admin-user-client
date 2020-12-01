import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import auth from '../API/auth';
import other from '../API/other';

const Email = () => {
    const [toEmails, setEmails] = useState("");
    const [isSuccess, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const currentUser = auth.currentUser();
    const { _id, email } = currentUser;

    const handleToEmailChange = e => {
        e.preventDefault();
        setEmails(e.target.value);
    }
    const handleEmailForm = e => {
        e.preventDefault();
        setMessage("");
        setSuccess(false);
        other.emailNotify(_id, toEmails, email).then(response => {
            setSuccess(true);
            setMessage(response.data.message);
        }, error => {
            const errMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setSuccess(false);
            setMessage(errMessage);
        })
    }

    return (
        <>
            {/* { */}
                {/* // currentUser.role[1] && ( */}
                    <Link to="/home" className="btn btn-primary mt-2">Home</Link>
                {/* ) */}
            {/* } */}
            {/* <Link to="/" className="btn btn-primary mt-2">Home</Link> */}
            <div className="shadow-lg w-75 p-3 mx-auto mt-4">
                <form onSubmit={handleEmailForm}>
                    {!isSuccess &&
                        (<>
                            <div className="form-group">
                                <label>To Emails:</label>
                                <input type="text" className="form-control" onChange={handleToEmailChange} value={toEmails} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Send Email Notifications</button>
                        </>
                        )
                    }
                    {
                        message && (
                            <div className="form-group my-2 text-center">
                                <div className={`alert ${(message) ? "alert-success" : "alert-danger"}`} role="alert">{message}</div>
                            </div>
                        )
                    }

                </form>
                <div className="alert alert-primary text-center my-2">Note: You can enter multiple emails seperated by commas.</div>
            </div>
        </>
    )
}

export default Email;
