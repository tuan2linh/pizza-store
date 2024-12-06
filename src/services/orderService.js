import axios from '../utils/axiosCustomize';

const addOrder = async (customerId) => {
    try {
        const response = await axios.post('/order/create', {
            customer_id: customerId,
        });
        return response;
    } catch (error) {
        console.error('Failed to create order:', error);
        throw error;
    }
};

const getOrderByCusID = async (customerId) => {
    try {
        const response = await axios.get('/order/getOrderOf', {
            params: {
                customer_id: customerId,
            },
        });
        return response;
    } catch (error) {
        console.error('Failed to get order by customer Id:', error);
        throw error;
    }
};

const getOrderByOrderID = async (order_Id) => {
    try {
        const response = await axios.put(`/order/order/getOrderById?orderId=${order_Id}`); 
        return response; 
    } catch (error) {
        console.error('Failed to get order by order_id', error);
        throw error; 
    }
};

const updateAddress = async (orderId, address) => {
    try {
        const response = await axios.put('/order/updateAddr', {
            order_id: orderId,
            address: address,
        });
        return response;
    } catch (error) {
        console.error('Failed to get order by customer Id:', error);
        throw error;
    }
};

const cancelOrder = async (order_Id) => {
    try {
        const response = await axios.put(`/order/cancel?orderId=${order_Id}`); // Truyền orderId dưới dạng query parameter
        return response; // Trả về toàn bộ response để kiểm tra sau
    } catch (error) {
        console.error('Failed to cancel order', error);
        throw error; // Ném lỗi để xử lý trong phần gọi hàm
    }
};



export {
    addOrder,
    getOrderByCusID,
    updateAddress,
    cancelOrder,
    getOrderByOrderID,
}