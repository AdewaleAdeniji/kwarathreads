import { config } from "../config";
import utils from "../utils";
import { cacheService } from "./cacheService";

const userService = {};

userService.isSubRetailer = () => {
  const isSub = cacheService.getItem("isSub");
  return isSub;
};
userService.init = () => {
  const t = cacheService.getItem("kwUser");
  if (!t) return;
  const bearer = `Bearer ${userService.getToken()}`;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(`${config.BASE_URL}/retailers/profile`, requestOptions)
    .then((d) => d.json())
    .then((r) => {
      const profile = r.response;
      // console.log(profile);
      cacheService.saveItem("kwProfile", profile);
      //  cartService.saveFromApi(profile.cart.cart.length !== 0  ? profile.cart.cart[0].cartItems : 0);
      // cartService.saveFromApi(profile.cart.cart.cartItems, profile.user.phoneNumber)
    });
};
userService.getUserProfile = () => {
  return cacheService.getItem("kwProfile");
};
userService.getParentId = () => {
  return "19";
};
userService.signUserIn = (payload) => {
  return cacheService.saveItem("kwUser", payload);
};
userService.getToken = () => {
  const t = cacheService.getItem("kwUser");
  if (!t) {
    utils.informError("Unauthorized, Please login");
    return (window.location.href = "/auth/login");
  }
  return t.token;
};
userService.makeOrder = (orders, address) => {
  const bearer = `Bearer ${userService.getToken()}`;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    products: orders,
    deliveryAddress: address,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${config.BASE_URL}/products/order`, requestOptions);
};
userService.getProfile = () => {
  const bearer = `Bearer ${userService.getToken()}`;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  return fetch(`${config.BASE_URL}/retailers/profile`, requestOptions);
};
export default userService;
