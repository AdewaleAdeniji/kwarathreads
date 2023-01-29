import utils from "../../utils";
import React from "react";
import ImageTag from "./ImageTag";

const CartItem = ({ cart, index, updateItem }) => {

  const [itemCount, setItemCount] = React.useState(1);
  const amount = cart.productAmount*itemCount;
    const handleAction = (add) => {
        var count = itemCount;
        if(add) {
            count++;
        }
        else if (count!==1) {
            count--;
        }
        setItemCount(count);
        updateItem(index, count)
    }
    // console.log(utils.displayMoney(amount));
  return (
    <>
      <div className="flex justify-between items-center pt-6 mt-6 border-t mobile-hidden">
        <div className="flex  items-center">
          <ImageTag
            src={cart.productImages[0]}
            width={60}
            className="rounded-full"
            alt="thumg"
          />
          <div className="flex flex-col ml-3 ">
            <span className="text-md font-medium w-auto">
              {cart.productName}
            </span>
            <span className="text-xs font-light text-gray-400">{cart.productType}</span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="pr-8 flex">
            <span className="font-semibold cursor-pointer" onClick={()=>handleAction(false)}>-</span>
            <input
              type="tel"
              value={itemCount}
              onChange={(e) => setItemCount(e.target.value)}
              className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2"
              defaultValue={itemCount}
            />
            <span className="font-semibold cursor-pointer" onClick={()=>handleAction(true)}>+</span>
          </div>
          <div className="pr-8">
            <span className="text-xs font-medium">{utils.displayMoney(amount)}</span>
          </div>
          <div>
            <i className="fa fa-close text-xs font-medium" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-6 mt-6 border-t flex-col lg-hidden">
        <div className="flex items-start">
        <ImageTag
            src={cart.productImages[0]}
            width={60}
            className="rounded-full"
            alt="thumg"
          />
          <div className="flex flex-col ml-3 ">
            <span className="text-md font-medium w-auto">
            {cart.productName}
            </span>
            <span className="text-xs font-light text-gray-400">{cart.productType}</span>
          </div>
        </div>
        <div className="flex justify-center items-center mt-3 w-full space-around">
          <div className="pr-8 flex">
            <span className="font-semibold">-</span>
            <input
              type="text"
              className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2"
              defaultValue={1}
            />
            <span className="font-semibold">+</span>
          </div>
          <div className="pr-8">
            <span className="text-xs font-medium">{utils.displayMoney(cart.productAmount)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;