import axios from 'axios';
export default {
    async login(user) {
        try {
            return await axios.post(`https://localhost:44346/api/login`,
                user);
        } catch (error) {
            console.log(error);
        }
    }
}