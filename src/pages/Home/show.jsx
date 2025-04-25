import { useParams } from "react-router-dom";
import { useState } from "react";

import { PlayCircle, Ticket } from "lucide-react";
import TicketBooking from "../../component/TicketBooking";

import { useGetChiTietPhimUS } from "../../api/homepage";
import { imagePhim } from "../../Utilities/common";
import { motion } from "framer-motion";
const ShowDetail = () => {
  const { ma_phim } = useParams();

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const { data: Phim } = useGetChiTietPhimUS(ma_phim);
  if (!Phim) return <p>Không có dữ liệu phim.</p>;
  return (
    <div className="container mx-auto px-4 py-6 bg-[#FDF7E5]">
      <div className="max-w-6xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2">
          Nội Dung Phim
        </h2>

        <div className="flex flex-col md:flex-row mt-4">
          <div className="md:w-1/4 w-full flex justify-center">
            <img
              className="w-full md:w-[250px] h-auto rounded-md shadow-md"
              src={`${imagePhim}${Phim.anh}`}
              alt={Phim.ten_phim}
            />
          </div>

          <div className="md:w-3/4 w-full md:pl-6 mt-4 md:mt-0">
            <h3 className="text-2xl font-bold">{Phim.ten_phim}</h3>
            <p className="text-gray-600 text-sm mt-2">
              <span className="font-bold">Độ tuổi: </span>
              {Phim.do_tuoi}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              <span className="font-bold">Hình thức chiếu: </span>
              {Phim.hinh_thuc_chieu}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              <span className="font-bold">Đạo diễn: </span>
              {Phim.dao_dien}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              <span className="font-bold">Diễn viên: </span>
              {Phim.dien_vien}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">
                Thể loại: {Phim.the_loai?.join(", ")}{" "}
              </span>
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">
                Ngày phát hành:{" "}
                {new Date(Phim.ngay_phat_hanh).toLocaleDateString("vi-VN")}
              </span>{" "}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Thời lượng:</span> {Phim.thoi_luong}{" "}
              phút
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">Quốc gia: {Phim.quoc_gia}</span>{" "}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setIsBookingOpen(!isBookingOpen)}
                className="bg-red-600 text-white flex items-center px-4 py-2 rounded-md font-bold hover:bg-red-700"
              >
                <Ticket className="mr-2" size={18} /> MUA VÉ
              </button>
            </div>
          </div>
        </div>

        {/* Mô tả phim */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 bg-gray-100 rounded-md"
        >
          <h3 className="text-xl font-bold mb-2 text-gray-800">Mô tả phim</h3>
          <p className="text-gray-700 leading-relaxed">{Phim.mo_ta}</p>
        </motion.div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isBookingOpen ? "auto" : 0,
            opacity: isBookingOpen ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden mt-6"
        >
          {isBookingOpen && <TicketBooking />}
        </motion.div>
      </div>
    </div>
  );
};

export default ShowDetail;
