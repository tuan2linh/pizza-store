import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addIngre } from "../../../services/ingredients";
import { FaArrowLeft, FaBox, FaCalendarAlt, FaFlask } from "react-icons/fa";

const AddProduct = () => {
    const navigate = useNavigate();

    // State lưu trữ thông tin nguyên liệu
    const [newIngredient, setNewIngredient] = useState({
        name: "",
        quantity: "",
        expiration_date: "",
    });

    // Hàm xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewIngredient({ ...newIngredient, [name]: value });
    };

    // Hàm xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, quantity, expiration_date } = newIngredient;
        if (!name || !quantity || !expiration_date) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            // Gửi dữ liệu tới backend
            await addIngre(newIngredient);
            toast.success("Ingredient added successfully!");
            navigate("/admin/materials");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while adding the ingredient.");
        }
    };

    return (
        <section className="min-h-screen bg-[#e5e7eb] p-8 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="font-semibold text-3xl text-gray-800">Add New Ingredient</h2>
                </div>
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div className="relative">
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                    Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaBox className="text-gray-400" />
                                    </div>
                                    <input
                                        name="name"
                                        type="text"
                                        value={newIngredient.name}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Enter ingredient name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="relative">
                                <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                                    Quantity
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaFlask className="text-gray-400" />
                                    </div>
                                    <input
                                        name="quantity"
                                        type="number"
                                        value={newIngredient.quantity}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Enter quantity"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Expiration Date */}
                            <div className="relative">
                                <label htmlFor="expiration_date" className="block text-gray-700 font-medium mb-2">
                                    Expiration Date
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCalendarAlt className="text-gray-400" />
                                    </div>
                                    <input
                                        name="expiration_date"
                                        type="date"
                                        value={newIngredient.expiration_date}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between items-center pt-4">
                                <Link 
                                    to="/admin/materials" 
                                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all"
                                >
                                    <FaArrowLeft />
                                    Back to ingredient list
                                </Link>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg 
                                             hover:bg-blue-700 active:bg-blue-800 
                                             transition-all duration-200 ease-in-out
                                             shadow-lg hover:shadow-xl
                                             transform hover:-translate-y-0.5"
                                >
                                    Add Ingredient
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddProduct;
