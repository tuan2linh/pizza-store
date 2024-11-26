import React from "react";
import { useState } from "react";
import { cartItems } from "../../data/cartItems";

const Payment = () => {
    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");
    const [address, setAddress] = useState("");
    const [deliveryType, setDeliveryType] = useState("immediate"); // 'immediate' or 'scheduled'
    const [deliveryTime, setDeliveryTime] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const PromotionDiscount = 15000; // Replace with actual promotion discount
    const voucherDiscount = 0; // Replace with actual voucher discount
    const deliveryFee = 15000; // Replace with actual delivery fee
    const finalTotal = totalPrice - PromotionDiscount - voucherDiscount + deliveryFee;

    return (
        <>
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 gap-6">
                    {/* Cột trái - 3/4 */}
                    <div className="col-span-3">
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            {/* Thông tin người dùng */}
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
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Nhập tên khách hàng"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
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
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Nhập email của bạn"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Nhập số điện thoại của bạn đã đặt hàng"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
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
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Nhập địa chỉ giao hàng"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Thông tin đặt hàng */}
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h2 className="text-lg font-medium mb-4">Thông tin đặt hàng</h2>
                                <div className="mb-4">
                                    <label
                                        htmlFor="note"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Ghi chú
                                    </label>
                                    <textarea
                                        id="note"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Nhập ghi chú cho đơn hàng"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
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
                                                checked={deliveryType === "immediate"}
                                                onChange={(e) => setDeliveryType(e.target.value)}
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
                                                checked={deliveryType === "scheduled"}
                                                onChange={(e) => setDeliveryType(e.target.value)}
                                                className="mr-2"
                                            />
                                            <label htmlFor="scheduled">Đặt hàng - Hẹn giờ giao</label>
                                        </div>
                                    </div>
                                </div>

                                {deliveryType === "scheduled" && (
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
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                value={deliveryTime}
                                                onChange={(e) => setDeliveryTime(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Phương thức thanh toán */}
                        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                            {/* Phương thúc thanh toán */}
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
                        {/* Nút hoàn tất thanh toán */}
                        <div className="flex justify-center">
                            <button className="bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded">
                                HOÀN TẤT THANH TOÁN
                            </button>
                        </div>
                    </div>

                    {/* Cột phải - 1/4 */}
                    <div className="col-span-1">
                        {/* Giỏ hàng */}
                        <div className="bg-white rounded-lg shadow-md mb-5 p-4 h-full">
                            <h2 className="text-lg font-medium mb-4">Đơn hàng của bạn</h2>
                            {/* Price summary section */}
                            <div className="space-y-2 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span>Tổng</span>
                                    <span>{totalPrice.toLocaleString("vi-VN")}₫</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Giảm K.Mãi</span>
                                    <span>-{PromotionDiscount.toLocaleString("vi-VN")}₫</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Giảm Voucher</span>
                                    <span>-{voucherDiscount.toLocaleString("vi-VN")}₫</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Phí Giao Hàng</span>
                                    <span>{deliveryFee.toLocaleString("vi-VN")}₫</span>
                                </div>
                                <hr />
                                <div className="flex justify-between font-bold pt-2">
                                    <span>Tổng cộng</span>
                                    <span>{finalTotal.toLocaleString("vi-VN")}₫</span>
                                </div>
                            </div>
                            {/* Products list */}
                            <div className="space-y-4">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center mb-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover mr-4"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-lg font-medium mb-2">
                                                    {item.name}
                                                </h3>
                                                <span className="text-sm font-medium text-gray-500">
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm">
                                                {item.price.toLocaleString("vi-VN")}₫
                                            </p>
                                            <div className="text-sm text-gray-500">
                                                {item.options.join(", ")}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;
