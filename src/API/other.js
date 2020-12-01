import authHeader from './auth-header';
import axios from 'axios';

const BASE_API = `https://mern-admin-user.herokuapp.com/`

const userActivation = (userId, activate) => {
    return axios.get(`${BASE_API}user/user-activation/${userId}/${activate}`, { headers: authHeader() });
};

const adminPagination = pageNo => {
    return axios.get(`${BASE_API}admin/pagination/${pageNo}`, { headers: authHeader() });
};

const emailNotify = (userId, toContacts, fromUser) => {
    return axios.post(`${BASE_API}user/email-notify/${userId}`, { toContacts, fromUser }, { headers: authHeader() });
};

export default { userActivation, emailNotify, adminPagination };