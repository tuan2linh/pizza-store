import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addSupplier } from "../../../services/supplier";

const AddSupplier = () => {
    const navigate = useNavigate();

    // State lưu trữ thông tin nhà cung cấp
    const [newSupplier, setNewSupplier] = useState({
        Supplier_Name: "",
        PhoneNumber: "",
        Email: "",
        Supplier_Address: "",
        Rating: "",
    });

    // Hàm xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier({ ...newSupplier, [name]: value });
    };

    // Hàm xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { Supplier_Name, PhoneNumber, Email, Supplier_Address, Rating } = newSupplier;
        if (!Supplier_Name || !PhoneNumber || !Email || !Supplier_Address || !Rating) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            // Gửi dữ liệu tới backend
            await addSupplier(newSupplier);
            toast.success("Supplier added successfully!");
            navigate("/admin/suppliers");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while adding the supplier.");
        }
    };

    return (
        <section className="min-h-screen  bg-[#e5e7eb] p-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-bold text-3xl text-gray-800 mb-6">Add New Supplier</h2>
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Supplier Name */}
                                <div>
                                    <label htmlFor="Supplier_Name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Supplier Name
                                    </label>
                                    <input
                                        name="Supplier_Name"
                                        type="text"
                                        value={newSupplier.Supplier_Name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Enter supplier name"
                                        required
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label htmlFor="PhoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        name="PhoneNumber"
                                        type="text"
                                        value={newSupplier.PhoneNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="Email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        name="Email"
                                        type="email"
                                        value={newSupplier.Email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>

                                {/* Rating */}
                                <div>
                                    <label htmlFor="Rating" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Rating
                                    </label>
                                    <input
                                        name="Rating"
                                        type="number"
                                        value={newSupplier.Rating}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Enter rating (1-5)"
                                        required
                                        min="1"
                                        max="5"
                                    />
                                </div>
                            </div>

                            {/* Supplier Address - Full Width */}
                            <div>
                                <label htmlFor="Supplier_Address" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Supplier Address
                                </label>
                                <input
                                    name="Supplier_Address"
                                    type="text"
                                    value={newSupplier.Supplier_Address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter supplier address"
                                    required
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end items-center space-x-4 pt-4">
                                <Link
                                    to="/admin/suppliers"
                                    className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-all"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all focus:ring-4 focus:ring-blue-300"
                                >
                                    Add Supplier
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddSupplier;
