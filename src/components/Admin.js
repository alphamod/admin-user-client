import React, { useState, useEffect } from 'react'
import ActivateBtn from './ActivateBtn';
import otherAPIs from "../API/other";


const Admin = () => {
    const [users, setUsers] = useState([]);
    const [pageNo, setPageNo] = useState(1);

    const usersAPI = (pAPI, pageNo) => {
        pAPI(pageNo).then(res => {
            setUsers(res.data);
        });
    };

    const nextPage = () => {
        setPageNo(pageNo+1);
    };

    const prevPage = () => {
        if (pageNo <= 1) {
            setPageNo(1)
        } else if (pageNo > 1) {
            setPageNo(pageNo-1);
        }
    };

    useEffect(() => {
        usersAPI(otherAPIs.adminPagination, pageNo);
    }, [pageNo]);

    const rendertableData = () => {
        return users.map(user => {
            const { _id: id, email, isActive } = user;
            return (
                <tr key={id}>
                    <td>{email}</td>
                    <td><ActivateBtn active={isActive} id={id} /></td>
                </tr>
            )
        })
    }
    console.log(users);
    return (
        <div className="my-2 shadow-lg">
            <table className="table table-striped text-center table-hover">
                <thead>
                    <tr>
                        <th scope="col" className="text-primary text-center">User Email Id</th>
                        <th scope="col" className="text-primary text-center">Active Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rendertableData() }
                </tbody>
            </table>
            <div className="row px-5 my-3">
                <button className="btn btn-info shadow-sm mr-auto" onClick={prevPage}>Previous Page</button>
                <button className="btn btn-info shadow-sm ml-auto" onClick={nextPage}>Next Page</button>
            </div>
            <div className="alert alert-primary text-center">Note: Green Dot Indicates Active user and Red Dot indicates Deactivated User.</div>
        </div>
    )
}

export default Admin
