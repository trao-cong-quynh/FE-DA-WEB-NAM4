import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Statistics = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalTickets: 0,
    totalShowtimes: 0,
  });

  useEffect(() => {
    // Giả lập dữ liệu thống kê (có thể thay bằng API thực tế)
    const fetchStats = async () => {
      const fakeData = {
        totalRevenue: 50000000, // 50 triệu VND
        totalTickets: 1200,
        totalShowtimes: 85,
      };
      setStats(fakeData);
    };

    fetchStats();
  }, []);

  // Dữ liệu biểu đồ cột
  const barData = [
    { name: "Doanh thu", value: stats.totalRevenue },
    { name: "Vé đã bán", value: stats.totalTickets },
    { name: "Suất chiếu", value: stats.totalShowtimes },
  ];

  // Dữ liệu biểu đồ tròn
  const pieData = [
    { name: "Doanh thu", value: stats.totalRevenue },
    { name: "Vé đã bán", value: stats.totalTickets },
    { name: "Suất chiếu", value: stats.totalShowtimes },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Thống kê hệ thống</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Biểu đồ cột */}
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Thống kê tổng quan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ tròn */}
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">
            Tỷ lệ doanh thu - vé - suất chiếu
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
