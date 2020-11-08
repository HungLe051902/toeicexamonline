import axios from 'axios';
export default {
    login(user) {
        try {
            axios.post(`https://localhost:44346/api/login`,
                user)
                .then(response => {
                    console.log("Đăng nhập", response)
                })
                .catch(e => {
                    console.log(e);
                })
        } catch (error) {
            console.log(error);
        }
    }
}