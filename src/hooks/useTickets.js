import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

function useTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);

  const fetchTickets = async (retryCount = 0, maxRetries = 3) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Gửi yêu cầu đến: /api/admin/datve");
      const response = await apiClient.get("/api/admin/datve");
      console.log("Phản hồi API:", response.data);
      let fetchedTickets = [];
      if (Array.isArray(response.data)) {
        fetchedTickets = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        fetchedTickets = response.data.data;
      } else {
        throw new Error(
          "Dữ liệu API không đúng định dạng: không phải mảng vé."
        );
      }

      // Đảm bảo ve_dats và chi_tiet_dvs luôn là mảng, kiểm tra dữ liệu quan hệ
      fetchedTickets = fetchedTickets.map((ticket) => {
        if (!Array.isArray(ticket.ve_dats) && ticket.tong_so_ve > 0) {
          console.warn(
            `Vé ${ticket.ma_ve} có tong_so_ve=${ticket.tong_so_ve} nhưng thiếu ve_dats.`
          );
        }
        if (
          Array.isArray(ticket.chi_tiet_dvs) &&
          ticket.chi_tiet_dvs.length > 0
        ) {
          ticket.chi_tiet_dvs.forEach((dv, index) => {
            if (!dv.dv_an_uong) {
              console.warn(
                `Vé ${ticket.ma_ve} có chi_tiet_dvs[${index}] nhưng thiếu dv_an_uong.`
              );
            }
          });
        }
        return {
          ...ticket,
          ve_dats: Array.isArray(ticket.ve_dats) ? ticket.ve_dats : [],
          chi_tiet_dvs: Array.isArray(ticket.chi_tiet_dvs)
            ? ticket.chi_tiet_dvs
            : [],
        };
      });

      setTickets(fetchedTickets);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách vé:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        config: err.config,
      });

      let errorMessage = "Không thể tải danh sách vé. Vui lòng thử lại sau.";
      if (err.response) {
        switch (err.response.status) {
          case 401:
            errorMessage = "Không được phép truy cập. Vui lòng đăng nhập lại.";
            break;
          case 403:
            errorMessage = "Bạn không có quyền truy cập danh sách vé.";
            break;
          case 404:
            errorMessage = "Không tìm thấy endpoint API.";
            break;
          case 500:
            errorMessage = "Lỗi server (500). Vui lòng thử lại sau.";
            break;
          case 503:
            errorMessage =
              "Dịch vụ tạm thời không khả dụng (503). Vui lòng thử lại sau vài phút.";
            if (retryCount < maxRetries) {
              console.log(`Thử lại lần ${retryCount + 1}/${maxRetries}...`);
              setTimeout(() => fetchTickets(retryCount + 1, maxRetries), 2000);
              return;
            }
            break;
          default:
            errorMessage = `Lỗi ${err.response?.status || "Không xác định"}: ${
              err.response?.data?.message || err.message
            }`;
        }
      } else if (err.request) {
        errorMessage =
          "Không thể kết nối đến server. Kiểm tra mạng hoặc server.";
        if (retryCount < maxRetries) {
          console.log(`Thử lại lần ${retryCount + 1}/${maxRetries}...`);
          setTimeout(() => fetchTickets(retryCount + 1, maxRetries), 2000);
          return;
        }
      }
      setError(errorMessage);
      toast.error(errorMessage);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const getTicketDetails = async (ma_ve, retryCount = 0, maxRetries = 3) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Gửi yêu cầu chi tiết vé: /api/admin/datve/${ma_ve}`);
      const response = await apiClient.get(`/api/admin/datve/${ma_ve}`);
      console.log("Phản hồi chi tiết vé:", response.data);

      // Kiểm tra dữ liệu quan hệ
      const ticketData = response.data;
      if (!Array.isArray(ticketData.ve_dats) && ticketData.tong_so_ve > 0) {
        console.warn(
          `Vé ${ticketData.ma_ve} có tong_so_ve=${ticketData.tong_so_ve} nhưng thiếu ve_dats.`
        );
      }
      if (
        Array.isArray(ticketData.chi_tiet_dvs) &&
        ticketData.chi_tiet_dvs.length > 0
      ) {
        ticketData.chi_tiet_dvs.forEach((dv, index) => {
          if (!dv.dv_an_uong) {
            console.warn(
              `Vé ${ticketData.ma_ve} có chi_tiet_dvs[${index}] nhưng thiếu dv_an_uong.`
            );
          }
        });
      }

      setTicketDetails({
        ...ticketData,
        ve_dats: Array.isArray(ticketData.ve_dats) ? ticketData.ve_dats : [],
        chi_tiet_dvs: Array.isArray(ticketData.chi_tiet_dvs)
          ? ticketData.chi_tiet_dvs
          : [],
      });
      toast.success(`Đã tải chi tiết vé ${ma_ve}`);
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết vé:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      let errorMessage = `Không thể tải chi tiết vé ${ma_ve}.`;
      if (err.response) {
        switch (err.response.status) {
          case 401:
            errorMessage = "Không được phép truy cập. Vui lòng đăng nhập lại.";
            break;
          case 403:
            errorMessage = "Bạn không có quyền truy cập chi tiết vé.";
            break;
          case 404:
            errorMessage = "Không tìm thấy vé.";
            break;
          case 500:
            errorMessage = "Lỗi server (500). Vui lòng thử lại sau.";
            break;
          case 503:
            errorMessage =
              "Dịch vụ tạm thời không khả dụng (503). Vui lòng thử lại sau vài phút.";
            if (retryCount < maxRetries) {
              console.log(`Thử lại lần ${retryCount + 1}/${maxRetries}...`);
              setTimeout(
                () => getTicketDetails(ma_ve, retryCount + 1, maxRetries),
                2000
              );
              return;
            }
            break;
          default:
            errorMessage = `Lỗi ${err.response?.status || "Không xác định"}: ${
              err.response?.data?.message || err.message
            }`;
        }
      }
      setError(errorMessage);
      toast.error(errorMessage);
      setTicketDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const cancelTicket = async (ma_ve, retryCount = 0, maxRetries = 3) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Hủy vé: ${ma_ve}`);
      const response = await apiClient.put(`/api/admin/cancel/${ma_ve}`, null);
      console.log("Phản hồi hủy vé:", response.data);
      setTickets(
        tickets.map((ticket) =>
          ticket.ma_ve === ma_ve ? { ...ticket, trang_thai: "Đã hủy" } : ticket
        )
      );
      toast.success(`Hủy vé ${ma_ve} thành công! Trạng thái: Đã hủy`);
    } catch (err) {
      console.error("Lỗi khi hủy vé:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      let errorMessage = `Lỗi khi hủy vé ${ma_ve}: ${
        err.response?.data?.message || err.message
      }`;
      if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage = "Yêu cầu không hợp lệ. Vui lòng kiểm tra lại.";
            break;
          case 401:
            errorMessage = "Không được phép truy cập. Vui lòng đăng nhập lại.";
            break;
          case 403:
            errorMessage = "Bạn không có quyền hủy vé.";
            break;
          case 404:
            errorMessage = "Không tìm thấy vé.";
            break;
          case 500:
            errorMessage = "Lỗi server (500). Vui lòng thử lại sau.";
            break;
          case 503:
            errorMessage =
              "Dịch vụ tạm thời không khả dụng (503). Vui lòng thử lại sau vài phút.";
            if (retryCount < maxRetries) {
              console.log(`Thử lại lần ${retryCount + 1}/${maxRetries}...`);
              setTimeout(
                () => cancelTicket(ma_ve, retryCount + 1, maxRetries),
                2000
              );
              return;
            }
            break;
          default:
            errorMessage = `Lỗi ${err.response?.status || "Không xác định"}: ${
              err.response?.data?.message || err.message
            }`;
        }
      }
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteTicket = async (ma_ve, retryCount = 0, maxRetries = 3) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Xóa vé: ${ma_ve}`);
      const response = await apiClient.delete(`/api/admin/datve/${ma_ve}`);
      console.log("Phản hồi xóa vé:", response.data);
      setTickets(tickets.filter((ticket) => ticket.ma_ve !== ma_ve));
      toast.success(`Xóa vé ${ma_ve} thành công!`);
    } catch (err) {
      console.error("Lỗi khi xóa vé:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      let errorMessage = `Lỗi khi xóa vé ${ma_ve}: ${
        err.response?.data?.message || err.message
      }`;
      if (err.response) {
        switch (err.response.status) {
          case 401:
            errorMessage = "Không được phép truy cập. Vui lòng đăng nhập lại.";
            break;
          case 403:
            errorMessage = "Bạn không có quyền xóa vé.";
            break;
          case 404:
            errorMessage = "Không tìm thấy vé.";
            break;
          case 500:
            errorMessage = "Lỗi server (500). Vui lòng thử lại sau.";
            break;
          case 503:
            errorMessage =
              "Dịch vụ tạm thời không khả dụng (503). Vui lòng thử lại sau vài phút.";
            if (retryCount < maxRetries) {
              console.log(`Thử lại lần ${retryCount + 1}/${maxRetries}...`);
              setTimeout(
                () => deleteTicket(ma_ve, retryCount + 1, maxRetries),
                2000
              );
              return;
            }
            break;
          default:
            errorMessage = `Lỗi ${err.response?.status || "Không xác định"}: ${
              err.response?.data?.message || err.message
            }`;
        }
      }
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return {
    tickets,
    loading,
    error,
    ticketDetails,
    fetchTickets,
    getTicketDetails,
    cancelTicket,
    deleteTicket,
  };
}

export default useTickets;
