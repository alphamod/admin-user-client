import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import auth from '../API/auth';
import Admin from './Admin';


const Home = () => {
    const currentUser = auth.currentUser();
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        setUserRole(currentUser.role[currentUser.role.length - 1]);
    }, [currentUser.role[currentUser.role.length - 1]]);

    if (!currentUser) {
        return <Redirect to="/login" />
    } else if (currentUser && (currentUser.role.length === 1)) {
        return <Redirect to="/email" />
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        {
                            (userRole === "admin") &&
                                (
                                    <>
                                        <h4 className="text-primary text-center mt-2">Admin DashBoard</h4>
                                        <Link to="/email" className="btn btn-primary">Email</Link>
                                        <Admin />
                                    </>
                                ) 
                        }
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Home;
