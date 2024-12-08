import axios from '../utils/axiosCustomize';

const getIngre = async () => {
    return axios.get('/ingredient/list');
}

const getInpredientById = async (id) => {
    return axios.get(`/ingredient/${id}`);
}

const deleteIngre = async (id) => {
    return axios.delete(`/ingredient/remove/${id}`)
}

const updateIngre = async (id, formData) => {
    try {
        const response = await axios.put(`ingredient/update/${id}`, formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to update ingredient" };
    }
};


const addIngre = async (formData) => {
    try {
        const response = await axios.post("/ingredient/add", formData, {
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to add ingredient" };
    }
};

export {
    getIngre,
    deleteIngre,
    addIngre,
    updateIngre,
    getInpredientById,
}