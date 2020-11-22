const setUser = token => {
    localStorage.setItem('token', token);
};
const clearUser = () => {
    localStorage.clear();
};
const getUser = () =>{
    return localStorage.getItem('token')
}

export { setUser, clearUser, getUser }