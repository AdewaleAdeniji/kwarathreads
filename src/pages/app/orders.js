/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import NavBar from "../../components/simple/nav";
import Footer from "../../components/simple/footer";
import userService from "../../services/userService";
import { useHistory } from "react-router-dom";
import Order from "../../components/simple/order";

const Orders = () => {

  const u = userService.getUserProfile();
  const history = useHistory();
  if(!u){
    return history.pushState('/auth/login');
  }
  console.log(u.orders);
  const { orders  } = u;
  return (
    <>
      <NavBar />
      <div className="h-full mt-10 bg-gray-300">
        <div className="py-12">
          <div className=" mx-auto bg-white shadow-lg rounded-lg  md:max-w-5xl w-1/2 mobile-w-full">
            <div className="md:flex">
              <div className="w-full w-full	 p-4 px-5 py-5">
                <div className="w-full p-4 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                      KwaraThread Orders
                    </h5>
                    {/* <a
                      href="#"
                      className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      View all
                    </a> */}
                  </div>
                  <div className="flow-root">
                    <ul
                      role="list"
                      className="divide-y divide-gray-200 dark:divide-gray-700"
                    >
                      {
                        orders.map((order) => {
                            return <Order order={order} />
                        })
                      }
                    </ul>
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

export default Orders;
