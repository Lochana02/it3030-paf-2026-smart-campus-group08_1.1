import axios from "axios";

const API_URL = "http://localhost:8081/api/resources";

export const getResources = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createResource = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateResource = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteResource = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
