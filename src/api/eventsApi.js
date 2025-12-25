import axios from 'axios';

const BASE_URL="https://694d3a67ad0f8c8e6e201984.mockapi.io/api/v1"

export const EventPost = async (eventData) => {
  const response = await axios.post(`${BASE_URL}/events`, eventData);
  return response.data;
};

export const getEvents = () => {
  return axios.get(`${BASE_URL}/events`);
};


export const createEvent = (data) => axios.post(API_URL, data);

export const deleteEvent = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const updateEvent = (id, data) => {
  return axios.put(`${BASE_URL}/${id}`, data);
};