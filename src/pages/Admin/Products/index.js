import { useEffect, useState } from "react";
import { getProduct, deleteProduct } from "../../../services/productService";
import { Link, NavLink } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ModalConfirm from "../../../components/ModalConfirm/ModalConfirm.jsx";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // Fetch products from the backend
    const fetchProduct = async () => {
        try {
            const result = await getProduct();
            setProducts(result);
            console.log(result);
        } catch (error) {
            console.error("Failed to get list product:", error);
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleDeleteReview = (id) => {
        setProductToDelete(id);
        setModalOpen(true);
    };

    const handleDelete = async () => {
        if (!productToDelete) return;

        try {
            const result = await deleteProduct(productToDelete);
            if (result.message === "Food removed successfully") {
                await fetchProduct();
                toast.success(`Product was deleted`);
            } else {
                toast.error(`Error deleting product: ${productToDelete}`);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setModalOpen(false); // Close the modal after action
        }
    };

    return (
        <>
            <div className="relative overflow-x-auto rounded-lg">
                <div className="flex justify-end mb-4">
                    <Link
                        to="/admin/addproduct"
                        className="bg-gray-500 hover:opacity-60 transition-all text-black font-medium text-[17px] py-2 px-4 rounded-lg"
                    >
                        Add new product
                    </Link>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Menu</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Size & Price</th>
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr
                                    key={product.Product_ID}
                                    className="bg-white border-b hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">{product.Product_ID}</td>
                                    <td className="px-6 py-4">{product.Product_Name}</td>
                                    <td className="px-6 py-4">{product.Menu_Name}</td>
                                    <td className="px-6 py-4">
                                        {product.Description.length > 30
                                            ? product.Description.slice(0, 30) + "..."
                                            : product.Description}
                                    </td>

                                    {/* Hiển thị SizeWithPrice theo kiểu đối xứng */}
                                    <td className="px-6 py-4">
                                        {product.SizeWithPrice && product.SizeWithPrice.length > 0 ? (
                                            <div className="flex">
                                                <div className="flex-1 ">
                                                    {/* Hiển thị các Size */}
                                                    {product.SizeWithPrice.map((item, idx) => (
                                                        <div key={idx} className="text-left">
                                                            {item.Size}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex-1">
                                                    {/* Hiển thị các Price tương ứng */}
                                                    {product.SizeWithPrice.map((item, idx) => (
                                                        <div key={idx} className="text-left">
                                                            {item.Price}đ
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <span>Not available</span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        <img
                                            className="w-20 h-20"
                                            src={product.Image}
                                            alt={product.Product_Name}
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center gap-3">
                                            <button
                                                className="font-medium text-red-500"
                                                onClick={() => handleDeleteReview(product.Product_ID)}
                                            >
                                                <FaTrash size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    No products available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ModalConfirm
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Confirm delete?"
                message="Are you sure you want to delete this product?"
                onConfirm={handleDelete}
            />
        </>
    );
};

export default Products;
