import { useEffect, useState } from "react";
import { getIngre, deleteIngre } from '../../../services/ingredients.js';
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalConfirm from "../../../components/ModalConfirm/ModalConfirm.jsx";
import { BiSearch } from "react-icons/bi";

const Products = () => {
    const [ingredients, setIngredients] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [ingredientToDelete, setIngredientToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("name");
    const itemsPerPage = 10;

    const fetchIngre = async () => {
        setIsLoading(true);
        try {
            const result = await getIngre();
            setIngredients(result);
        } catch (error) {
            console.error("Failed to get ingredients:", error);
            setIngredients([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteReview = (id) => {
        setIngredientToDelete(id);
        setModalOpen(true);
    };

    const handleDelete = async () => {
        if (!ingredientToDelete) return;

        try {
            const result = await deleteIngre(ingredientToDelete);
            if (result.message === "Ingredient removed successfully") {
                await fetchIngre();
                toast.success(`Ingredient was deleted`);
            } else {
                toast.error(`Error deleting Ingredient: ${ingredientToDelete}`);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setModalOpen(false); // Close the modal after action
        }
    };

    useEffect(() => {
        fetchIngre();
    }, []);

    const filteredIngredients = ingredients
        .filter(ing => 
            ing.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "expiration") {
                return new Date(a.expiration_date) - new Date(b.expiration_date);
            }
            return a.name.localeCompare(b.name);
        });

    const paginatedIngredients = filteredIngredients.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);

    const getStatusColor = (quantity, expirationDate) => {
        const daysUntilExpiration = Math.ceil((new Date(expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
        if (quantity <= 10 || daysUntilExpiration <= 7) return "text-red-600";
        if (quantity <= 20 || daysUntilExpiration <= 14) return "text-yellow-600";
        return "text-green-600";
    };

    const getStatus = (quantity, expirationDate) => {
        const daysUntilExpiration = Math.ceil((new Date(expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiration < 0) {
            return {
                text: "Expired",
                color: "bg-rose-100 text-rose-900 border border-rose-200",
                message: `Expired ${Math.abs(daysUntilExpiration)} days ago`
            };
        } else if (quantity <= 10 && daysUntilExpiration <= 7) {
            return {
                text: "Critical Alert",
                color: "bg-red-100 text-red-900 border border-red-200",
                message: "Low stock & Expiring soon"
            };
        } else if (quantity <= 10) {
            return {
                text: "Low Stock",
                color: "bg-amber-100 text-amber-900 border border-amber-200",
                message: "Restock needed"
            };
        } else if (daysUntilExpiration <= 7) {
            return {
                text: "Expiring Soon",
                color: "bg-yellow-100 text-yellow-900 border border-yellow-200",
                message: `Expires in ${daysUntilExpiration} days`
            };
        } else {
            return {
                text: "Good",
                color: "bg-emerald-100 text-emerald-900 border border-emerald-200",
                message: "No issues"
            };
        }
    };

    return (
        <div className="p-6  bg-[#e5e7eb] min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Ingredients Management</h1>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search ingredients..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="name">Sort by Name</option>
                                <option value="expiration">Sort by Expiration</option>
                            </select>
                        </div>
                        <Link
                            to="/admin/addmaterial"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-[15px] py-2.5 px-5 rounded-lg transition-all duration-200 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add new ingredient
                        </Link>
                    </div>

                    <div className="flex gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-900 border border-rose-200">
                            Expired
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-900 border border-red-200">
                            Critical Alert
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-900 border border-amber-200">
                            Low Stock
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-900 border border-yellow-200">
                            Expiring Soon
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-900 border border-emerald-200">
                            Good Status
                        </span>
                    </div>
                </div>

                {isLoading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-3 text-gray-600">Loading ingredients...</p>
                    </div>
                ) : (
                    <>
                        <div className="relative overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">ID</th>
                                        <th className="px-6 py-4 font-semibold">Name</th>
                                        <th className="px-6 py-4 font-semibold">Quantity</th>
                                        <th className="px-6 py-4 font-semibold">Expiration Date</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedIngredients.length > 0 ? (
                                        paginatedIngredients.map((ingredient, index) => {
                                            const status = getStatus(ingredient.quantity, ingredient.expiration_date);
                                            return (
                                                <tr key={ingredient.ingredient_id} 
                                                    className="border-b hover:bg-gray-50 transition-colors duration-200">
                                                    <td className="px-6 py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                    <td className={`px-6 py-4 font-medium ${getStatusColor(ingredient.quantity, ingredient.expiration_date)}`}>
                                                        {ingredient.name}
                                                    </td>
                                                    <td className="px-6 py-4">{ingredient.quantity}</td>
                                                    <td className="px-6 py-4">
                                                        {new Date(ingredient.expiration_date).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-1">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                                                                {status.text}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                {status.message}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-center gap-4">
                                                            <Link
                                                                to={`/admin/updatematerial/${ingredient.ingredient_id}`}
                                                                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                                                title="Edit"
                                                            >
                                                                <FaEdit size={18} />
                                                            </Link>
                                                            <button
                                                                className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                                                onClick={() => handleDeleteReview(ingredient.ingredient_id)}
                                                                title="Delete"
                                                            >
                                                                <FaTrash size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                                No ingredients found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-4">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 rounded ${
                                            currentPage === i + 1
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            <ModalConfirm
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Confirm delete?"
                message="Are you sure you want to delete this ingredients?"
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default Products;
