import axios from '../utils/axiosCustomize';

const getCustomer = async () => {
    return axios.get('/user/customer');
}

export {
    getCustomer,
}