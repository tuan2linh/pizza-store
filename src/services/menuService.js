import axios from '../utils/axiosCustomize';

const getAllMenu = async () => {
    return axios.get('/menu/list');
}

export {
    getAllMenu,
}