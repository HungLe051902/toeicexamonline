import axios from 'axios';
export default {
    login(user) {
        try {
            axios.post(`https://localhost:44346/api/login`,
                user, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            })
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