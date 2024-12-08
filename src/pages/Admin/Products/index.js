import { useEffect, useState } from "react";
import { getProduct, deleteProduct } from "../../../services/productService";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ModalConfirm from "../../../components/ModalConfirm/ModalConfirm.jsx";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMenu, setSelectedMenu] = useState("all");
    const productsPerPage = 6;

    const menuOptions = ["all", "pizza", "chicken", "pasta", "appetizers", "desserts", "drinks"];

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

    // Filter products based on search term and selected menu
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.Product_Name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMenu = selectedMenu === "all" || product.Menu_Name.toLowerCase() === selectedMenu.toLowerCase();
        return matchesSearch && matchesMenu;
    });

    // Get current products for pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="p-6 bg-white rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Products Management</h1>
                    <Link
                        to="/admin/addproduct"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-[15px] py-2.5 px-5 rounded-lg transition duration-300 flex items-center gap-2"
                    >
                        <span className="material-icons text-xl">Add New Product</span>
                    </Link>
                </div>

                {/* Search and Filter Controls */}
                <div className="mb-6 flex gap-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="px-4 py-2 border rounded-lg w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        value={selectedMenu}
                        onChange={(e) => setSelectedMenu(e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                    >
                        {menuOptions.map((menu) => (
                            <option key={menu} value={menu}>
                                {menu.charAt(0).toUpperCase() + menu.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Menu</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4">Size & Price</th>
                                <th className="px-6 py-4">Image</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product, index) => (
                                    <tr
                                        key={product.Product_ID}
                                        className="bg-white border-b hover:bg-gray-50 transition duration-200"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">{product.Product_ID}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{product.Product_Name}</td>
                                        <td className="px-6 py-4">{product.Menu_Name}</td>
                                        <td className="px-6 py-4 max-w-xs">
                                            <div
                                                className="cursor-help hover:text-gray-900 transition-colors"
                                                title={product.Description}
                                            >
                                                {product.Description.length > 30
                                                    ? product.Description.slice(0, 30) + "..."
                                                    : product.Description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.SizeWithPrice && product.SizeWithPrice.length > 0 ? (
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="space-y-1">
                                                        {product.SizeWithPrice.map((item, idx) => (
                                                            <div key={idx} className="text-gray-600 font-medium">
                                                                {item.Size}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="space-y-1">
                                                        {product.SizeWithPrice.map((item, idx) => (
                                                            <div key={idx} className="text-blue-600 font-medium">
                                                                {new Intl.NumberFormat('vi-VN').format(item.Price)}đ
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 italic">Not available</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <img
                                                className="w-20 h-20 rounded-lg object-cover"
                                                src={product.Image}
                                                alt={product.Product_Name}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <Link
                                                    to={`/admin/updateproduct/${product.Product_ID}`}
                                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                                >
                                                    <FaEdit size={20} />
                                                </Link>
                                                <button
                                                    className="text-red-600 hover:text-red-800 transition-colors"
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
                                        className="px-6 py-8 text-center text-gray-500 bg-gray-50 italic"
                                    >
                                        No products available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {filteredProducts.length > productsPerPage && (
                    <div className="flex justify-center gap-2 mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-4 py-2 border rounded-lg ${
                                    currentPage === i + 1 ? 'bg-blue-600 text-white' : ''
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
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
