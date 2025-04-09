import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isLoggedIn = false; // Sau này thay bằng dữ liệu từ backend

  return (
    <header className="bg-[#FDF7E5] text-black shadow-md">
      <div className="w-4/5 mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-3xl font-bold text-[#D47F19] cursor-pointer"
          onClick={() => navigate("/")}
        >
          CGV
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {/* PHIM - Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="cursor-pointer hover:text-[#B38B59]">PHIM</span>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 max-w-xs bg-[#F5E6C8] rounded-md shadow-lg z-10 text-black">
                <li
                  className="px-4 py-2 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/phim-dang-chieu")}
                >
                  Phim Đang Chiếu
                </li>
                <li
                  className="px-4 py-2 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/phim-sap-chieu")}
                >
                  Phim Sắp Chiếu
                </li>
              </ul>
            )}
          </div>

          <a href="#" className="hover:text-[#B38B59]">
            RẠP CGV
          </a>
          <a href="#" className="hover:text-[#B38B59]">
            THÀNH VIÊN
          </a>
          <a href="#" className="hover:text-[#B38B59]">
            CULTUREPLEX
          </a>
        </nav>

        {/* Nút đăng nhập / đăng ký / mua vé */}
        <div className="hidden md:flex space-x-4">
          <button
            className="bg-[#E5C9A8] text-black px-4 py-2 rounded hover:bg-[#B38B59] hover:text-white transition"
            onClick={() => navigate("/login")}
          >
            Đăng Nhập
          </button>
          <button
            className="bg-[#E5C9A8] text-black px-4 py-2 rounded hover:bg-[#B38B59] hover:text-white transition"
            onClick={() => navigate("/register")}
          >
            Đăng Ký
          </button>
          <button
            className="bg-[#D47F19] px-6 py-3 rounded-lg text-lg font-semibold text-white hover:bg-[#B36A14] transition"
            onClick={() => navigate("/ticket")}
          >
            MUA VÉ NGAY
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Icon User */}
          <div className="relative">
            <FaUserCircle
              className="text-2xl cursor-pointer"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            />
            {isUserMenuOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-[#F5E6C8] rounded-md shadow-lg text-black text-sm">
                {isLoggedIn ? (
                  <>
                    <li className="px-4 py-2">Xin chào, User</li>
                    <li
                      className="px-4 py-2 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Đăng xuất
                    </li>
                  </>
                ) : (
                  <li
                    className="px-4 py-2 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Đăng nhập
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Nút mở menu */}
          <button
            className="text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden w-4/5 mx-auto bg-[#F5E6C8] text-center py-4">
          {/* Dropdown PHIM cho mobile */}
          <div>
            <button
              className="w-full text-left py-2 px-6 bg-[#E5C9A8] hover:bg-[#B38B59] hover:text-white flex justify-between items-center"
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            >
              PHIM
              <span>{isMobileDropdownOpen ? "▲" : "▼"}</span>
            </button>
            {isMobileDropdownOpen && (
              <ul className="bg-[#D4B89D]">
                <li
                  className="py-2 px-6 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/phim-dang-chieu")}
                >
                  Phim Đang Chiếu
                </li>
                <li
                  className="py-2 px-6 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/phim-sap-chieu")}
                >
                  Phim Sắp Chiếu
                </li>
              </ul>
            )}
          </div>

          <a href="#" className="block py-2 hover:text-[#B38B59]">
            RẠP CGV
          </a>
          <a href="#" className="block py-2 hover:text-[#B38B59]">
            THÀNH VIÊN
          </a>
          <a href="#" className="block py-2 hover:text-[#B38B59]">
            CULTUREPLEX
          </a>
          <button
            className="block w-full bg-[#D47F19] py-3 mt-4 text-lg font-semibold text-white hover:bg-[#B36A14] transition"
            onClick={() => navigate("/ticket")}
          >
            MUA VÉ NGAY
          </button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
