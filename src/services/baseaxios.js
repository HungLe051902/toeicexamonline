import axios from 'axios';
// axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token");
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers = {
        'Authorization': sessionStorage.getItem("token")
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (config) {
    return config;
}, function (error) {
    if (error.response.status === 401){
        window.location = '/';
        sessionStorage.clear();
    }
    // Do something with request error
    else
        return Promise.reject(error);
});
export default axios