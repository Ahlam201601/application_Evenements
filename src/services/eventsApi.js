import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const EventPost = async (eventData) => {
  const response = await axios.post(`${BASE_URL}/events`, eventData);
  return response.data;
};

export const getEvents = () => {
  return axios.get(`${BASE_URL}/events`);
};


export const createEvent = (data) => axios.post(API_URL, data);

export const deleteEvent = (id) => {
  return axios.delete(`${BASE_URL}/events/${id}`);
};

export const updateEvent = (id, data) => {
  return axios.put(`${BASE_URL}/events/${id}`,data);
};