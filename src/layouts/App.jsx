import React, { useState } from "react";
import "../App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../component/Navbar/navbar";
import Footer from "../component/Footer";
import Home from "../pages/Home";
import ShowDetail from "../pages/Home/show";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Confirmation from "../pages/Confirmation";
import TicketBooking from "../component/TicketBooking";
import PhimSapChieu from "../pages/Home/PhimSapChieu";
import PhimDangChieu from "../pages/Home/PhimDangChieu";

// Import Dashboard và Layout
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ManageMovies from "../pages/Dashboard/ManageMovies";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ManageTickets from "../pages/Dashboard/ManageTickets";
import Statistics from "../pages/Dashboard/Statistics";
import Settings from "../pages/Dashboard/Settings";
import ManageShowtimes from "../pages/Dashboard/ManageShowtimes";
import CreateShowtimes from "../pages/Dashboard/Create/CreateShows";
import CreateTickets from "../pages/Dashboard/Create/CreateTickets";
import CreateUsers from "../pages/Dashboard/Create/CreateUsers";
import CreateMovies from "../pages/Dashboard/Create/CreateMovies";

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com" },
    { id: 2, name: "Trần Thị B", email: "b@example.com" },
  ]);

  const addUser = (user) => {
    const newUser = { id: users.length + 1, ...user };
    setUsers([...users, newUser]);
  };

  return (
    <Router>
      <Routes>
        {/* Layout chính có Navbar & Footer */}
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/phim/:ma_phim"
          element={
            <>
              <Navbar />
              <ShowDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
              <Footer />
            </>
          }
        />

        {/* Sửa lỗi: Thêm route động cho ticket-booking */}
        <Route
          path="/ticket-booking/:id"
          element={
            <>
              <Navbar />
              <TicketBooking />
              <Footer />
            </>
          }
        />
        <Route
          path="/confirmation"
          element={
            <>
              <Navbar />
              <Confirmation />
              <Footer />
            </>
          }
        />

        {/* Layout riêng cho Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="movies" element={<ManageMovies />} />
          <Route path="users" element={<ManageUsers users={users} />} />
          <Route path="tickets" element={<ManageTickets />} />
          <Route path="showtimes" element={<ManageShowtimes />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="settings" element={<Settings />} />

          {/* Routes Create */}
          <Route path="createMovies" element={<CreateMovies />} />
          <Route path="createShows" element={<CreateShowtimes />} />
          <Route path="createTickets" element={<CreateTickets />} />
          <Route
            path="createUser"
            element={<CreateUsers onAddUser={addUser} />}
          />
        </Route>

        <Route
          path="/phim-dang-chieu"
          element={
            <>
              <Navbar />
              <PhimDangChieu />
              <Footer />
            </>
          }
        />

        <Route
          path="/phim-sap-chieu"
          element={
            <>
              <Navbar />
              <PhimSapChieu />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
