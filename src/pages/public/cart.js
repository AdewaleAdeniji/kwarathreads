/* eslint-disable jsx-a11y/alt-text */
import CartItem from "../../components/simple/cartItem";
import Footer from "../../components/simple/footer";
import NavBar from "../../components/simple/nav";
import { cartService } from "../../services/cartService";
import { useEffect, useState } from "react";
import utils from "../../utils";
import { cacheService } from "../../services/cacheService";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import userService from "../../services/userService";

const CartsPage = () => {
  const history = useHistory();
  const loggedin = cacheService.getItem("kwUser");
  const isSubUser = loggedin ? loggedin.userType === "SUB_RETAILER" : false;
  const { cart } = cartService.getUserCart();
  var [orderStruct, setOrder] = useState(
    cart.map((c) => {
      return {
        id: c.productId,
        price: c.productAmount,
        count: 1,
        orderDetails: c,
      };
    })
  );
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    var total = 0;
    orderStruct.forEach((order) => {
      total = total + order.count * order.price;
    });
    setTotalAmount(total);
  }, [orderStruct]);
  const handleItemCount = (index, count) => {
    orderStruct[index] = { ...orderStruct[index], count: count };
    setOrder(orderStruct);
    var total = 0;
    orderStruct.forEach((order) => {
      total = total + order.count * order.price;
    });
    setTotalAmount(total);
  };

  const checkOut = async () => {
    if (!loggedin) {
      utils.say("Please login or signup to complete your order");
      return history.push("/auth/login?next=/cart");
    }
    if (!isSubUser) {
      //send sms to parent of the user
    }

    const { value: address } = await Swal.fire({
      title: "Enter your address",
      input: "text",
      inputLabel: "Your delivery address",
      inputPlaceholder: "Enter your delivery address",
      confirmButtonText: "Proceed ",
    });

    if (address) {
      utils.loading("Making your order!");
      userService
        .makeOrder(orderStruct, address)
        .then((t) => t.json())
        .then((v) => {
          utils.makeResponse(v);
          utils.success("Order placed Successfully!");
          cartService.removeItems();
          window.location.reload();
        });
    }
  };
  return (
    <>
      <NavBar />
      <div className="h-full mt-10 bg-gray-300">
        <div className="py-12">
          <div className=" mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl">
            <div className="md:flex ">
              <div className="w-full p-4 px-5 py-5">
                <div className="md:grid md:grid-cols-3 gap-2 ">
                  <div className="col-span-2 p-5">
                    <h1 className="text-xl font-medium ">Shopping Cart</h1>
                    {cart.length === 0 &&
                      "Your cart is empty at the moment, You can add products to your cart on the market place"}
                    {cart.map((c, index) => {
                      return (
                        <CartItem
                          cart={c}
                          index={index}
                          key={index}
                          updateItem={handleItemCount}
                        />
                      );
                    })}
                  </div>
                  <div className=" p-5 bg-gray-800 rounded overflow-visible">
                    <span className="text-xl font-medium text-gray-100 block pb-3">
                      Cart Summary
                    </span>
                    <div className="flex justify-center flex-col pt-3">
                      <label className="text-xs text-gray-400 ">
                        Total Amount
                      </label>
                      <div className="text-white">
                        {utils.displayMoney(totalAmount)}
                      </div>
                    </div>
                    <div className="flex justify-center flex-col pt-3">
                      <label className="text-xs text-gray-400 ">
                        Total Items
                      </label>
                      <div className="text-white">{cart.length}</div>
                    </div>
                    <button
                      className="h-12 mt-16 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600"
                      onClick={checkOut}
                    >
                      {isSubUser ? "Send Order for Approval" : "Check Out"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default CartsPage;
