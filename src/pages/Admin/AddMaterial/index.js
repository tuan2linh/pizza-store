import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addIngre } from "../../../services/ingredients";

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
        <section className="p-8 relative">
            <div>
                <h2 className="font-medium text-3xl">Add New Ingredient</h2>
            </div>
            <hr className="my-5" />
            <div className="flex justify-center">
                <div className="w-[80%] shadow-lg border-2 border-gray-200 rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium">
                                Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                value={newIngredient.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter ingredient name"
                                required
                            />
                        </div>

                        {/* Quantity */}
                        <div>
                            <label htmlFor="quantity" className="block text-gray-700 font-medium">
                                Quantity
                            </label>
                            <input
                                name="quantity"
                                type="number"
                                value={newIngredient.quantity}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter quantity"
                                required
                            />
                        </div>

                        {/* Expiration Date */}
                        <div>
                            <label htmlFor="expiration_date" className="block text-gray-700 font-medium">
                                Expiration Date
                            </label>
                            <input
                                name="expiration_date"
                                type="date"
                                value={newIngredient.expiration_date}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between items-center">
                            <Link to="/admin/products" className="text-accent hover:underline transition-all">
                                Back to ingredient list
                            </Link>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: "#3498db",
                                    color: "#fff",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                                className="hover:opacity-60 transition-all"
                            >
                                Add Ingredient
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddProduct;
