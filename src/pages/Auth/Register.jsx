import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate(); // Hook điều hướng
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    gender: "",
    region: "",
    favoriteCinema: "",
    captcha: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Chuyển ngày sinh thành định dạng YYYY-MM-DD
    const ngaySinh = `${formData.birthYear}-${formData.birthMonth.padStart(
      2,
      "0"
    )}-${formData.birthDay.padStart(2, "0")}`;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/dangki`, {
        ho_ten: formData.name,
        email: formData.email,
        mat_khau: formData.password,
        sdt: formData.phone,
        vai_tro: "user", // mặc định là user
        ngay_sinh: ngaySinh,
        gioi_tinh: formData.gender === "Nam" ? 1 : 0,
      });
      alert("Đăng ký thành công!");
      navigate("/login"); // chuyển hướng qua trang đăng nhập
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      alert("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#fdf6e3] p-6 w-[450px] shadow-lg rounded-lg">
        {/* Tab Chuyển Đổi */}
        <div className="flex">
          <input
            type="submit"
            value="ĐĂNG NHẬP"
            className="flex-1 py-3 bg-gray-300 text-gray-700 font-bold rounded-t-lg cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          />

          <input
            type="submit"
            value="ĐĂNG KÝ"
            className="flex-1 py-3 bg-red-600 text-white font-bold rounded-t-lg cursor-pointer"
          />
        </div>

        {/* Form Đăng Ký */}
        <form onSubmit={handleRegister} className="p-4">
          {/* Tên */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Tên *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Tên"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-red-400"
              required
            />
          </div>

          {/* Số điện thoại */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại *
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-red-400"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-red-400"
              required
            />
          </div>

          {/* Mật khẩu */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu *
            </label>
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-red-400"
              required
            />
          </div>

          {/* Ngày sinh */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Ngày sinh *
            </label>
            <div className="flex space-x-2">
              <select
                name="birthDay"
                className="border px-3 py-2 rounded-md w-1/3"
                onChange={handleChange}
                required
              >
                <option value="">Ngày</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                name="birthMonth"
                className="border px-3 py-2 rounded-md w-1/3"
                onChange={handleChange}
                required
              >
                <option value="">Tháng</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                name="birthYear"
                className="border px-3 py-2 rounded-md w-1/3"
                onChange={handleChange}
                required
              >
                <option value="">Năm</option>
                {[...Array(100)].map((_, i) => (
                  <option key={i} value={2024 - i}>
                    {2024 - i}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Giới tính */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Giới tính *
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="Nam"
                  onChange={handleChange}
                  required
                />
                <span>Nam</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  onChange={handleChange}
                  required
                />
                <span>Nữ</span>
              </label>
            </div>
          </div>

          {/* Captcha
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Vui lòng nhập ký tự bên dưới *
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="captcha"
                placeholder="Nhập mã captcha"
                value={formData.captcha}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md focus:ring focus:ring-red-400"
                required
              />
              <img
                src="/captcha.png"
                alt="captcha"
                className="w-24 h-10 border"
              />
            </div>
          </div> */}

          {/* Điều khoản */}
          <div className="mb-3 flex items-center">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
            />
            <span className="ml-2 text-sm">
              Tôi đồng ý với{" "}
              <a href="#" className="text-blue-500 underline">
                Điều Khoản Sử Dụng
              </a>{" "}
              của CGV
            </span>
          </div>

          {/* Nút Đăng Ký */}
          <input
            type="submit"
            value="ĐĂNG KÝ"
            className="w-full bg-red-600 text-white py-2 font-bold rounded-md hover:bg-red-700 transition cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
}

export default Register;
