import { useEffect, useState } from "react";
import { getIngre, deleteIngre } from '../../../services/ingredients.js';
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalConfirm from "../../../components/ModalConfirm/ModalConfirm.jsx";

const Products = () => {
    const [ingredients, setIngredients] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [ingredientToDelete, setIngredientToDelete] = useState(null);

    const fetchIngre = async () => {
        try {
            const result = await getIngre();
            setIngredients(result);
        } catch (error) {
            console.error("Failed to get ingredients:", error);
            setIngredients([]);
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

    return (
        <>
            <div className="relative overflow-x-auto rounded-lg">
                <div className="flex justify-end mb-4">
                    <Link
                        to="/admin/addmaterial"
                        className="bg-gray-500 hover:opacity-60 transition-all text-black font-medium text-[17px] py-2 px-4 rounded-lg"
                    >
                        Add new ingredient
                    </Link>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Quantity</th>
                            <th className="px-6 py-3">Expiration Date</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredients.length > 0 ? (
                            ingredients.map((ingredient, index) => (
                                <tr
                                    key={ingredient.ingredient_id}
                                    className="bg-white border-b hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{ingredient.name}</td>
                                    <td className="px-6 py-4">{ingredient.quantity}</td>
                                    <td className="px-6 py-4">
                                        {new Date(ingredient.expiration_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                to={`/admin/updatematerial/${ingredient.ingredient_id}`}
                                                className="font-medium text-red-500"
                                            >
                                                <FaEdit size={20} />
                                            </Link>
                                            <button
                                                className="font-medium text-red-500"
                                                onClick={() => handleDeleteReview(ingredient.ingredient_id)}
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
                                    colSpan="4"
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    No ingredients available
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
                message="Are you sure you want to delete this ingredients?"
                onConfirm={handleDelete}
            />
        </>
    );
};

export default Products;
