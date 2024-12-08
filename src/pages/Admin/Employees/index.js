import { useEffect, useState } from "react";
import { getEmployee, deleteEmployee } from "../../../services/employeeService.js";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ModalConfirm from "../../../components/ModalConfirm/ModalConfirm.jsx";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    // Fetch employees from the backend
    const fetchEmployees = async () => {
        try {
            const result = await getEmployee();
            setEmployees(result);
            console.log(result);
        } catch (error) {
            console.error("Failed to get list employees:", error);
            setEmployees([]);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDeleteEmployee = (id) => {
        setEmployeeToDelete(id);
        setModalOpen(true);
    };

    const handleDelete = async () => {
        if (!employeeToDelete) return;

        try {
            const result = await deleteEmployee(employeeToDelete);
            if (result.message === "Employee deleted successfully") {
                await fetchEmployees();
                toast.success("Employee was deleted");
            } else {
                toast.error(`Error deleting employee: ${result.message}`);
            }
        } catch (error) {
            toast.error(`Failed to delete employee: ${error.message}`);
        } finally {
            setModalOpen(false); // Close the modal after action
        }
    };

    return (
        <>
            <div className="p-6 bg-white rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Employees Management</h1>
                    <Link
                        to="/admin/add_employee"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-[15px] py-2.5 px-5 rounded-lg transition duration-300 flex items-center gap-2"
                    >
                        <span className="material-icons text-xl">Add New Employee</span>
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Store ID</th>
                                <th className="px-6 py-4">Birth Date</th>
                                <th className="px-6 py-4">Gender</th>
                                <th className="px-6 py-4">Phone</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Username</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? (
                                employees.map((employee, index) => (
                                    <tr
                                        key={employee.employee_id}
                                        className="bg-white border-b hover:bg-gray-50 transition duration-200"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">{index+1}</td>
                                        <td className="px-6 py-4">{employee.store_id}</td>
                                        <td className="px-6 py-4">
                                            {new Date(employee.birth_date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">{employee.gender}</td>
                                        <td className="px-6 py-4">{employee.phone || "Not available"}</td>
                                        <td className="px-6 py-4">{employee.role}</td>
                                        <td className="px-6 py-4">{employee.username}</td>
                                        <td className="px-6 py-4">{employee.email}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <Link
                                                    to={`/admin/update_employee/${employee.employee_id}`}
                                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                                >
                                                    <FaEdit size={20} />
                                                </Link>
                                                <button
                                                    className="text-red-600 hover:text-red-800 transition-colors"
                                                    onClick={() => handleDeleteEmployee(employee.employee_id)}
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
                                        colSpan="10"
                                        className="px-6 py-8 text-center text-gray-500 bg-gray-50 italic"
                                    >
                                        No employees available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalConfirm
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Confirm delete?"
                message="Are you sure you want to delete this employee?"
                onConfirm={handleDelete}
            />
        </>
    );
};

export default Employees;
