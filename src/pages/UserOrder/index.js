import { React, useEffect, useState } from 'react';
import { getOrderByCusID, cancelOrder } from '../../services/orderService';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";


const Promotion = () => {
    const account = useSelector((state) => state.user.account);
    const customer_id = account?.customer_id;
    const [orderByCusId, setOrderByCusId] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(customer_id)

    const fetchOrderById = async (customer_id) => {
        try {
            const result = await getOrderByCusID(customer_id);
            console.log(result)
            setOrderByCusId(result || []);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch order:', error);
            setLoading(false);
            setOrderByCusId([]);
        }
    };

    useEffect(() => {
        fetchOrderById(customer_id);
    }, [customer_id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-200 text-yellow-800';
            case 'Cancelled':
                return 'bg-red-200 text-red-800';
            case 'In Progress':
                return 'bg-blue-200 text-blue-800';
            case 'Delivered':
                return 'bg-green-200 text-green-800';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };

    const getStatusLetter = (status) => {
        switch (status) {
            case 'Pending':
                return 'Pending';
            case 'Cancelled':
                return 'Cancelled';
            case 'In Progress':
                return 'In Progress';
            case 'Delivered':
                return 'Delivered';
            default:
                return '-';
        }
    };

    const handleCancelClick = async (orderId) => {
        if (!orderId) {
            toast.error('Order ID is invalid or undefined');
            return; // Dừng hàm nếu orderId không hợp lệ
        }
    
        try {
            // Cập nhật gọi API cancelOrder với query parameter
            const response = await cancelOrder(orderId);
            if (response.message === "Order cancelled successfully") {
                toast.success('Hủy đơn hàng thành công!');
                fetchOrderById(); // Cập nhật lại danh sách đơn hàng
            }
        } catch (error) {
            toast.error('Failed to cancel order:', error);
        }
    };

    return (
        <div className="promotion-container">
            <h1 className="text-2xl font-bold mb-4">Các Đơn Hàng Của Bạn</h1>
            {loading ? (
                <p>Loading...</p>
            ) : orderByCusId.length === 0 ? (
                <p>Không có đơn hàng nào.</p>
            ) : (
                <div>
                    {orderByCusId.map((order, index) => (
                        <div
                            key={order.order_id}
                            className="order-item mb-6 p-4 border rounded-lg shadow-md flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-xl font-semibold">Đơn hàng #{index+1}</h3>
                                <span className="text-sm text-gray-500">{formatDate(order.order_date)}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <div className="order-status p-1 rounded-md inline-block">
                                    <span className={`inline-block ${getStatusColor(order.status)} px-2 py-1 rounded-full`}>
                                        {getStatusLetter(order.status)}
                                    </span>
                                </div>
                                {order.status === 'Pending' && (
                                    <button
                                        onClick={() => handleCancelClick(order.order_id)}
                                        className="cancel-button bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                            <div className="order-address mt-4">
                                {order.address ? (
                                    <div><strong>Địa chỉ:</strong> {order.address}</div>
                                ) : (
                                    <div><strong>Địa chỉ:</strong> Chưa có</div>
                                )}
                            </div>
                            <div className="order-items mt-4">
                                {order.items.map((item) => (
                                    <div
                                        key={item.product_id}
                                        className="order-item-detail flex items-center mb-4 p-2 border-b"
                                    >
                                        <img
                                            src="https://img.dominos.vn/cheeseburger-sup.jpg"
                                            alt={item.Product_Name}
                                            className="w-16 h-16 object-cover rounded-lg mr-4"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{item.Product_Name}</h4>
                                            <p className="text-sm text-gray-600">Size: {item.size}</p>
                                            <div className="flex justify-between">
                                                <span>Số lượng: {item.quantity}</span>
                                                <span className="font-bold">
                                                    {parseFloat(item.total_price).toLocaleString()}đ
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Promotion;
