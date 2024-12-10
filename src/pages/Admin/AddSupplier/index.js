import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addSupplier } from "../../../services/supplierService";
import { getIngre } from "../../../services/ingredientsService";

const AddSupplier = () => {
    const navigate = useNavigate();

    const [newSupplier, setNewSupplier] = useState({
        Supplier_Name: "",
        PhoneNumber: "",
        Email: "",
        Supplier_Address: "",
        Rating: "",
        Description: "",
        IngredientWithPrice: [], // Danh sách nguyên liệu với giá
    });

    const [ingredients, setIngredients] = useState([]); // Danh sách nguyên liệu từ API
    const [selectedIngredient, setSelectedIngredient] = useState(""); // Ingredient được chọn (ingredient_id)
    const [price, setPrice] = useState(""); // Giá nguyên liệu được nhập vào

    // Gọi API lấy danh sách nguyên liệu khi component load
    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const data = await getIngre(); // Gọi API để lấy danh sách nguyên liệu
                console.log(data);
                setIngredients(data); // Gán dữ liệu vào state
            } catch (error) {
                console.error("Error fetching ingredients:", error);
                toast.error("Failed to fetch ingredients.");
            }
        };

        fetchIngredients();
    }, []);

    // Xử lý khi nhập thông tin supplier
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier({ ...newSupplier, [name]: value });
    };

    // Thêm nguyên liệu với giá vào danh sách
    const addIngredientWithPrice = () => {
        if (!selectedIngredient || !price) {
            toast.error("Please select an ingredient and enter a price.");
            return;
        }

        // Kiểm tra nguyên liệu đã được thêm chưa
        const existing = newSupplier.IngredientWithPrice.find(
            (item) => item.Ingredient_ID === parseInt(selectedIngredient)
        );

        if (existing) {
            toast.error("Ingredient already added. Please choose another.");
            return;
        }

        // Thêm nguyên liệu với giá vào danh sách
        setNewSupplier({
            ...newSupplier,
            IngredientWithPrice: [
                ...newSupplier.IngredientWithPrice,
                {
                    Ingredient_ID: parseInt(selectedIngredient),
                    Price: parseFloat(price),
                },
            ],
        });

        // Reset giá trị sau khi thêm
        setSelectedIngredient("");
        setPrice("");
        toast.success("Ingredient added successfully!");
    };

    // Gửi dữ liệu form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { Supplier_Name, PhoneNumber, Email, Supplier_Address, Rating, Description, IngredientWithPrice } =
            newSupplier;

        if (
            !Supplier_Name ||
            !PhoneNumber ||
            !Email ||
            !Supplier_Address ||
            !Rating ||
            !Description ||
            IngredientWithPrice.length === 0
        ) {
            toast.error("Please fill in all required fields and add at least one ingredient.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("Supplier_Name", Supplier_Name);
            formData.append("PhoneNumber", PhoneNumber);
            formData.append("Email", Email);
            formData.append("Supplier_Address", Supplier_Address);
            formData.append("Rating", Rating);
            formData.append("Description", Description);

            // Chuyển mảng IngredientWithPrice thành JSON và thêm vào formData
            formData.append("IngredientWithPrice", JSON.stringify(IngredientWithPrice));

            // Gửi yêu cầu POST với dữ liệu formData
            await addSupplier(formData);
            toast.success("Supplier added successfully!");
            navigate("/admin/suppliers");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while adding the supplier.");
        }
    };




    return (
        <section className="min-h-screen bg-[#e5e7eb] p-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-bold text-3xl text-gray-800 mb-6">Add New Supplier</h2>
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Form nhập thông tin supplier */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="Supplier_Name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Supplier Name
                                    </label>
                                    <input
                                        name="Supplier_Name"
                                        type="text"
                                        value={newSupplier.Supplier_Name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Enter supplier name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="PhoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        name="PhoneNumber"
                                        type="text"
                                        value={newSupplier.PhoneNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        name="Email"
                                        type="email"
                                        value={newSupplier.Email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Rating" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Rating
                                    </label>
                                    <input
                                        name="Rating"
                                        type="number"
                                        value={newSupplier.Rating}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Enter rating (1-5)"
                                        required
                                        min="1"
                                        max="5"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="Supplier_Address" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Supplier Address
                                </label>
                                <input
                                    name="Supplier_Address"
                                    type="text"
                                    value={newSupplier.Supplier_Address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter supplier address"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="Description" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="Description"
                                    value={newSupplier.Description}
                                    onChange={handleInputChange}
                                    className="w-full h-36 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                    placeholder="Enter description"
                                    required
                                ></textarea>
                            </div>
                            {/* Form thêm nguyên liệu */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Ingredients</label>
                                <div className="flex items-center space-x-4 mb-3">
                                    <select
                                        value={selectedIngredient}
                                        onChange={(e) => setSelectedIngredient(e.target.value)}
                                        className="w-1/2 px-4 py-2 rounded-lg border border-gray-300"
                                    >
                                        <option value="">Select an ingredient</option>
                                        {ingredients.map((ingredient) => (
                                            <option key={ingredient.ingredient_id} value={ingredient.ingredient_id}>
                                                {ingredient.name}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Enter price"
                                        className="w-1/2 px-4 py-2 rounded-lg border border-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={addIngredientWithPrice}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                                    >
                                        Add
                                    </button>
                                </div>
                                {/* Hiển thị danh sách nguyên liệu */}
                                <ul className="space-y-2">
                                    {newSupplier.IngredientWithPrice.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg">
                                            <span>Ingredient ID: {item.Ingredient_ID}</span>
                                            <span>Price: ${item.Price.toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Nút gửi */}
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all"
                            >
                                Add Supplier
                            </button>
                        </form>
                        <Link to="/admin/suppliers" className="block text-center text-blue-600 mt-4">
                            Back to Suppliers
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddSupplier;
