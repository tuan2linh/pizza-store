import { React, useEffect, useState } from 'react';
import { getOrderByCusID, cancelOrder } from '../../services/orderService';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";


const Promotion = () => {
    const account = useSelector((state) => state.user.account);
    const customer_id = account?.customer_id;
    const [orderByCusId, setOrderByCusId] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrders, setExpandedOrders] = useState({});
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' = newest first
    const orderStatuses = ['Pending', 'In Progress', 'Delivered'];
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
                // Fix: Pass customer_id to refresh orders
                await fetchOrderById(customer_id);
            }
        } catch (error) {
            toast.error('Failed to cancel order:', error);
        }
    };

    const calculateOrderTotal = (items) => {
        return items.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
    };

    const toggleOrderExpand = (orderId) => {
        setExpandedOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }));
    };

    const getSortedOrders = () => {
        if (!Array.isArray(orderByCusId)) {
            return [];
        }
        return [...orderByCusId].sort((a, b) => {
            const dateA = new Date(a.order_date);
            const dateB = new Date(b.order_date);
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });
    };

    const getStatusStep = (currentStatus) => {
        if (currentStatus === 'Cancelled') return -1;
        return orderStatuses.indexOf(currentStatus);
    };

    const statusIcons = {
        'Pending': (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        'In Progress': (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        'Delivered': (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        )
    };

    return (
        <div className="promotion-container max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Lịch Sử Đơn Hàng</h1>
                <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">Sắp xếp:</label>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="border rounded-md px-3 py-1.5 text-sm bg-white text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="desc">Mới nhất trước</option>
                        <option value="asc">Cũ nhất trước</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2].map((n) => (
                        <div key={n} className="animate-pulse bg-gray-100 p-6 rounded-lg">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            ) : orderByCusId.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-600">Chưa có đơn hàng nào</h3>
                    <p className="text-gray-500 mt-2">Hãy đặt pizza ngay!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {getSortedOrders().map((order, index) => (
                        <div key={order.order_id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {/* Order Header */}
                            <div className="bg-gray-50 p-4 border-b">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold">Đơn hàng #{order.order_id}</h3>
                                        <p className="text-sm text-gray-600">{formatDate(order.order_date)}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`${getStatusColor(order.status)} px-3 py-1 rounded-full text-sm font-medium`}>
                                            {getStatusLetter(order.status)}
                                        </span>
                                        {order.status === 'Pending' && (
                                            <button
                                                onClick={() => handleCancelClick(order.order_id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                            >
                                                Hủy đơn
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Status Progress Bar */}
                                {order.status !== 'Cancelled' && (
                                    <div className="mt-6 px-2">
                                        <div className="flex justify-between relative">
                                            {/* Progress Line */}
                                            <div className="absolute top-5 left-0 h-0.5 bg-gray-200 w-full -z-1"></div>
                                            <div 
                                                className="absolute top-5 left-0 h-0.5 bg-green-500 transition-all duration-500"
                                                style={{
                                                    width: `${(getStatusStep(order.status) / (orderStatuses.length - 1)) * 100}%`
                                                }}
                                            ></div>

                                            {orderStatuses.map((status, idx) => (
                                                <div 
                                                    key={status}
                                                    className="flex flex-col items-center relative z-10"
                                                >
                                                    <div className={`
                                                        w-10 h-10 rounded-full flex items-center justify-center
                                                        transform transition-all duration-500
                                                        ${getStatusStep(order.status) >= idx 
                                                            ? 'bg-green-500 text-white scale-110' 
                                                            : 'bg-gray-100 text-gray-400'
                                                        }
                                                        ${getStatusStep(order.status) === idx 
                                                            ? 'ring-4 ring-green-100' 
                                                            : ''
                                                        }
                                                    `}>
                                                        {statusIcons[status]}
                                                    </div>
                                                    <div className="mt-2 flex flex-col items-center">
                                                        <span className={`
                                                            text-sm font-medium mb-1
                                                            ${getStatusStep(order.status) >= idx 
                                                                ? 'text-green-600' 
                                                                : 'text-gray-500'
                                                            }
                                                        `}>
                                                            {status}
                                                        </span>
                                                        {getStatusStep(order.status) === idx && (
                                                            <span className="text-xs text-gray-400 animate-pulse">
                                                                Hiện tại
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {order.status === 'Cancelled' && (
                                    <div className="mt-4 bg-red-50 border border-red-100 p-4 rounded-lg">
                                        <div className="flex items-center justify-center gap-2 text-red-600">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            <p className="font-medium">Đơn hàng đã bị hủy</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Order Content */}
                            <div className="p-4">
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span className="font-medium">Địa chỉ giao hàng:</span>
                                        <span>{order.address || "Chưa có"}</span>
                                    </div>
                                </div>

                                {/* Collapsible Header */}
                                <div 
                                    onClick={() => toggleOrderExpand(order.order_id)}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{order.items.length} sản phẩm</span>
                                        <span className="text-sm text-gray-500">
                                            (Click để {expandedOrders[order.order_id] ? 'thu gọn' : 'xem chi tiết'})
                                        </span>
                                    </div>
                                    <svg 
                                        className={`w-5 h-5 transition-transform duration-200 ${
                                            expandedOrders[order.order_id] ? 'rotate-180' : ''
                                        }`}
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {/* Collapsible Content */}
                                <div className={`transition-all duration-300 overflow-hidden ${
                                    expandedOrders[order.order_id] 
                                        ? 'max-h-[1000px] opacity-100 mt-4' 
                                        : 'max-h-0 opacity-0'
                                }`}>
                                    <div className="space-y-4">
                                        {order.items.map((item, idx) => (
                                            <div key={`${item.product_id}-${idx}`} 
                                                 className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                                <img
                                                    src="https://img.dominos.vn/cheeseburger-sup.jpg"
                                                    alt={item.Product_Name}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-lg">{item.Product_Name}</h4>
                                                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                                                        <div>
                                                            <p>Size: <span className="font-medium">{item.size}</span></p>
                                                            <p>Số lượng: <span className="font-medium">{item.quantity}</span></p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p>Đơn giá: {parseInt(item.price_per_item).toLocaleString()}đ</p>
                                                            <p className="font-bold text-base">
                                                                {parseInt(item.total_price).toLocaleString()}đ
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="mt-4 pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-lg">Tổng cộng:</span>
                                        <span className="text-xl font-bold text-red-600">
                                            {calculateOrderTotal(order.items).toLocaleString()}đ
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Promotion;
