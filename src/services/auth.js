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
