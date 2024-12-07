import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postLogin, postRegister } from "../../services/apiService"
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginModal({ onClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("login");
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerForm, setRegisterForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegisterChange = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async () => {
        if (!registerForm.username || !registerForm.email || !registerForm.password) {
            toast.error('Vui lòng điền đầy đủ thông tin');
            return;
        }
        if (registerForm.password !== registerForm.confirmPassword) {
            toast.error('Mật khẩu xác nhận không khớp');
            return;
        }
        if (!agreeToTerms) {
            toast.error('Vui lòng đồng ý với điều khoản sử dụng');
            return;
        }

        setIsRegisterLoading(true);
        try {
            const response = await postRegister({
                username: registerForm.username,
                email: registerForm.email,
                password: registerForm.password
            });
            
            if (response?.message === "Đăng ký thành công.") {
                toast.success("Đăng ký thành công");
                setActiveTab("login");
                setRegisterForm({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                setAgreeToTerms(false);
            } else {
                toast.error(response?.message || "Đăng ký thất bại");
            }
        } catch (error) {
            toast.error("Đã có lỗi xảy ra khi đăng ký");
        } finally {
            setIsRegisterLoading(false);
        }
    };

    const handleLogin = async (e) => {
        if (!username) {
            toast.error('Invalid email')
            return;
        }
        if (!password) {
            toast.error('Invalid password')
            return;
        }
        setIsLoginLoading(true);
        try {
            let data = await postLogin(username, password);
            if(data?.message === "Đăng nhập thành công."){
                data.username = username;
                dispatch(doLogin(data));
                if(data?.role === "Manager"){
                    navigate('/admin')
                }
                else{
                    navigate('/')
                    onClose();
                }
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Đã có lỗi xảy ra");
        } finally {
            setIsLoginLoading(false);
        }
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50 backdrop-blur-sm">
                <div className={`relative w-[800px] my-6 mx-auto ${activeTab === "login" ? "h-[500px]" : "h-[600px]"} transition-all duration-300 animate-fadeIn`}>
                    <div className="border-0 rounded-2xl shadow-2xl relative flex flex-col w-full h-full bg-white outline-none focus:outline-none transform transition-all duration-300 hover:scale-[1.01]">
                        <button
                            className="absolute right-4 top-4 text-gray-500 hover:text-red-500 z-10 transition-colors duration-200 bg-white rounded-full p-2 hover:bg-red-50"
                            onClick={onClose}
                        >
                            <span className="text-2xl">&times;</span>
                        </button>

                        <div className="flex h-full">
                            <div className="w-1/2 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/20"></div>
                                <img
                                    src="https://dominos.vn/img/bg/modal-signin-signup.png"
                                    alt="Login"
                                    className="w-full h-full object-cover transform transition-transform duration-7"
                                />
                            </div>

                            <div className="w-1/2 p-8 overflow-y-auto">
                                <div className="flex mb-8 border-b">
                                    <button
                                        className={`pb-4 px-4 transition-all duration-300 ${
                                            activeTab === "login"
                                            ? "border-b-2 border-orange-500 text-orange-500 font-semibold"
                                            : "text-gray-500 hover:text-orange-400"
                                        }`}
                                        onClick={() => setActiveTab("login")}
                                    >
                                        Đăng nhập
                                    </button>
                                    <button
                                        className={`pb-4 px-4 ${activeTab === "register"
                                            ? "border-b-2 border-orange-500 text-orange-500"
                                            : "text-gray-500"
                                            }`}
                                        onClick={() => setActiveTab("register")}
                                    >
                                        Tạo tài khoản
                                    </button>
                                </div>
                                {activeTab === "login" ? (
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="relative">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Tên người dùng
                                                </label>
                                                <div className="relative">
                                                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                                        placeholder="Nhập tên người dùng"
                                                    />
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Mật khẩu
                                                </label>
                                                <div className="relative">
                                                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                                        placeholder="Nhập mật khẩu"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative my-6">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                                                <FaGoogle className="text-red-500 mr-2" />
                                                Google
                                            </button>
                                            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                                                <FaFacebook className="text-blue-600 mr-2" />
                                                Facebook
                                            </button>
                                        </div>

                                        <button
                                            onClick={handleLogin}
                                            disabled={isLoginLoading}
                                            className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white p-3 rounded-lg hover:from-orange-500 hover:to-orange-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoginLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                                    Đang đăng nhập...
                                                </div>
                                            ) : (
                                                "Đăng nhập"
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Tên người dùng
                                            </label>
                                            <div className="relative">
                                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={registerForm.username}
                                                    onChange={handleRegisterChange}
                                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                                    placeholder="Nhập tên người dùng"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Email
                                            </label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={registerForm.email}
                                                    onChange={handleRegisterChange}
                                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                                    placeholder="Nhập địa chỉ email"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Mật khẩu
                                            </label>
                                            <div className="relative">
                                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type={showRegisterPassword ? "text" : "password"}
                                                    name="password"
                                                    value={registerForm.password}
                                                    onChange={handleRegisterChange}
                                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                                    placeholder="Nhập mật khẩu"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showRegisterPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Xác nhận mật khẩu
                                            </label>
                                            <div className="relative">
                                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    name="confirmPassword"
                                                    value={registerForm.confirmPassword}
                                                    onChange={handleRegisterChange}
                                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                                    placeholder="Nhập lại mật khẩu"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 mt-2">
                                            <input
                                                type="checkbox"
                                                id="terms"
                                                className="mt-1"
                                                checked={agreeToTerms}
                                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                            />
                                            <label htmlFor="terms" className="text-sm text-gray-600">
                                                Tôi xác nhận thông tin trên là chính xác và đồng ý với{" "}
                                                <a href="#" className="text-orange-500 hover:underline">
                                                    điều khoản sử dụng
                                                </a>{" "}
                                                của cửa hàng
                                            </label>
                                        </div>
                                        <button
                                            onClick={handleRegister}
                                            className={`w-full p-3 rounded-lg transition-colors ${
                                                agreeToTerms
                                                    ? "bg-orange-400 hover:bg-orange-600 text-white"
                                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            }`}
                                            disabled={!agreeToTerms || isRegisterLoading}
                                        >
                                            {isRegisterLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                                    Đang tạo tài khoản...
                                                </div>
                                            ) : (
                                                "Tạo tài khoản"
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginModal;
