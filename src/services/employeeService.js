import axios from '../utils/axiosCustomize';

const getEmployee = async () => {
    return axios.get('/user/employee');
}

const getEmployeeByID = async (id) => {
    return axios.get(`/user/getEmployee/${id}`);
}

const updateEmployee = async (id, formData) => {
    try {
        const response = await axios.put(`/user/updateEInfo/${id}`, formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to update employee" };
    }
};

const addEmployee = async (formData) => {
    try {
        const response = await axios.post("/user/addEmployee", formData, {
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Failed to add employee" };
    }
};

const deleteEmployee = async (id) => {
    return axios.delete(`/user/removeEmployee/${id}`)
}


export {
    getEmployee,
    getEmployeeByID,
    addEmployee,
    updateEmployee,
    deleteEmployee
}