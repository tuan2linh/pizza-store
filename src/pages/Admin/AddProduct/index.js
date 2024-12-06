import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct } from "../../../services/productService";

const AddProduct = () => {
    const navigate = useNavigate();

    // State lưu trữ thông tin sản phẩm
    const [newProduct, setNewProduct] = useState({
        Product_Name: "",
        Menu_Name: "",
        Description: "",
        SizeWithPrice: [],  // Mảng Size với giá
        Image: "",  
    });

    const [sizes, setSizes] = useState([{ Size: "", Price: "" }]);

    // Hàm xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Hàm xử lý thay đổi Size và Price
    const handleSizeChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSizes = [...sizes];
        updatedSizes[index][name] = value;
        setSizes(updatedSizes);
        setNewProduct({ ...newProduct, SizeWithPrice: updatedSizes });
    };

    // Hàm thêm Size  
    const addSize = () => {
        setSizes([...sizes, { Size: "", Price: "" }]);
    };

    // Hàm xóa Size
    const removeSize = (index) => {
        const updatedSizes = sizes.filter((_, i) => i !== index);
        setSizes(updatedSizes);
        setNewProduct({ ...newProduct, SizeWithPrice: updatedSizes });
    };

    // Hàm xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Kiểm tra dữ liệu trước khi gửi
        if (!newProduct.Product_Name || !newProduct.Menu_Name || !newProduct.Description || !newProduct.Image) {
            toast.error("Please fill in all required fields.");
            return;
        }
    
        // Kiểm tra Size và Price
        if (newProduct.SizeWithPrice.length === 0 || newProduct.SizeWithPrice.some(size => !size.Size || !size.Price)) {
            toast.error("Please provide valid size and price information.");
            return;
        }
    
        // Tạo FormData để gửi dữ liệu
        const formData = new FormData();
        formData.append("Product_Name", newProduct.Product_Name);
        formData.append("Menu_Name", newProduct.Menu_Name);
        formData.append("Description", newProduct.Description);
        formData.append("SizeWithPrice", JSON.stringify(newProduct.SizeWithPrice)); // Gửi mảng SizeWithPrice dưới dạng chuỗi JSON
        formData.append("Image", newProduct.Image); // Gửi ảnh
    
        try {
            // Gửi dữ liệu tới BE
            await addProduct(formData);
            console.log(newProduct);
            console.log(formData);
            toast.success("Product added successfully!");
            navigate("/admin/products"); // Điều hướng tới danh sách sản phẩm
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while adding the product.");
        }
    };
    

    return (
        <section className="p-8 relative">
            <div>
                <h2 className="font-medium text-3xl">Add New Product</h2>
            </div>
            <hr className="my-5" />
            <div className="flex justify-center">
                <div className="w-[80%] shadow-lg border-2 border-gray-200 rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg">
                        {/* Product Name */}
                        <div>
                            <label htmlFor="Product_Name" className="block text-gray-700 font-medium">
                                Product Name
                            </label>
                            <input
                                name="Product_Name"
                                type="text"
                                value={newProduct.Product_Name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter product name"
                                required
                            />
                        </div>

                        {/* Menu Name */}
                        <div>
                            <label htmlFor="Menu_Name" className="block text-gray-700 font-medium">
                                Menu Name
                            </label>
                            <input
                                name="Menu_Name"
                                type="text"
                                value={newProduct.Menu_Name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter menu name"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="Description" className="block text-gray-700 font-medium">
                                Description
                            </label>
                            <textarea
                                name="Description"
                                value={newProduct.Description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter product description"
                                required
                            />
                        </div>

                        {/* Size With Price */}
                        <div>
                            <label className="block text-gray-700 font-medium">Sizes and Prices</label>
                            {sizes.map((size, index) => (
                                <div key={index} className="flex space-x-4 mb-2">
                                    <input
                                        name="Size"
                                        type="text"
                                        value={size.Size}
                                        onChange={(e) => handleSizeChange(index, e)}
                                        className="w-1/2 px-4 py-2 border rounded-lg"
                                        placeholder="Size"
                                        required
                                    />
                                    <input
                                        name="Price"
                                        type="number"
                                        value={size.Price}
                                        onChange={(e) => handleSizeChange(index, e)}
                                        className="w-1/2 px-4 py-2 border rounded-lg"
                                        placeholder="Price"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSize(index)}
                                        className="text-red-500 font-bold"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addSize}
                                className="text-blue-500 font-bold"
                            >
                                Add Size
                            </button>
                        </div>

                        {/* Image URL input */}
                        <div>
                            <label htmlFor="Image" className="block text-gray-700 font-medium">
                                Image URL
                            </label>
                            <input
                                id="Image"
                                type="text"
                                name="Image"
                                value={newProduct.Image}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter image URL"
                                required
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between items-center">
                            <Link to="/admin/products" className="text-accent hover:underline transition-all">
                                Back to product list
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
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddProduct;
