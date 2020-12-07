import axios from 'axios';
// axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token");
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers = {
        'Authorization': sessionStorage.getItem("token")
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
export default axios