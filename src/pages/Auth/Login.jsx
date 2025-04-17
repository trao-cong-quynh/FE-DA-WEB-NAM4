import React, { useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../../component/Toast/Toast";

const Login = () => {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF7E5]">
      {showToast && (
        <Toast
          message="Đăng nhập thành công!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#D47F19]">
          Đăng Nhập
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Ghi nhớ đăng nhập</span>
            </label>
            <a
              className="inline-block align-baseline font-bold text-sm text-[#D47F19] hover:text-[#B36A14]"
              href="#"
            >
              Quên mật khẩu?
            </a>
          </div>
          <div className="flex flex-col space-y-4">
            <button
              className="w-full bg-[#D47F19] hover:bg-[#B36A14] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Đăng Nhập
            </button>
            <p className="text-center">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-[#D47F19] hover:text-[#B36A14] font-bold"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
