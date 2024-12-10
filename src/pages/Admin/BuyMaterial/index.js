import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { buyIngre } from "../../../services/ingredientsService"; // Giả sử buyIngre là API đã được sửa
import { getSuppliers } from "../../../services/supplierService"; // Giữ nguyên để lấy nhà cung cấp

const BuyMaterial = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy ingredient_id từ URL params
    console.log(id)

    const [ingredient, setIngredient] = useState({
        ingredient_id: id, // ingredient_id lấy từ params
        quantity: "",
        expiration_date: "",
        Supplier_ID: ""
    });

    const [suppliers, setSuppliers] = useState([]); // Danh sách nhà cung cấp

    // Lấy dữ liệu nhà cung cấp khi component được mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const supplierData = await getSuppliers(); // Gọi API lấy nhà cung cấp
                setSuppliers(supplierData);
            } catch (error) {
                console.error("Failed to fetch suppliers:", error);
            }
        };

        fetchData();
    }, []);

    // Hàm xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setIngredient({ ...ingredient, [name]: value });
    };

    // Hàm xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { ingredient_id, quantity, expiration_date, Supplier_ID } = ingredient;
        if (!quantity || !expiration_date || !Supplier_ID) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            // Gửi dữ liệu mua nguyên liệu tới backend
            const formData = new FormData();
            formData.append("ingredient_id", ingredient_id);
            formData.append("quantity", quantity);
            formData.append("expiration_date", expiration_date);
            formData.append("Supplier_ID", Supplier_ID);

            await buyIngre(formData);
            toast.success("Ingredient purchased successfully!");
            navigate("/admin/materials");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while purchasing the ingredient.");
        }
    };

    return (
        <section className="min-h-screen bg-[#e5e7eb] p-8 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="font-semibold text-3xl text-gray-800">Buy Ingredient</h2>
                </div>
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Quantity */}
                            <div className="relative">
                                <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                                    Quantity
                                </label>
                                <input
                                    name="quantity"
                                    type="number"
                                    value={ingredient.quantity}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter quantity"
                                    required
                                />
                            </div>

                            {/* Expiration Date */}
                            <div className="relative">
                                <label htmlFor="expiration_date" className="block text-gray-700 font-medium mb-2">
                                    Expiration Date
                                </label>
                                <input
                                    name="expiration_date"
                                    type="date"
                                    value={ingredient.expiration_date}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    required
                                />
                            </div>

                            {/* Select Supplier */}
                            <div className="relative">
                                <label htmlFor="Supplier_ID" className="block text-gray-700 font-medium mb-2">
                                    Supplier
                                </label>
                                <select
                                    name="Supplier_ID"
                                    value={ingredient.Supplier_ID}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    required
                                >
                                    <option value="">Select a supplier</option>
                                    {suppliers.map((supplier) => (
                                        <option key={supplier.Supplier_ID} value={supplier.Supplier_ID}>
                                            {supplier.Supplier_Name}
                                        </option>
                                    ))}
                                </select>
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
                                    Back to Ingreidents List
                                </Link>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg 
                                                hover:bg-blue-700 active:bg-blue-800 
                                                transition-all duration-200 ease-in-out
                                                shadow-lg hover:shadow-xl
                                                transform hover:-translate-y-0.5"
                                >
                                    Purchase Ingredient
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BuyMaterial;
