import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRapDropdownOpen, setIsRapDropdownOpen] = useState(false);
  const [isThanhVienDropdownOpen, setIsThanhVienDropdownOpen] = useState(false);
  const [isCultureplexDropdownOpen, setIsCultureplexDropdownOpen] =
    useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-[#FDF7E5] text-black shadow-md sticky top-0 z-50">
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
            <div className="absolute left-0 w-full h-4"></div>
            {isDropdownOpen && (
              <ul className="absolute left-0 top-full w-48 max-w-xs bg-[#F5E6C8] rounded-md shadow-lg z-10 text-black">
                <li
                  className="px-4 py-3 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/phim-dang-chieu")}
                >
                  Phim Đang Chiếu
                </li>
                {/* <li
                  className="px-4 py-3 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/phim-sap-chieu")}
                >
                  Phim Sắp Chiếu
                </li> */}
              </ul>
            )}
          </div>

          {/* RẠP CGV - Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsRapDropdownOpen(true)}
            onMouseLeave={() => setIsRapDropdownOpen(false)}
          >
            <span className="cursor-pointer hover:text-[#B38B59]">RẠP CGV</span>
            <div className="absolute left-0 w-full h-4"></div>
            {isRapDropdownOpen && (
              <ul className="absolute left-0 top-full w-48 max-w-xs bg-[#F5E6C8] rounded-md shadow-lg z-10 text-black">
                <li
                  className="px-4 py-3 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/tat-ca-rap")}
                >
                  Tất cả các rạp
                </li>
                <li
                  className="px-4 py-3 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/rap-dac-biet")}
                >
                  Rạp đặc biệt
                </li>
                <li
                  className="px-4 py-3 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/rap-3d")}
                >
                  Rạp 3D
                </li>
              </ul>
            )}
          </div>

          {/* THÀNH VIÊN - Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsThanhVienDropdownOpen(true)}
            onMouseLeave={() => setIsThanhVienDropdownOpen(false)}
          >
            <span className="cursor-pointer hover:text-[#B38B59]">
              THÀNH VIÊN
            </span>
            <div className="absolute left-0 w-full h-4"></div>
            {isThanhVienDropdownOpen && (
              <ul className="absolute left-0 top-full w-48 max-w-xs bg-[#F5E6C8] rounded-md shadow-lg z-10 text-black">
                <li
                  className="px-4 py-3 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/tai-khoan-cgv")}
                >
                  Tài khoản CGV
                </li>
                <li
                  className="px-4 py-3 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/quyen-loi")}
                >
                  Quyền lợi
                </li>
              </ul>
            )}
          </div>

          {/* CULTUREPLEX - Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsCultureplexDropdownOpen(true)}
            onMouseLeave={() => setIsCultureplexDropdownOpen(false)}
          >
            <span className="cursor-pointer hover:text-[#B38B59]">
              CULTUREPLEX
            </span>
            <div className="absolute left-0 w-full h-4"></div>
            {isCultureplexDropdownOpen && (
              <ul className="absolute left-0 top-full w-48 max-w-xs bg-[#F5E6C8] rounded-md shadow-lg z-10 text-black">
                <li
                  className="px-4 py-3 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/quay-online")}
                >
                  Quầy online
                </li>
                <li
                  className="px-4 py-3 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/rap-va-thue-rap")}
                >
                  Rạp và thuê rạp
                </li>
              </ul>
            )}
          </div>
        </nav>

        {/* Nút đăng nhập / đăng ký / mua vé */}
        <div className="hidden md:flex space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-[#E5C9A8] px-4 py-2 rounded hover:bg-[#B38B59] hover:text-white transition"
                >
                  <FaUserCircle className="text-xl" />
                  <span>{user.ho_ten}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#F5E6C8] rounded-md shadow-lg z-10">
                    {user.vai_tro === "admin" && (
                      <button
                        onClick={() => navigate("/dashboard")}
                        className="block w-full text-left px-4 py-2 hover:bg-[#B38B59] hover:text-white"
                      >
                        Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => navigate("/tai-khoan-cgv")}
                      className="block w-full text-left px-4 py-2 hover:bg-[#B38B59] hover:text-white"
                    >
                      Tài khoản của tôi
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-[#B38B59] hover:text-white"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
          <button
            className="bg-[#D47F19] px-6 py-3 rounded-lg text-lg font-semibold text-white hover:bg-[#B36A14] transition"
            onClick={() => navigate("/phim-dang-chieu")}
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
                {user ? (
                  <>
                    <li className="px-4 py-2">Xin chào, {user.ho_ten}</li>
                    {user.vai_tro === "admin" && (
                      <li
                        className="px-4 py-2 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                        onClick={() => navigate("/dashboard")}
                      >
                        Dashboard
                      </li>
                    )}
                    <li
                      className="px-4 py-2 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                      onClick={() => navigate("/tai-khoan-cgv")}
                    >
                      Tài khoản của tôi
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                      onClick={handleLogout}
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
                {/* <li
                  className="py-2 px-6 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/phim-sap-chieu")}
                >
                  Phim Sắp Chiếu
                </li> */}
              </ul>
            )}
          </div>

          {/* Dropdown RẠP CGV cho mobile */}
          <div>
            <button
              className="w-full text-left py-2 px-6 bg-[#E5C9A8] hover:bg-[#B38B59] hover:text-white flex justify-between items-center"
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            >
              RẠP CGV
              <span>{isMobileDropdownOpen ? "▲" : "▼"}</span>
            </button>
            {isMobileDropdownOpen && (
              <ul className="bg-[#D4B89D]">
                <li
                  className="py-2 px-6 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/tat-ca-rap")}
                >
                  Tất cả các rạp
                </li>
                <li
                  className="py-2 px-6 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/rap-dac-biet")}
                >
                  Rạp đặc biệt
                </li>
                <li
                  className="py-2 px-6 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/rap-3d")}
                >
                  Rạp 3D
                </li>
              </ul>
            )}
          </div>

          {/* Dropdown THÀNH VIÊN cho mobile */}
          <div>
            <button
              className="w-full text-left py-2 px-6 bg-[#E5C9A8] hover:bg-[#B38B59] hover:text-white flex justify-between items-center"
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            >
              THÀNH VIÊN
              <span>{isMobileDropdownOpen ? "▲" : "▼"}</span>
            </button>
            {isMobileDropdownOpen && (
              <ul className="bg-[#D4B89D]">
                <li
                  className="py-2 px-6 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/tai-khoan-cgv")}
                >
                  Tài khoản CGV
                </li>
                <li
                  className="py-2 px-6 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/quyen-loi")}
                >
                  Quyền lợi
                </li>
              </ul>
            )}
          </div>

          {/* Dropdown CULTUREPLEX cho mobile */}
          <div>
            <button
              className="w-full text-left py-2 px-6 bg-[#E5C9A8] hover:bg-[#B38B59] hover:text-white flex justify-between items-center"
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            >
              CULTUREPLEX
              <span>{isMobileDropdownOpen ? "▲" : "▼"}</span>
            </button>
            {isMobileDropdownOpen && (
              <ul className="bg-[#D4B89D]">
                <li
                  className="py-2 px-6 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/quay-online")}
                >
                  Quầy online
                </li>
                <li
                  className="py-2 px-6 hover:bg-[#B38B59] hover:text-white cursor-pointer"
                  onClick={() => navigate("/rap-va-thue-rap")}
                >
                  Rạp và thuê rạp
                </li>
              </ul>
            )}
          </div>

          <button
            className="block w-full bg-[#D47F19] py-3 mt-4 text-lg font-semibold text-white hover:bg-[#B36A14] transition"
            onClick={() => navigate("/phim-dang-chieu")}
          >
            MUA VÉ NGAY
          </button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
