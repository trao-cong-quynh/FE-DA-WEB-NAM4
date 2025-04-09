import axios from "../axios";

const END_POINT = {
  PHIM: "phim",
  CHITIETPHIM: "suatchieu/phim",
  LOAIVE: "loaive",
  DSGHE: "phong/dsghe",
  RAP: "rap",
  PHONG: "phong",
  BOOKING: "ve",
  DVANUONG: "dichvuanuong",
};

export const getPhimAPI = async () => {
  return await axios({
    url: END_POINT.PHIM,
    method: "GET",
  });
};

export const getChiTietPhimAPI = async (ma_phim) => {
  return await axios({
    url: `${END_POINT.PHIM}/${ma_phim}`,
    method: "GET",
  });
};

export const getLoaiVeAPI = async () => {
  return await axios({
    url: END_POINT.LOAIVE,
    method: "GET",
  });
};

export const getRapSCAPI = async (ma_phim) => {
  return await axios({
    url: `${END_POINT.CHITIETPHIM}/${ma_phim}`,
    method: "GET",
  });
};

export const getDSGHEAPI = async (ma_phong) => {
  return await axios({
    url: `${END_POINT.DSGHE}/${ma_phong}`,
    method: "GET",
  });
};

export const getRapAPI = async (ma_rap) => {
  return await axios({
    url: `${END_POINT.RAP}/${ma_rap}`,
    method: "GET",
  });
};

export const getPhongAPI = async (ma_phong) => {
  return await axios({
    url: `${END_POINT.PHONG}/${ma_phong}`,
    method: "GET",
  });
};
export const postBooKingAPI = async (bookingData) => {
  return await axios({
    url: END_POINT.BOOKING,
    method: "POST",
    data: bookingData,
  });
};

export const getDVAnUongAPI = async () => {
  return await axios({
    url: END_POINT.DVANUONG,
    method: "GET",
  });
};
