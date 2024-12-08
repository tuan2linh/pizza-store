import { useEffect, useState } from "react";
import { getIngredientOfSupplier } from '../../../services/supplierService';
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";


const GetIngredientOfSupplier = () => {

    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();

    const [ingredients, setIngredients] = useState([]); // Dữ liệu nguyên liệu
    const [isModalOpen, setModalOpen] = useState(false); // Trạng thái của modal xác nhận xóa
    const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
    const [searchTerm, setSearchTerm] = useState(""); // Tìm kiếm
    const [currentPage, setCurrentPage] = useState(1); // Phân trang
    const [sortBy, setSortBy] = useState("name"); // Tiêu chí sắp xếp
    const itemsPerPage = 10; // Số lượng item mỗi trang

    // Lấy danh sách nguyên liệu từ API
    const fetchIngre = async (id) => {
        setIsLoading(true);
        try {
            const result = await getIngredientOfSupplier(id);
            setIngredients(result);
        } catch (error) {
            console.error("Failed to get ingredients:", error);
            setIngredients([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchIngre(id);
    }, [id]);

    // Lọc và sắp xếp nguyên liệu
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

    // Phân trang
    const paginatedIngredients = filteredIngredients.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);

    // Hàm hiển thị trạng thái màu sắc theo số lượng và hạn sử dụng
    const getStatusColor = (quantity, expirationDate) => {
        const daysUntilExpiration = Math.ceil((new Date(expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
        if (quantity <= 10 || daysUntilExpiration <= 7) return "text-red-600";
        if (quantity <= 20 || daysUntilExpiration <= 14) return "text-yellow-600";
        return "text-green-600";
    };

    return (
        <div className="p-6 bg-[#e5e7eb] min-h-screen">
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
                    </div>
                </div>

                {isLoading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-3 text-gray-600">Loading ingredients...</p>
                    </div>
                ) : (
                    <div className="relative overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">ID</th>
                                    <th className="px-6 py-4 font-semibold">INGREDIENTS</th>
                                    <th className="px-6 py-4 font-semibold">Quantity</th>
                                    <th className="px-6 py-4 font-semibold">Expiration Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedIngredients.length > 0 ? (
                                    paginatedIngredients.map((ingredient, index) => (
                                        <tr key={ingredient.ingredient_id} className="border-b hover:bg-gray-50 transition-colors duration-200">
                                            <td className="px-6 py-4">{index + 1}</td>
                                            <td className="px-6 py-4">{ingredient.name}</td>
                                            <td className={`px-6 py-4 ${getStatusColor(ingredient.quantity, ingredient.expiration_date)}`}>
                                                {ingredient.quantity}
                                            </td>
                                            <td className="px-6 py-4">
                                                {new Date(ingredient.expiration_date).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                            No ingredients found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="flex justify-between items-center pt-6">
                    <Link
                        to="/admin/suppliers"
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
                        Back to Supplier List
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default GetIngredientOfSupplier;
