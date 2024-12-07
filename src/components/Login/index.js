import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postLogin } from "../../services/apiService"
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";

//#region Component Definition
function LoginModal({ onClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("login");
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        if (!username) {
            toast.error('Invalid email')
            return;
        }
        if (!password) {
            toast.error('Invalid password')
            return;
        }
        console.log("Đăng nhập");
        let data = await postLogin(username, password);
        console.log(data);
        if(data?.message === "Đăng nhập thành công."){
            // Add username to data before dispatching
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
    };

    return (
        //#region Main Return
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-[800px] my-6 mx-auto">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <button
                            className="absolute right-4 topA-4 text-gray-500 hover:text-gray-700 z-10"
                            onClick={onClose}
                        >
                            <span className="text-2xl">×</span>
                        </button>

                        <div className="flex">
                            <div className="w-1/2 bg-orange-100 rounded-l-lg">
                                <img
                                    src="https://dominos.vn/img/bg/modal-signin-signup.png"
                                    alt="Login"
                                    className="w-full h-full object-cover rounded-l-lg"
                                />
                            </div>

                            <div className="w-1/2 p-8">
                                <div className="flex mb-8 border-b">
                                    <button
                                        className={`pb-4 px-4 ${activeTab === "login"
                                            ? "border-b-2 border-orange-500 text-orange-500"
                                            : "text-gray-500"
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
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Tên người dùng
                                            </label>
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                                placeholder="Nhập số điện thoại"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Mật khẩu
                                            </label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                                placeholder="Nhập mật khẩu"
                                            />
                                        </div>
                                        <div className="text-right">
                                            <a href="#" className="text-orange-500 text-sm">
                                                Quên mật khẩu?
                                            </a>
                                        </div>
                                        <button
                                            onClick={handleLogin}
                                            className="w-full bg-orange-400 text-white p-3 rounded-lg hover:bg-orange-600 transition-colors"
                                        >
                                            Đăng nhập
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Tên người dùng
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                                placeholder="Nhập tên người dùng"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                                placeholder="Nhập địa chỉ email"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Mật khẩu
                                            </label>
                                            <input
                                                type="password"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                                placeholder="Nhập mật khẩu"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Xác nhận mật khẩu
                                            </label>
                                            <input
                                                type="password"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                                placeholder="Nhập lại mật khẩu"
                                            />
                                        </div>
                                        <div className="flex items-start space-x-2 mt-4">
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
                                            className={`w-full p-3 rounded-lg transition-colors ${agreeToTerms
                                                ? "bg-orange-400 hover:bg-orange-600 text-white"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                }`}
                                            disabled={!agreeToTerms}
                                        >
                                            Tạo tài khoản
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        //#endregion
    );
}
//#endregion

export default LoginModal;
