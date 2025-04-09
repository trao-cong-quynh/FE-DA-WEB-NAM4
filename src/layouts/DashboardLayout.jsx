import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaFilm,
  FaUser,
  FaChartPie,
  FaChevronDown,
  FaChevronRight,
  FaClock,
  FaTicketAlt,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardLayout = () => {
  const [openMenus, setOpenMenus] = useState({
    movies: false,
    showtimes: false,
    users: false,
    tickets: false,
  });

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLogout = () => {
    alert("Đã đăng xuất!");
    // Xử lý đăng xuất, ví dụ: xóa token, chuyển hướng
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gradient-to-b from-blue-500 to-purple-500 p-4 text-white flex flex-col justify-between">
        <ul>
          {/* Tổng quan */}
          <li className="py-2 flex items-center space-x-2">
            <FaChartPie />
            <Link to="/dashboard">Tổng quan</Link>
          </li>

          {/* Quản lý phim */}
          <li className="py-2">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleMenu("movies")}
            >
              <div className="flex items-center space-x-2">
                <FaFilm />
                <span>Quản lý phim</span>
              </div>
              {openMenus.movies ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {openMenus.movies && (
              <ul className="pl-6 mt-2 space-y-1">
                <li>
                  <Link to="/dashboard/movies">Danh sách phim</Link>
                </li>
                <li>
                  <Link to="/dashboard/createMovies">Tạo phim</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Quản lý suất chiếu */}
          <li className="py-2">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleMenu("showtimes")}
            >
              <div className="flex items-center space-x-2">
                <FaClock />
                <span>Quản lý suất chiếu</span>
              </div>
              {openMenus.showtimes ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {openMenus.showtimes && (
              <ul className="pl-6 mt-2 space-y-1">
                <li>
                  <Link to="/dashboard/showtimes">Danh sách suất chiếu</Link>
                </li>
                <li>
                  <Link to="/dashboard/createShows">Tạo suất chiếu</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Quản lý người dùng */}
          <li className="py-2">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleMenu("users")}
            >
              <div className="flex items-center space-x-2">
                <FaUser />
                <span>Quản lý người dùng</span>
              </div>
              {openMenus.users ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {openMenus.users && (
              <ul className="pl-6 mt-2 space-y-1">
                <li>
                  <Link to="/dashboard/users">Danh sách người dùng</Link>
                </li>
                <li>
                  <Link to="/dashboard/createUser">Thêm người dùng</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Quản lý đặt vé */}
          <li className="py-2">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleMenu("tickets")}
            >
              <div className="flex items-center space-x-2">
                <FaTicketAlt />
                <span>Quản lý đặt vé</span>
              </div>
              {openMenus.tickets ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {openMenus.tickets && (
              <ul className="pl-6 mt-2 space-y-1">
                <li>
                  <Link to="/dashboard/tickets">Danh sách vé</Link>
                </li>
                <li>
                  <Link to="/dashboard/createTickets">Thêm vé</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Thống kê */}
          <li className="py-2 flex items-center space-x-2">
            <FaChartLine />
            <Link to="/dashboard/statistics">Thống kê</Link>
          </li>

          {/* Cấu hình */}
          <li className="py-2 flex items-center space-x-2">
            <FaCog />
            <Link to="/dashboard/settings">Cấu hình</Link>
          </li>
        </ul>

        {/* Admin Account */}
        <div className="relative mt-auto">
          <div
            className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-white/10 rounded-md"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="Admin Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span>Admin</span>
          </div>

          {showDropdown && (
            <div className="absolute bottom-12 left-0 bg-white text-black shadow-md rounded-lg w-36">
              <button
                className="flex items-center justify-start w-full px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Nội dung chính */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
