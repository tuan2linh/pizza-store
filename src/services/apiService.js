import axios from '../utils/axiosCustomize';

const postLogin = async (username, password) => {
    return axios.post('/user/login', { username: username, password: password }
    );
}

export {
    postLogin,
}
