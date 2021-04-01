import axios from "axios";
import { BASE_API_URL } from "definitions/config";

axios.defaults.baseURL = BASE_API_URL;

export const getHomeCategories = () =>
  axios.get(`${BASE_API_URL}/home-categories-products`);

export const getProducts = (params = {}) =>
  axios.get(`${BASE_API_URL}/products`, {
    params,
  });

export const getProduct = (id) => axios.get(`${BASE_API_URL}/products/${id}`);

export const getCategory = (id) =>
  axios.get(`${BASE_API_URL}/categories/${id}`);

export const getComments = (params = {}) => {
  return axios.get(`${BASE_API_URL}/comments`, { params });
};

export const comment = (data) => {
  return axios.post(`${BASE_API_URL}/comments`, data);
};

export const order = (data) => {
  return axios.post(`${BASE_API_URL}/order`, data);
};

export const getMenus = () => {
  return axios.get(`${BASE_API_URL}/menus`);
};
