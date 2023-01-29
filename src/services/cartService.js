//cart service
import { config } from "../config";
import utils from "../utils";
import { cacheService } from "./cacheService"
import userService from "./userService";
const getCart = () => {
    const savedCart = cacheService.getItem('kwCart');
    if(!savedCart){

    }
}
const getUserCart = () => {
    const savedCart = cacheService.getItem('kwCart');
    if(!savedCart){
        return {cart: [], key: retrieveUserPhone() };
    }
    else {
        return savedCart;
    }
}
const saveUserCart = (newProduct) => {
    const c = getUserCart()
    console.log(c);
    const currentCart = c.cart || [];
    const ids = currentCart.map((r) => r.productId);
    if(ids.indexOf(newProduct.productId) > -1){
       utils.informError('This item have already been added to cart');
       return false;
    }
    currentCart.push(newProduct);
    const cart = { cart: currentCart, key: c.key };
    //save to local 
    //push to backend

    storeCart(c.key, [newProduct]);
    cacheService.saveItem('kwCart', cart);
    return true;
}   
const saveFromApi = (cart, key) => {
    const cartd = { cart: cart, key: key };
    cacheService.saveItem('kwCart', cartd);
    return true;
}   
const swapUserCart = (key) => {
    const c = getUserCart()
    const currentCart = c.cart || [];
   
    const cart = { cart: currentCart, key: key };
    //save to local 
    //push to backend

    storeCart(key, [cart.cart]);
    cacheService.saveItem('kwCart', cart);
    return true;
}  
const storeCart = (key, cart) => {
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "idKey": key,
  "cartItems": cart,
  "cartType": userService.isSubRetailer() ? "SUB_USER" : "GUEST",
  "cartSubUser": userService.isSubRetailer() ? userService.getParentId() : ""
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${config.BASE_URL}/cart/add`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
const retrieveUserPhone = () => {
    var phone = cacheService.getItem('kwPhone');
    if(!phone){
        phone = utils.generateString(8);
    }
    //console.log(phone);
    return phone;
}
const removeItems = () => {
    localStorage.removeItem('kwCart');
}
const cartCount = () => {

}
export const cartService = { getCart, getUserCart, saveUserCart, retrieveUserPhone, cartCount, swapUserCart, removeItems, saveFromApi}