import axios from '../utils/axiosCustomize';

const postLogin = async (username, password) => {
    return axios.post('/userAuth/login', { username: username, password: password }
    );
}
const postRegister = async (data) => {
    return axios.post('/userAuth/register', data);
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

// voucher
const getCartId = async () => {
    return axios.get('/cart/getID');
}
const createVoucher = async (data) => {
    return axios.post('/voucher/createVch', data);
}
const updateVoucherStatus = async (voucher_id,status) => {
    return axios.put(`/voucher/updateVchStatus?voucher_id=${voucher_id}&status=${status}`);
}
const getActiveVoucher = async () => {
    return axios.get('/voucher/getActiveVch');
}
const getAllVoucher = async () => {
    return axios.get('/voucher/get');
}
// const deleteVoucher = async (voucher_id) => {
const getVoucherById = async (voucher_id) => {
    return axios.get(`/voucher/getVchById/?voucher_id=${voucher_id}`);
}
const createEvent = async (data) => {
    return axios.post('/voucher/createEvent', data);
}
const applyVoucherToCart = async (data) => {
    return axios.post('/voucher/applyVch', data);
}
const removeVoucherFromCart = async (cartId,data) => {
    return axios.post(`/voucher/removeVch?cartId=${cartId}`);
}
const applyLoyatyPoint = async (data) => {
    return axios.post('/voucher/applyLytPoints', data);
}
const removeLoyatyPoint = async (cartId) => {
    return axios.post(`/voucher/removeLytP?cartId=${cartId}`);
}
const getLoyalPoint = async () => {
    return axios.get('/user/getloyaltyPnt');
}

// Order
const getAllOrder = async () => {
    return axios.get('/order/get');
}
const getOrderbyId = async (orderId) => {
    return axios.get(`/order/getOrderById?orderId=${orderId}`);
}
const updateOrderStatus = async (orderId,status) => {
    return axios.put(`/order/update?newStatus=${status}&orderId=${orderId}`);
}

export {
    postLogin,
    postRegister,
    getCart,
    addProductToCart,
    removeProductFromCart,
    updateProductInCart,
    createVoucher,
    updateVoucherStatus,
    getActiveVoucher,
    getAllVoucher,
    getVoucherById,
    createEvent,
    applyVoucherToCart,
    removeVoucherFromCart,
    applyLoyatyPoint,
    removeLoyatyPoint,
    getCartId,
    getLoyalPoint,
    getAllOrder,
    getOrderbyId,
    updateOrderStatus
}
