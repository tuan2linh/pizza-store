import axios from '../utils/axiosCustomize';

const getProduct = async () => {
    return axios.get('/food/list');
}

const deleteProduct = async (id) => {
    return axios.delete(`food/remove/${id}`)
}

// const addProduct = async (productData) => {
//     try {
//         const response = await axios.post('/food/add', productData);
//         return response;
//     } catch (error) {
//         console.error("Failed to add product:", error);
//         throw error;
//     }
// };

const addProduct = async (formData) => {
    
    // const formData = new FormData();
    // formData.append("Product_Name", foodData.Product_Name);
    // formData.append("Menu_Name", foodData.Menu_Name);
    // formData.append("Description", foodData.Description);
    // formData.append("SizeWithPrice", JSON.stringify(foodData.SizeWithPrice));

    // if (foodData.Image) {
    //     formData.append("Image", foodData.Image);
    // }

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