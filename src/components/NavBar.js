import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import auth from '../API/auth';


const NavBar = () => {
    const [, setState] = useState();

    const handleLogout = () => {
        auth.logout();
        setState({});
    }
    const currentUser = auth.currentUser();

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-primary text-warning">
                {
                    (currentUser) ? (<>
                        <Link to="/home" className="navbar-brand text-warning"><strong>MERN APP</strong></Link>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item my-auto"><strong>{currentUser.email}</strong></li>
                            <li className="nav-item">
                            <Link className="nav-link text-light" to="/login" onClick={handleLogout}>Logout</Link>
                            </li>
                        </ul></>
                    ) : (<>
                            <Link to="/register" className="navbar-brand text-warning"><strong>MERN APP</strong></Link>
                            <ul className="navbar-nav ml-auto">

                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/register">Register</Link>
                                </li>

                            </ul></>
                        )
                }
            </nav>
        </div>
    );
};

export default NavBar
