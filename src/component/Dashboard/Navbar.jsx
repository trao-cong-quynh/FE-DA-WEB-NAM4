import React, { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.ho_ten); // hoặc user.ten
    }
  }, []);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div
        onClick={handleOpenMenu}
        className="relative flex items-center space-x-4 cursor-pointer"
      >
        <span className="hidden md:block font-medium">{userName}</span>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" /> Đăng Xuất
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
