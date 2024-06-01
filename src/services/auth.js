import axios from 'axios';
const DOMAIN_BE_URL = 'https://be-tc-phim.onrender.com';
export const createAccount = async (data) => {
  const res = await axios.post(`${DOMAIN_BE_URL}/auth/sign-up`, {
    email: data.email,
    password: data.password,
    otp: data.otp,
    name: data.name,
  });
  return res.response;
};
export const LoginAccount = async (data) => {
  const res = await axios.post(`${DOMAIN_BE_URL}/auth/sign-in`, {
    email: data.email,
    password: data.password,
  });
  return res;
};
export const sendOtp = async (data) => {
  const res = await axios.post(`${DOMAIN_BE_URL}/auth/send-otp`, {
    email: data,
  });
  return res.response;
};
export const getProfile = async (id) => {
  const res = await axios.get(`${DOMAIN_BE_URL}/auth/profile/${id}`);
  return res;
};
export const getListMovies = async (email) => {
  const res = await axios.post(`${DOMAIN_BE_URL}/list`, {
    email,
  });
  return res;
};
export const addListMovies = async (email, movie) => {
  const res = await axios.post(`${DOMAIN_BE_URL}/list/add`, {
    email,
    movie,
  });
  return res;
};
export const deleteListMovies = async (data) => {
  const res = await axios.post(`${DOMAIN_BE_URL}/list/delete`, data);
  return res;
};
export const getHistodyMovies = async (id) => {
  const res = await axios.post(`${DOMAIN_BE_URL}/history/${id}`);
  return res;
};
export const addHistodyMovies = async (idUser, movie) => {
  const res = await axios.post(`${DOMAIN_BE_URL}/history`, {
    idUser,
    movie,
  });
  return res;
};
export const deleteHistodyMovies = async (movie) => {
  const res = await axios.delete(`${DOMAIN_BE_URL}/history`, {
    movie,
  });
  return res;
};
export const commentsMovie = async (data) => {
  const res = await axios.post(`${DOMAIN_BE_URL}/chat/comments`, {
    message: data.message,
    commentId: data.commentId,
    slug: data.slug,
    idUser: data.idUser,
  });
  return res;
};
