import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const navigate = useNavigate(); // Hook điều hướng
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Đăng nhập chưa được tích hợp!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#fdf6e3] p-6 w-[400px] shadow-lg rounded-lg">
        {/* Tab Chuyển Đổi */}
        <div className="flex">
          <input
            type="submit"
            value="ĐĂNG NHẬP"
            className="flex-1 py-3 bg-red-600 text-white font-bold rounded-t-lg cursor-pointer"
          />
          <input
            type="submit"
            value="ĐĂNG KÝ"
            className="flex-1 py-3 bg-gray-300 text-gray-700 font-bold rounded-t-lg cursor-pointer"
            onClick={(e) => {
              e.preventDefault(); // Ngăn form submit
              navigate("/register"); // Điều hướng sang trang đăng ký
            }}
          />
        </div>

        {/* Form Đăng Nhập */}
        <form onSubmit={handleLogin} className="p-4">
          {/* Email hoặc số điện thoại */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Email hoặc số điện thoại
            </label>
            <input
              type="text"
              placeholder="Email hoặc số điện thoại"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-red-400"
              required
            />
          </div>

          {/* Mật khẩu */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-red-400"
              required
            />
          </div>

          {/* Captcha */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Vui lòng nhập ký tự bên dưới *
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Nhập mã captcha"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-red-400"
                required
              />
              <img
                src="/captcha.png"
                alt="captcha"
                className="w-24 h-10 border border-gray-300"
              />
            </div>
          </div>

          {/* Nút Đăng Nhập */}
          <input
            type="submit"
            value="ĐĂNG NHẬP"
            className="w-full bg-red-600 text-white py-2 mt-3 font-bold rounded-md hover:bg-red-700 transition cursor-pointer"
          />
        </form>

        {/* Quên mật khẩu */}
        <div className="text-center mt-3">
          <a href="#" className="text-blue-500 hover:underline">
            Bạn muốn tìm lại mật khẩu?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
