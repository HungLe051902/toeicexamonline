import axios from './baseaxios.js';

// const baseURL = "http://toeicexamonline.gq/api";
const baseURL = process.env.VUE_APP_BASE_URL_LOGIN
export default {
    // Đăng nhập
    async login(user) {
        try {
            return await axios.post(`${baseURL}/Login/login`,
                user);
        } catch (error) {
            console.log(error);
        }
    },
    // Đăng ký
    async register(user) {
        try {
            return await axios.post(`${baseURL}/Login/register`,
                user);
        } catch (error) {
            console.log(error);
        }
    }
}