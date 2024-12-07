import React, { useState, useEffect } from "react";
import { getCart } from "../../services/apiService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addOrder, updateAddress } from '../../services/orderService'
import { getCartId, applyVoucherToCart, removeVoucherFromCart } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const { account, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    
    // Group related states
    const [orderData, setOrderData] = useState({
        customerName: "", email: "", phone: "", note: "",
        address: "", deliveryType: "immediate", 
        deliveryTime: "", deliveryDate: "", orderId: null
    });
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [voucher, setVoucher] = useState("");
    const [cartId, setCartId] = useState(null);
    const [voucherDiscount, setVoucherDiscount] = useState(0);

    useEffect(() => {
        fetchCart();
    }, []);
    const fetchCart = async () => {
        setIsLoading(true);
        try {
            const response = await getCart();
            setCart(response);
            const cartID_res = await getCartId();
            setCartId(cartID_res.cart_id);
        } catch (error) {
            console.error('Fetch cart error:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData(prev => ({...prev, [name]: value}));
    };

    const createOrder = async () => {
        try {
            const result = await addOrder(account?.customer_id);
            setOrderData(prev => ({...prev, orderId: result.order_id}));
            await handleAddress(result.order_id, orderData.address);
        } catch (error) {
            toast.error('Tạo đơn hàng thất bại!');
        }
    };
    const handleAddress = async (orderId, address) => {
        try {
            if (!orderId) {
                toast.error('Không tìm thấy ID đơn hàng!');
                return;
            }
            await updateAddress(orderId, address)
            toast.success('Đặt hàng thành công!');
            navigate('/orders');
        } catch (error) {
            console.error('Failed to update address:', error);
            toast.error('Cập nhật địa chỉ thất bại!');
        }
    };

    const handleApplyVoucher = async () => {
        if (!voucher) {
            toast.error('Vui lòng nhập mã giảm giá!');
            return;
        }
        
        // Check if a voucher is already applied
        if (cart.voucher?.Voucher_Code) {
            toast.error('Vui lòng gỡ mã giảm giá hiện tại trước khi thêm mã mới!');
            return;
        }
    
        try {
            const data = { cartId, voucherCode: voucher };
            const response = await applyVoucherToCart(data);
            if (response.message === 'Voucher applied successfully!') {
                toast.success('Áp dụng mã giảm giá thành công!');
                fetchCart(); // Refresh cart data
                setVoucher(""); // Clear voucher input
            } else {
                toast.error(response?.error || 'Áp dụng mã giảm giá thất bại!');
            }
        } catch (error) {
            toast.error('Mã giảm giá không hợp lệ!');
        }
    };

    const handleRemoveVoucher = async () => {
        try {
            const response = await removeVoucherFromCart(cartId);
            if (response.message === 'Voucher revoked successfully!') {
                toast.success('Đã gỡ mã giảm giá!');
                await fetchCart(); // Refresh cart data
            } else {
                toast.error('Gỡ mã giảm giá thất bại!');
            }
        } catch (error) {
            toast.error('Không thể gỡ mã giảm giá!');
        }
    };

    // Add this function before calculations
    const calculateVoucherDiscount = (totalPrice, voucher) => {
        if (!voucher?.Voucher_Code) return 0;
        
        if (voucher.Discount_Type === 'Percent') {
            return totalPrice * parseFloat(voucher.Discount_Value) / 100;
        }
        return parseFloat(voucher.Discount_Value);
    };

    // Update calculations object
    const calculations = {
        totalPrice: parseFloat(cart.subTotal || 0),
        promotionDiscount: parseFloat(cart.loyaltyDiscount || 0),
        voucherDiscount: calculateVoucherDiscount(parseFloat(cart.subTotal || 0), cart.voucher),
        deliveryFee: 0
    };

    const finalTotal = calculations.totalPrice - calculations.promotionDiscount 
                      - calculations.voucherDiscount + calculations.deliveryFee;

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 gap-6">
                <div className="col-span-3">
                    {/* User Info Form */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-lg font-medium mb-4">
                                Thông tin người dùng
                            </h2>
                            <div className="mb-4">
                                <label
                                    htmlFor="customerName"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Tên khách hàng
                                </label>
                                <input
                                    type="text"
                                    id="customerName"
                                    name="customerName"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Nhập tên khách hàng"
                                    value={orderData.customerName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Nhập email của bạn"
                                    value={orderData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="phone"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Nhập số điện thoại của bạn đã đặt hàng"
                                    value={orderData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="address"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Địa chỉ
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Nhập địa chỉ giao hàng"
                                    value={orderData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-lg font-medium mb-4">Thông tin đặt hàng</h2>
                            <div className="mb-4">
                                <div className="flex">
                                    <input
                                        type="text"
                                        id="voucher"
                                        name="voucher"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Nhập mã giảm giá"
                                        value={voucher}
                                        onChange={(e) => setVoucher(e.target.value)}
                                    />
                                    <button
                                        onClick={handleApplyVoucher}
                                        className="bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded ml-2"
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <textarea
                                    id="note"
                                    name="note"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Nhập ghi chú cho đơn hàng"
                                    value={orderData.note}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="immediate"
                                            name="deliveryType"
                                            value="immediate"
                                            checked={orderData.deliveryType === "immediate"}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="immediate">
                                            Đặt hàng - Giao hàng ngay
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="scheduled"
                                            name="deliveryType"
                                            value="scheduled"
                                            checked={orderData.deliveryType === "scheduled"}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="scheduled">Đặt hàng - Hẹn giờ giao</label>
                                    </div>
                                </div>
                            </div>

                            {orderData.deliveryType === "scheduled" && (
                                <div className="space-y-4">
                                    <div className="mb-4">
                                        <label
                                            htmlFor="deliveryTime"
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                            Chọn giờ giao
                                        </label>
                                        <input
                                            type="time"
                                            id="deliveryTime"
                                            name="deliveryTime"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={orderData.deliveryTime}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <h2 className="text-lg font-medium mb-4">
                            Phương thức thanh toán
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center p-3 ml-12 mr-8 border-b hover:border-orange-300 cursor-pointer">
                                <input
                                    type="radio"
                                    id="atm"
                                    name="paymentMethod"
                                    className="mr-3"
                                />
                                <img
                                    src="https://img.dominos.vn/icon-payment-method-atm.png"
                                    alt="ATM"
                                    className="w-8 h-8 mr-2"
                                />
                                <label htmlFor="atm">ATM</label>
                            </div>
                            <div className="flex items-center p-3 ml-12 mr-8 border-b hover:border-orange-300 cursor-pointer">
                                <input
                                    type="radio"
                                    id="creditCard"
                                    name="paymentMethod"
                                    className="mr-3"
                                />
                                <img
                                    src="https://img.dominos.vn/icon-payment-method-credit.png"
                                    alt="Credit Card"
                                    className="w-8 h-8 mr-2"
                                />
                                <label htmlFor="creditCard">Thẻ tín dụng / ghi nợ</label>
                            </div>
                            <div className="flex items-center p-3 ml-12 mr-8 border-b hover:border-orange-300 cursor-pointer">
                                <input
                                    type="radio"
                                    id="viMomo"
                                    name="paymentMethod"
                                    className="mr-3"
                                />
                                <img
                                    src="https://img.dominos.vn/icon-payment-method-mo-mo.png"
                                    alt="MoMo"
                                    className="w-8 h-8 mr-2"
                                />
                                <label htmlFor="viMomo">Ví MoMo</label>
                            </div>
                            <div className="flex items-center p-3 ml-12 mr-8 border-b hover:border-orange-300 cursor-pointer">
                                <input
                                    type="radio"
                                    id="viZaloPay"
                                    name="paymentMethod"
                                    className="mr-3"
                                />
                                <img
                                    src="https://img.dominos.vn/icon-payment-method-zalo-pay.png"
                                    alt="ZaloPay"
                                    className="w-8 h-8 mr-2"
                                />
                                <label htmlFor="viZaloPay">Ví ZaloPay</label>
                            </div>
                            <div className="flex items-center p-3 ml-12 mr-8 border-b hover:border-orange-300 cursor-pointer">
                                <input
                                    type="radio"
                                    id="viShopeePay"
                                    name="paymentMethod"
                                    className="mr-3"
                                />
                                <img
                                    src="https://img.dominos.vn/shoppepay.png"
                                    alt="ShopeePay"
                                    className="w-8 h-8 mr-2"
                                />
                                <label htmlFor="viShopeePay">Ví ShopeePay</label>
                            </div>
                            <div className="flex items-center p-3 ml-12 mr-8 border-b hover:border-orange-300 cursor-pointer">
                                <input
                                    type="radio"
                                    id="cash"
                                    name="paymentMethod"
                                    className="mr-3"
                                />
                                <img
                                    src="https://img.dominos.vn/cash.png"
                                    alt="Cash"
                                    className="w-8 h-8 mr-2"
                                />
                                <label htmlFor="cash">Tiền mặt</label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            className="bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
                            onClick={createOrder}
                        >
                            HOÀN TẤT THANH TOÁN
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="col-span-1">
                    <div className="bg-white rounded-lg shadow-md mb-5 p-4 h-full">
                        <h2 className="text-lg font-medium mb-4">Đơn hàng của bạn</h2>
                        <div className="space-y-2 mb-8">
                            <div className="flex justify-between text-sm">
                                <span>Tổng</span>
                                <span>{calculations.totalPrice.toLocaleString("vi-VN")}₫</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Giảm K.Mãi</span>
                                <span>-{calculations.promotionDiscount.toLocaleString("vi-VN")}₫</span>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span className="flex items-center">
                                    Giảm Voucher {cart.voucher?.Voucher_Code && (
                                        <>
                                            {`(${cart.voucher.Voucher_Code} - ${
                                                cart.voucher.Discount_Type === 'Percent' ? 
                                                cart.voucher.Discount_Value + '%' : 
                                                parseInt(cart.voucher.Discount_Value).toLocaleString("vi-VN") + '₫'
                                            })`}
                                            <button
                                                onClick={handleRemoveVoucher}
                                                className="ml-2 text-red-500 hover:text-red-700"
                                            >
                                                ⨉
                                            </button>
                                        </>
                                    )}
                                </span>
                                <span>-{calculations.voucherDiscount.toLocaleString("vi-VN")}₫</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span>Phí Giao Hàng</span>
                                <span>{calculations.deliveryFee.toLocaleString("vi-VN")}₫</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold pt-2">
                                <span>Tổng cộng</span>
                                <span>{finalTotal.toLocaleString("vi-VN")}₫</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {isLoading ? (
                                <div>Loading...</div>
                            ) : cart.items?.map((item) => (
                                <div key={item.cart_item_id} className="flex items-center mb-4">
                                    <img
                                        src="https://img.jakpost.net/c/2016/09/29/2016_09_29_12990_1475116504._large.jpg"
                                        alt={item.Product_Name}
                                        className="w-20 h-20 object-cover mr-4"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-medium mb-2">
                                                {item.Product_Name}
                                            </h3>
                                            <span className="text-sm font-medium text-gray-500">
                                                x{item.quantity}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            {parseFloat(item.price_per_item).toLocaleString("vi-VN")}₫
                                        </p>
                                        <div className="text-sm text-gray-500">
                                            Size: {item.size}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
