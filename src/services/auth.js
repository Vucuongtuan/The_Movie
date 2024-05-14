import axios from 'axios';

export const createAccount = async (data) => {
  const res = await axios.post(`http://localhost:4000/auth/sign-up`, {
    email: data.email,
    password: data.password,
    otp: data.otp,
    name: data.name,
  });
  return res.response;
};
export const LoginAccount = async (data) => {
  const res = await axios.post(`http://localhost:4000/auth/sign-in`, {
    email: data.email,
    password: data.password,
  });
  return res;
};
export const sendOtp = async (data) => {
  const res = await axios.post(`http://localhost:4000/auth/send-otp`, {
    email: data,
  });
  return res.response;
};
export const getProfile = async (id) => {
  const res = await axios.get(`http://localhost:4000/auth/profile/${id}`);
  return res;
};
export const getListMovies = async (id) => {
  const res = await axios.post(`http://localhost:4000/list/${id}`);
  return res;
};
export const addListMovies = async (idUser, movie) => {
  const res = await axios.post(`http://localhost:4000/list`, { idUser, movie });
  return res;
};
export const deleteListMovies = async (movie) => {
  const res = await axios.delete(`http://localhost:4000/list`, { movie });
  return res;
};
export const getHistodyMovies = async (id) => {
  const res = await axios.post(`http://localhost:4000/history/${id}`);
  return res;
};
export const addHistodyMovies = async (idUser, movie) => {
  const res = await axios.post(`http://localhost:4000/history`, {
    idUser,
    movie,
  });
  return res;
};
export const deleteHistodyMovies = async (movie) => {
  const res = await axios.delete(`http://localhost:4000/history`, { movie });
  return res;
};
