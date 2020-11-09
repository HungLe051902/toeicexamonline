import axios from 'axios';
export default {
    // Đăng nhập
    async login(user) {
        try {
            return await axios.post(`https://localhost:44346/api/Login/login`,
                user);
        } catch (error) {
            console.log(error);
        }
    },
    // Đăng ký
    async register(user) {
        try {
            return await axios.post(`https://localhost:44346/api/Login/register`,
                user);
        } catch (error) {
            console.log(error);
        }
    }
}