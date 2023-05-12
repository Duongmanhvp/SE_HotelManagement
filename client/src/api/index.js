import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

// rooms api
export const getAllPlace = async () => {
  return await axios.get(`${BASE_URL}/rooms`);
};
export const getPlacesByQuery = async (query) => {
  return await axios.get(`${BASE_URL}/rooms`, {
    params: query,
  });
};
export const createRoom = async (room) => {
  const formData = new FormData();
  for (const key in room) {
    formData.append(key, room[key]);
  }
  return await axios.post(`${BASE_URL}/rooms`, formData);
};
export const getPlaceById = async (placeId) => {
  return await axios.get(`${BASE_URL}/rooms/${placeId}`);
};
export const sendReview = async (bookingId, review) => {
  return await axios.post(`${BASE_URL}/rooms/reviews/${bookingId}`, review);
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
export const getAllPaymentByUserId = async (userId) => {
  return await axios.get(`${BASE_URL}/users/${userId}/bookings`);
};
// statistics api
export const getMainStatistics = async () => {
  return await axios.get(`${BASE_URL}/users/admin/statistics`);
};

// payment api
export const sendPayment = async (payment) => {
  return await axios.post(`${BASE_URL}/bookings`, payment);
};
export const getPayment = async (paymentId) => {
  return await axios.get(`${BASE_URL}/bookings/${paymentId}`);
};
export const gettAllPayment = async () => {
  return await axios.get(`${BASE_URL}/bookings`);
};
