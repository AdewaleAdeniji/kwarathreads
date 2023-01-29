import { config } from "../config";

export const productService = {};
export const userApiService = {};

productService.getAllProducts = () =>
  fetch(`${config.BASE_URL}/products/`, {
    method: "GET",
  });

productService.filterProducts = (data) =>
  fetch(`${config.BASE_URL}/products/filterProducts`, {
    method: "POST",
    body: JSON.stringify(data),
  });
userApiService.registerRetailer = (payload) =>
  fetch(`${config.BASE_URL}/retailers/register`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  userApiService.loginRetailer = (payload) =>
  fetch(`${config.BASE_URL}/retailers/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
