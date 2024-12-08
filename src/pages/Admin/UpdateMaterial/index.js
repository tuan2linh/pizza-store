import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateIngre, getInpredientById } from "../../../services/ingredientsService";
import { getProduct } from "../../../services/productService";
import { getSuppliers } from "../../../services/supplierService";

const UpdateIngredients = () => {
    const { id } = useParams(); // Lấy `id` từ URL
    const navigate = useNavigate();

    // State lưu trữ thông tin mới để cập nhật
    const [ingredient, setIngredient] = useState({
        name: "",
        quantity: "",
        expiration_date: "",
        Product_ID: "",
        Supplier_ID: ""
    });

    const [products, setProducts] = useState([]); // Danh sách sản phẩm
    const [suppliers, setSuppliers] = useState([]); // Danh sách nhà cung cấp

    // Lấy dữ liệu sản phẩm, nhà cung cấp và thông tin nguyên liệu khi component được mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy thông tin nguyên liệu theo ID
                const ingredientData = await getInpredientById(id);
                setIngredient({
                    ...ingredientData,
                    expiration_date: ingredientData.expiration_date.split('T')[0], // Chuyển đổi định dạng ngày
                });
                console.log(ingredientData)

                // Lấy danh sách sản phẩm và nhà cung cấp
                const productData = await getProduct();
                const supplierData = await getSuppliers();
                setProducts(productData);
                setSuppliers(supplierData);
            } catch (error) {
                console.error("Failed to fetch ingredient, products, or suppliers:", error);
            }
        };

        fetchData();
    }, [id]);

    // Hàm xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setIngredient({ ...ingredient, [name]: value });
    };

    // Hàm xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, quantity, expiration_date, Product_ID, Supplier_ID } = ingredient;

        try {
            // Gửi dữ liệu tới backend để cập nhật nguyên liệu
            await updateIngre(id, ingredient); // Truyền `id` và dữ liệu mới vào API
            toast.success("Ingredient updated successfully!");
            navigate("/admin/materials");
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "An error occurred while updating the ingredient."
            );
        }
    };

    return (
        <section className="min-h-screen bg-[#e5e7eb] p-8 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="font-semibold text-3xl text-gray-800">Update Ingredient</h2>
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
                                    value={ingredient.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter ingredient name"
                                    required
                                />
                            </div>

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

                            {/* Select Product */}
                            <div className="relative">
                                <label htmlFor="Product_ID" className="block text-gray-700 font-medium mb-2">
                                    Product
                                </label>
                                <select
                                    name="Product_ID"
                                    value={ingredient.Product_ID}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                >
                                    <option value="">Select a product</option>
                                    {products.map((product) => (
                                        <option key={product.Product_ID} value={product.Product_ID}>
                                            {product.Product_Name}
                                        </option>
                                    ))}
                                </select>
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
                                    Update Ingredient
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpdateIngredients;
