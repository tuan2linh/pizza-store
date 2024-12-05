import axios from '../utils/axiosCustomize';

const getProduct = async () => {
    return axios.get('/food/list');
}

const deleteProduct = async (id) => {
    return axios.delete(`food/remove/${id}`)
}

const addProduct = async (formData) => {
    try {
        const response = await axios.post("/food/add", formData, {
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to add food" };
    }
};

export {
    getProduct,
    deleteProduct,
    addProduct,
}