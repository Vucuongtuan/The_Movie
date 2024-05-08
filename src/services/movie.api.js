import axios from 'axios';
import http from '../utils/http';
export const BASE_IMAGE_URL = 'https://img.ophim16.cc/uploads/movies/';
export const BASE_IMAGE_URL_2 = 'https://img.ophim1.com/uploads/movies/';
export const BASE_IMAGE_URL_3 = 'https://img.ophim.live/uploads/movies/';
export const getMovie = async (page, country, year, type, category) => {
  const res = await http.get(
    `/v1/api/danh-sach/${
      type || 'phim-moi'
    }?sort_field=modified.time&category=${category || ''}&country=${
      country || ''
    }&year=${year || ''}&page=${page}`,
  );
  return res.data;
};
export const getType = async (page, country, year, type, option) => {
  const res = await http.get(
    `/v1/api/${option}/${type}?sort_field=modified.time&category=&country=${
      country || ''
    }&year=${year || ''}&page=${page}`,
  );
  return res.data;
};

export const getMovieBySlug = async (slug) => {
  const res = await http.get(`/phim/${slug}`);
  return res;
};
export const getMovieByYear = async (year, page) => {
  const res = await http.get(
    `/v1/api/danh-sach/phim-moi?sort_field=modified.time&category=&country=&year=${year}&page=${page}`,
  );
  return res.data;
};
export const getDetailMovie = async (slug) => {
  const res = await axios.get(`https://ophim1.com/v1/api/phim/${slug}`);
  return res;
};
export const getDetailMovie1 = async (slug) => {
  const res = await axios.get(`https://ophim1.com/phim/${slug}`);
  return res;
};
export const getListOptionTheLoai = async () => {
  const res = await axios.get(`https://ophim1.com/v1/api/the-loai`);

  return res;
};
export const getListOptionNation = async () => {
  const res = await axios.get(`https://ophim1.com/v1/api/quoc-gia`);

  return res;
};
export const getMovieSearch = async (keyword) => {
  const res = await axios.get(
    `https://ophim1.com/v1/api/tim-kiem?keyword=${keyword}&page=1`,
  );

  return res;
};
