import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createOrder = async (orderData) => {
  const res = await axios.post(`${BASE_URL}/orders`, orderData);
  return res.data;
};

export const getOrders = () => {
  return axios.get(`${BASE_URL}/orders`);
};