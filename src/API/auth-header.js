const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('userToken'));
    console.log(user);
    return (user && user.accessToken) ? { "x-access-token": `${user.accessToken}` } : {};
}
export default authHeader;