import axios from 'axios';
export default {
    // Đăng nhập
    async login(user) {
        try {
            return await axios.post(`http://toeicexamonline.gq/api/Login/login`,
                user);
        } catch (error) {
            console.log(error);
        }
    },
    // Đăng ký
    async register(user) {
        try {
            return await axios.post(`http://toeicexamonline.gq/api/Login/register`,
                user);
        } catch (error) {
            console.log(error);
        }
    }
}