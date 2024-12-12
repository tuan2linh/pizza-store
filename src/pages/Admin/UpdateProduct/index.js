import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProductByID, updateProduct } from "../../../services/productService";
import { getAllMenu } from "../../../services/menuService.js";


const UpdateProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy Product_ID từ URL

    // State lưu trữ thông tin sản phẩm
    const [newProduct, setNewProduct] = useState({
        Product_Name: "",
        Menu_Name: "",
        Description: "",
        SizeWithPrice: [],
        Image: "",
    });
    const [menus, setMenus] = useState([]);
    const [sizes, setSizes] = useState([{ Size: "", Price: "" }]);
    const [sizeErrors, setSizeErrors] = useState([]);

    // Hàm xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Hàm xử lý thay đổi Size và Price
    const validateSize = (size) => {
        const validSizes = ["small", "medium", "big"];
        return validSizes.includes(size.toLowerCase());
    };

    const handleSizeChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSizes = [...sizes];
        updatedSizes[index][name] = value;

        // Validate size nếu trường bị thay đổi là "Size"
        if (name === "Size") {
            const newErrors = [...sizeErrors];
            if (!validateSize(value)) {
                newErrors[index] = "Size must be small, medium, or big";
            } else {
                newErrors[index] = "";
            }
            setSizeErrors(newErrors);
        }

        setSizes(updatedSizes);
        setNewProduct({ ...newProduct, SizeWithPrice: updatedSizes });
    };

    const addSize = () => {
        setSizes([...sizes, { Size: "", Price: "" }]);
    };

    const removeSize = (index) => {
        const updatedSizes = sizes.filter((_, i) => i !== index);
        setSizes(updatedSizes);
        setNewProduct({ ...newProduct, SizeWithPrice: updatedSizes });
    };

    // Fetch sản phẩm khi component được tải
    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const menuList = await getAllMenu();
                setMenus(menuList); // Lưu danh sách menu vào state
            } catch (error) {
                toast.error("Failed to fetch menus.");
                console.error(error);
            }
        };

        const fetchProduct = async () => {
            try {
                const product = await getProductByID(id); // Lấy dữ liệu sản phẩm từ API
                setNewProduct(product); // Điền dữ liệu vào state
                setSizes(product.SizeWithPrice || []); // Điền SizeWithPrice
            } catch (error) {
                toast.error("Failed to fetch product details.");
                console.error(error);
            }
        };
        fetchProduct();
        fetchMenus();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra thông tin đầu vào
        if (!newProduct.Product_Name || !newProduct.Menu_Name || !newProduct.Description || !newProduct.Image) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (newProduct.SizeWithPrice.length === 0 || newProduct.SizeWithPrice.some(size => !size.Size || !size.Price)) {
            toast.error("Please provide valid size and price information.");
            return;
        }

        const hasInvalidSizes = sizes.some(size => !validateSize(size.Size));
        if (hasInvalidSizes) {
            toast.error("Please use valid sizes (small, medium, or big)");
            return;
        }

        // Chuẩn bị dữ liệu để gửi
        const formData = new FormData();
        formData.append("Product_Name", newProduct.Product_Name);
        formData.append("Menu_Name", newProduct.Menu_Name);
        formData.append("Description", newProduct.Description);
        formData.append("SizeWithPrice", JSON.stringify(newProduct.SizeWithPrice));
        formData.append("Image", newProduct.Image);

        try {
            // Gửi dữ liệu cập nhật về backend
            await updateProduct(id, formData);
            toast.success("Product updated successfully!");
            navigate("/admin/products"); // Điều hướng tới danh sách sản phẩm
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while updating the product.");
        }
    };

    return (
        <section className="p-8 pt-0 relative min-h-screen bg-[#e5e7eb] from-gray-50 to-gray-100">
            <div className="flex justify-center">
                <div className="w-[90%] max-w-4xl">
                    <div className="text-center mb-8">
                        <h2 className="font-bold text-3xl text-gray-800 tracking-tight">Update Product</h2>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 bg-white p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100"
                    >
                        {/* Product Name */}
                        <div>
                            <label htmlFor="Product_Name" className="block text-gray-700 font-semibold mb-2">
                                Product Name
                            </label>
                            <input
                                name="Product_Name"
                                type="text"
                                value={newProduct.Product_Name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter product name"
                                required
                            />
                        </div>

                        {/* Menu Name */}
                        <div>
                            <label htmlFor="Menu_Name" className="block text-gray-700 font-semibold mb-2">
                                Menu Name
                            </label>
                            <select
                                name="Menu_Name"
                                value={newProduct.Menu_Name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                required
                            >
                                <option value="" disabled>
                                    Select a menu
                                </option>
                                {menus.map((menu) => (
                                    <option key={menu.Menu_ID} value={menu.Menu_Name}>
                                        {menu.Menu_Name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="Description" className="block text-gray-700 font-semibold mb-2">
                                Description
                            </label>
                            <textarea
                                name="Description"
                                value={newProduct.Description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[100px]"
                                placeholder="Enter product description"
                                required
                            />
                        </div>

                        {/* Size With Price */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-3">Sizes and Prices</label>
                            <div className="space-y-3">
                                {sizes.map((size, index) => (
                                    <div key={index} className="flex flex-col space-y-2">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-1/2">
                                                <input
                                                    name="Size"
                                                    type="text"
                                                    value={size.Size}
                                                    onChange={(e) => handleSizeChange(index, e)}
                                                    className={`w-full px-4 py-3 border ${sizeErrors[index] ? "border-red-500" : "border-gray-300"
                                                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                                    placeholder="Size (small, medium, big)"
                                                    required
                                                />
                                                {sizeErrors[index] && (
                                                    <p className="mt-1 text-sm text-red-500">{sizeErrors[index]}</p>
                                                )}
                                            </div>
                                            <input
                                                name="Price"
                                                type="number"
                                                value={size.Price}
                                                onChange={(e) => handleSizeChange(index, e)}
                                                className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                placeholder="Price"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeSize(index)}
                                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addSize}
                                    className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg transition-all duration-200"
                                >
                                    Add Size
                                </button>
                            </div>
                        </div>

                        {/* Image */}
                        <div>
                            <label htmlFor="Image" className="block text-gray-700 font-semibold mb-2">
                                Product Image URL
                            </label>
                            <input
                                name="Image"
                                type="text"
                                value={newProduct.Image} // Thay đổi ở đây
                                onChange={handleInputChange} // Cập nhật URL
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Enter image URL"
                                required
                            />
                            <div className="mt-4">
                                {newProduct.Image && ( // Hiển thị ảnh từ URL
                                    <img
                                        src={newProduct.Image}
                                        alt="Product"
                                        className="max-w-full h-40 object-contain border border-gray-300 rounded-lg"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-6">
                            <Link
                                to="/admin/products"
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
                                Back to product List
                            </Link>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                            >
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default UpdateProduct;
