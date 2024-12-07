import axios from 'axios';
import { store } from '../redux/store';


const instance = axios.create({
    // front-end local backend server
        // baseURL: 'http://54.153.176.43/api',
    // front-end local backend local
        // baseURL: 'http://localhost:8000/api',
    // (lúc push code mới nhớ comment 2 cái bên trên, lúc muốn viết front-end thì comment cái này- mở 1 trong 2 cái bên trên)
    // front-end server backend server (deploy)
        baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
    }
});

instance.interceptors.request.use(function
    (config) {
    const token = store?.getState()?.user?.account?.token;
    if (token && config.requiresAuth !== false) {
        config.headers["token"] = token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response && response.data ? response.data : response;
}, function (error) {
    return error && error.response && error.response.data
        ? error.response.data
        : Promise.reject(error);
});

export default instance;
