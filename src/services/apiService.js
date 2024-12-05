import axios from '../utils/axiosCustomize';

const postLogin = async (username, password) => {
    return axios.post('/userAuth/login', { username: username, password: password }
    );
}

const getCart = async () => {
    // cart/get?customer_id=15
    return axios.get(`/cart/get`);
}
const addProductToCart = async (data) => {
    return axios.post('/cart/add', data);
}
const removeProductFromCart = async (cart_item_id) => {
    return axios.delete(`/cart/remove/?cart_item_id=${cart_item_id}`);
}
const updateProductInCart = async (cart_item_id,quantity) => {
    return axios.put(`/cart/update/?cart_item_id=${cart_item_id}&quantity=${quantity}`);
}

export {
    postLogin,
    getCart,
    addProductToCart,
    removeProductFromCart,
    updateProductInCart,
}
