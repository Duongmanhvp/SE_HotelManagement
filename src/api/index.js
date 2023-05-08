import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

// place api
export const getAllPlace = async () => {
  return await axios.get(`${BASE_URL}/rooms`);
};
export const getPlacesByQuery = async (query) => {
  return await axios.get(`${BASE_URL}/rooms`, {
    params: query,
  });
};
export const getPlaceById = async (placeId) => {
  return await axios.get(`${BASE_URL}/rooms/${placeId}`);
};

// auth api
export const login = async (user) => {
  return await axios.post(`${BASE_URL}/auth/login`, user);
};
export const register = async (user) => {
  return await axios.post(`${BASE_URL}/auth/register`, user);
};

// user api
export const getAllCustomer = async () => {
  return await axios.get(`${BASE_URL}/users`);
};

export const getUserById = async (userId) => {
  return await axios.get(`${BASE_URL}/users/${userId}`);
};

// payment api
export const sendPayment = async (payment) => {
  return await axios.post(`${BASE_URL}/payments`, payment);
};
export const getPayment = async (paymentId) => {
  return await axios.get(`${BASE_URL}/payments/${paymentId}`);
};
export const getAllPaymentByUserId = async (userId) => {
  return await axios.get(`${BASE_URL}/${userId}/payments`);
};
export const gettAllPayment = async () => {
  return await axios.get(`${BASE_URL}/payments`);
};

// review api
export const sendReview = async (bookingId, review) => {
  return await axios.post(`${BASE_URL}/reviews/${bookingId}`, review);
};

// statistics api
export const getMainStatistics = async () => {
  return await axios.get(`${BASE_URL}/admin/statistics`);
};
