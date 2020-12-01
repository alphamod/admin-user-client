import axios from 'axios';

const BASE_API = 'https://mern-admin-user.herokuapp.com/';

const register = (email, password) => {
    return axios.post(`${BASE_API}register`, { email, password });
};

const login = (email, password) => {
    return axios.post(`${BASE_API}login`, { email, password })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("userToken", JSON.stringify(response.data));
            }
            console.log(response.data);
            return response.data;
        });
};

const logout = () => {
    console.log("logout fn");
    localStorage.removeItem("userToken");
};

const currentUser = () => {
    return JSON.parse(localStorage.getItem("userToken"));
};

export default { register, login, logout, currentUser };