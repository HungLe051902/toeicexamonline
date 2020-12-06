import axios from './baseaxios.js';
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL_LOGIN
export default {
    // Đăng nhập
    async login(user) {
        try {
            return await axios.post(`/Login/login`,
                user);
        } catch (error) {
            console.log(error);
        }
    },
    // Đăng ký
    async register(user) {
        try {
            return await axios.post(`/Login/register`,
                user);
        } catch (error) {
            console.log(error);
        }
    }
}