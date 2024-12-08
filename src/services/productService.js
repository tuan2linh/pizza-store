import axios from '../utils/axiosCustomize';

const getProduct = async () => {
    return axios.get('/food/list');
}

const getProductByID = async (id) => {
    return axios.get(`/food/${id}`);
}

const deleteProduct = async (id) => {
    return axios.delete(`food/remove/${id}`)
}

const addProduct = async (formData) => {
    try {
        const response = await axios.post("/food/add", formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to add food" };
    }
};

const updateProduct = async (id, formData) => {
    try {
        const response = await axios.put(`food/update/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to update food" };
    }
};

export {
    getProduct,
    deleteProduct,
    addProduct,
    getProductByID,
    updateProduct
}