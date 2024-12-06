import axios from '../utils/axiosCustomize';

const getSuppliers = async () => {
    return axios.get('/supplier/list');
}

const deleteSupplier = async (id) => {
    return axios.delete(`/supplier/remove/${id}`)
}

const updateSupplier = async (id, formData) => {
    try {
        const response = await axios.put(`supplier/update/${id}`, formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to update ingredient" };
    }
};


const addSupplier = async (formData) => {
    try {
        const response = await axios.post("/supplier/add", formData, {
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to add supplier" };
    }
};

export {
    getSuppliers,
    deleteSupplier,
    addSupplier,
    updateSupplier,
}