import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addIngre } from "../../../services/ingredientsService";

const AddMaterial = () => {
    const navigate = useNavigate();

    // State chỉ lưu trữ tên nguyên liệu
    const [newIngredient, setNewIngredient] = useState({
        name: "",
    });

    // Hàm xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewIngredient({ ...newIngredient, [name]: value });
    };

    // Hàm xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name } = newIngredient;
        if (!name) {
            toast.error("Please enter the ingredient name.");
            return;
        }

        try {
            // Gửi dữ liệu chỉ chứa trường name tới backend
            await addIngre({ name });
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
                                <input
                                    name="name"
                                    type="text"
                                    value={newIngredient.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter ingredient name"
                                    required
                                />
                            </div>

                            <div className="flex justify-between items-center pt-6">
                                <Link
                                    to="/admin/materials"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 
                                                bg-white border border-blue-600 rounded-lg shadow-md 
                                                hover:bg-blue-600 hover:text-white hover:shadow-lg
                                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                                                transition-all duration-200"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />
                                    </svg>
                                    Back to Ingredients List
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

export default AddMaterial;
