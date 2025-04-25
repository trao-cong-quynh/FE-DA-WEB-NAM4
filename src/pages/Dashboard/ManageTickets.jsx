import React, { useState } from "react";
import useTickets from "../../hooks/useTickets";

const ManageTickets = () => {
    const { tickets, loading, error, ticketDetails, fetchTickets, getTicketDetails, cancelTicket, deleteTicket } = useTickets();
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(tickets.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentTickets = tickets.slice(startIdx, startIdx + itemsPerPage);

    const handleViewDetails = (ma_ve) => {
        getTicketDetails(ma_ve);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCancelTicket = async (ma_ve) => {
        try {
            await cancelTicket(ma_ve);
        } catch (err) {
            // Thông báo lỗi đã được xử lý trong useTickets
        }
    };

    const handleDeleteTicket = async (ma_ve) => {
        try {
            await deleteTicket(ma_ve);
        } catch (err) {
            // Thông báo lỗi đã được xử lý trong useTickets
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg w-full h-full mx-auto">
            <div className="flex justify-between mb-4">
                <button
                    className="bg-gray-200 text-black px-4 py-2 rounded"
                    onClick={fetchTickets}
                >
                    🔄 Refresh
                </button>
            </div>

            {loading ? (
                <p className="text-center">Đang tải...</p>
            ) : error ? (
                <div className="text-center text-red-500">
                    <p>{error}</p>
                    <button
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={fetchTickets}
                    >
                        Thử lại
                    </button>
                </div>
            ) : tickets.length === 0 ? (
                <p className="text-center text-gray-500">Không có vé nào!</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="border p-2">Mã vé</th>
                            <th className="border p-2">Tên phim</th>
                            <th className="border p-2">Suất chiếu</th>
                            <th className="border p-2">Phòng chiếu</th>
                            <th className="border p-2">Người đặt</th>
                            <th className="border p-2">Ghế</th>
                            <th className="border p-2">Dịch vụ</th>
                            <th className="border p-2">Trạng thái</th>
                            <th className="border p-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTickets.map((ticket) => {
                            console.log(`Dữ liệu vé ${ticket.ma_ve}:`, {
                                ve_dats: ticket.ve_dats,
                                chi_tiet_dvs: ticket.chi_tiet_dvs,
                                phongchieu: ticket.suat_chieu?.phongchieu,
                            });
                            return (
                                <tr key={ticket.ma_ve} className="text-center text-gray-700">
                                    <td className="border p-2 text-blue-500 cursor-pointer">
                                        {ticket.ma_ve || "N/A"}
                                    </td>
                                    <td className="border p-2">
                                        {ticket.suat_chieu?.phim?.ten_phim || "N/A"}
                                    </td>
                                    <td className="border p-2 text-red-500">
                                        {ticket.suat_chieu?.thoi_gian_bd || "N/A"}
                                    </td>
                                    <td className="border p-2">
                                        {ticket.suat_chieu?.phongchieu?.ten_phong || "N/A"}
                                    </td>
                                    <td className="border p-2">
                                        {ticket.nguoi_dung?.ho_ten || "N/A"}
                                    </td>
                                    <td className="border p-2">
                                        {Array.isArray(ticket.ve_dats) && ticket.ve_dats.length > 0
                                            ? ticket.ve_dats
                                                  .map((ve) => ve?.ghe_ngoi?.so_ghe || "Không xác định")
                                                  .filter(Boolean)
                                                  .join(", ") || "Không xác định"
                                            : "Không"}
                                    </td>
                                    <td className="border p-2">
                                        {Array.isArray(ticket.chi_tiet_dvs) && ticket.chi_tiet_dvs.length > 0
                                            ? ticket.chi_tiet_dvs
                                                  .map((dv) => `${dv?.dv_an_uong?.ten_dv_an_uong || "Dịch vụ không xác định"} (x${dv?.so_luong || 0})`)
                                                  .filter(Boolean)
                                                  .join(", ") || "Dịch vụ không xác định"
                                            : "Không"}
                                    </td>
                                    <td className="border p-2">
                                        <span
                                            className={`px-2 py-1 rounded ${
                                                ticket.trang_thai === "Đã thanh toán"
                                                    ? "bg-green-100 text-green-700"
                                                    : ticket.trang_thai === "Đang chờ thanh toán"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {ticket.trang_thai}
                                        </span>
                                    </td>
                                    <td className="border p-2 space-x-2">
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                                            onClick={() => {
                                                console.log("Click Xem chi tiết vé:", ticket.ma_ve);
                                                handleViewDetails(ticket.ma_ve);
                                            }}
                                        >
                                            Xem chi tiết
                                        </button>
                                        <button
                                            className={`bg-yellow-500 text-white px-2 py-1 rounded text-xs ${
                                                ticket.trang_thai === "Đã hủy" ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                            onClick={() => {
                                                console.log("Click Hủy vé:", ticket.ma_ve);
                                                if (ticket.trang_thai !== "Đã hủy") {
                                                    handleCancelTicket(ticket.ma_ve);
                                                }
                                            }}
                                            disabled={ticket.trang_thai === "Đã hủy"}
                                        >
                                            Hủy vé
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                                            onClick={() => {
                                                console.log("Click Xóa vé:", ticket.ma_ve);
                                                handleDeleteTicket(ticket.ma_ve);
                                            }}
                                        >
                                            Xóa vé
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {/* Modal hiển thị chi tiết vé */}
            {isModalOpen && ticketDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Chi tiết vé: {ticketDetails.ma_ve}</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Thông tin vé</h3>
                                <p><strong>Mã vé:</strong> {ticketDetails.ma_ve}</p>
                                <p><strong>Trạng thái:</strong> {ticketDetails.trang_thai}</p>
                                <p><strong>Tổng giá:</strong> {ticketDetails.tong_gia_tien} VND</p>
                                <p><strong>Ngày đặt:</strong> {new Date(ticketDetails.ngay_dat).toLocaleString()}</p>
                                <p><strong>Tổng số vé:</strong> {ticketDetails.tong_so_ve}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Người đặt</h3>
                                <p><strong>Tên:</strong> {ticketDetails.nguoi_dung?.ho_ten || "N/A"}</p>
                                <p><strong>Email:</strong> {ticketDetails.nguoi_dung?.email || "N/A"}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Suất chiếu</h3>
                                <p><strong>Phim:</strong> {ticketDetails.suat_chieu?.phim?.ten_phim || "N/A"}</p>
                                <p><strong>Phòng chiếu:</strong> {ticketDetails.suat_chieu?.phongchieu?.ten_phong || "N/A"}</p>
                                <p><strong>Thời gian:</strong> {ticketDetails.suat_chieu?.thoi_gian_bd || "N/A"} - {ticketDetails.suat_chieu?.ngay_chieu || "N/A"}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Ghế ngồi</h3>
                                <ul className="list-disc pl-5">
                                    {Array.isArray(ticketDetails.ve_dats) && ticketDetails.ve_dats.length > 0 ? (
                                        ticketDetails.ve_dats.map((ve, index) => (
                                            <li key={index}>
                                                Ghế: {ve?.ghe_ngoi?.so_ghe || "Không xác định"}, 
                                                Loại vé: {ve?.loai_ve?.ten_loai_ve || "Không xác định"}, 
                                                Giá: {ve?.gia_tien || 0} VND
                                            </li>
                                        ))
                                    ) : (
                                        <p>Không có thông tin ghế</p>
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold">Dịch vụ ăn uống</h3>
                                <ul className="list-disc pl-5">
                                    {Array.isArray(ticketDetails.chi_tiet_dvs) && ticketDetails.chi_tiet_dvs.length > 0 ? (
                                        ticketDetails.chi_tiet_dvs.map((dv, index) => (
                                            <li key={index}>
                                                {dv?.dv_an_uong?.ten_dv_an_uong || "Dịch vụ không xác định"} (x{dv?.so_luong || 0}): {dv?.tong_gia_tien || 0} VND
                                            </li>
                                        ))
                                    ) : (
                                        <p>Không có dịch vụ ăn uống</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={closeModal}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}

            <div className="flex justify-center items-center mt-4 space-x-2">
                <button
                    className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    ◀
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`px-3 py-1 rounded ${
                            currentPage === index + 1
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-black"
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    ▶
                </button>
            </div>
        </div>
    );
};

export default ManageTickets;