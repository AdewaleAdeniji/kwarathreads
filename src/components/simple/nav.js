import { useEffect, useState } from "react";
import { BiCartAlt, BiSearch, BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import useQueryParam from "../../hooks/useQueryParams";
import { cartService } from "../../services/cartService";
import userService from "../../services/userService";
const NavBar = () => {
  const [query, setQuery] = useQueryParam("filter", "");
  const [cartCount, setCartCount] = useState(0);
  const user = userService.getUserProfile();
  useEffect(() => {
    window.setInterval(() => {
      var { cart } = cartService.getUserCart();
      setCartCount(cart.length);
    }, 2000);
  });

  return (
    <nav className="backdrop-filter backdrop-blur-xl border-b border-slate-900/5 z-10 bg-gray-50/90 fixed top-0 w-full">
      <div className="px-2 mx-auto max-w-screen-2xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16 md:h-18">
          <div className="flex px-2 lg:px-0">
            <div className="flex items-center flex-shrink-0">
              <Link
                className="inline-flex items-center font-black font-display text-cool-indigo-800 text-xl"
                to="/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="375pt"
                  height="374.999991pt"
                  viewBox="0 0 375 374.999991"
                  version="1.2"
                  className="w-auto h-10 sm:h-9 md:h-10 xl:h-8 h-10 sm:h-9 w-auto md:h-10 xl:h-8"
                >
                  <defs>
                    <clipPath id="clip1">
                      <path d="M 0.425781 0 L 316.175781 0 L 316.175781 315.75 L 0.425781 315.75 Z M 0.425781 0 " />
                    </clipPath>
                    <clipPath id="clip2">
                      <path d="M 59.164062 59.589844 L 374.914062 59.589844 L 374.914062 375 L 59.164062 375 Z M 59.164062 59.589844 " />
                    </clipPath>
                  </defs>
                  <g id="surface1">
                    <g clipPath="url(#clip1)" clipRule="nonzero">
                      <path
                        className="text-cool-indigo-700 group-hover:text-cool-indigo-500"
                        style={{
                          stroke: "none",
                          fillRule: "nonzero",
                          fill: "currentColor",
                          fillOpacity: 1,
                        }}
                        d="M 79.363281 0 L 237.238281 0 C 280.839844 0 316.175781 35.335938 316.175781 78.9375 L 316.175781 236.8125 C 316.175781 280.414062 280.839844 315.75 237.238281 315.75 L 79.363281 315.75 C 35.761719 315.75 0.425781 280.414062 0.425781 236.8125 L 0.425781 78.9375 C 0.425781 35.335938 35.761719 0 79.363281 0 Z M 79.363281 0 "
                      />
                    </g>
                    <g clipPath="url(#clip2)" clipRule="nonzero">
                      <path
                        className="text-cool-indigo-500 group-hover:text-cool-indigo-700"
                        style={{
                          stroke: "none",
                          fillRule: "nonzero",
                          fill: "currentColor",
                          fillOpacity: 1,
                        }}
                        d="M 138.101562 59.589844 L 295.976562 59.589844 C 339.578125 59.589844 374.914062 94.929688 374.914062 138.527344 L 374.914062 296.402344 C 374.914062 340.003906 339.578125 375.339844 295.976562 375.339844 L 138.101562 375.339844 C 94.503906 375.339844 59.164062 340.003906 59.164062 296.402344 L 59.164062 138.527344 C 59.164062 94.929688 94.503906 59.589844 138.101562 59.589844 Z M 138.101562 59.589844 "
                      />
                    </g>
                  </g>
                </svg>
                <span className="hidden ml-3 xl:inline-block text-green-500">
                  Kwara
                  <span className="text-teal-600">Threads </span>
                </span>
              </Link>{" "}
            </div>
            <div
              className="hidden lg:ml-6 xl:ml-8 lg:flex lg:space-x-8"
              data-turbo="false"
            >
              {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
              <Link
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                to="/"
              >
                MarketPlace
              </Link>
              {!user && (
                <>
                  <Link
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    to="/auth/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    to="/auth/signup"
                  >
                    Register
                  </Link>
                </>
              )}

              {user && (
                <>
                  <Link
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    to="/app/orders"
                  >
                    Orders
                  </Link>
                  <Link
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    to="/app/transactions"
                  >
                    Transactions
                  </Link>
                  <Link
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    to="/app/custom"
                  >
                    Request Custom Orders
                  </Link>
                  <Link
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    to="/app/orders"
                  >
                    Track Order
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end flex-1 px-2 sm:justify-center lg:ml-6 lg:justify-end">
            <div className="relative hidden w-full h-12 max-w-lg rounded-full sm:block">
              <form
                data-newsletter-target="form"
                action="/"
                acceptCharset="UTF-8"
                method="get"
              >
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  {/* Heroicon name: solid/mail */}
                  <BiSearch />
                </div>
                <input
                  className="w-full pl-10 pr-24 py-3.5 border-0 bg-gray-100 border-transparent rounded-full leading-5 transition duration-150 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cool-indigo-200 focus:border-cool-indigo-200 sm:text-sm"
                  data-newsletter-target="name"
                  required="required"
                  placeholder="Search Products"
                  autoComplete="name"
                  type="name"
                  name="filter"
                  id="filter"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-300 ease-in-out rounded-full outline-none right-1 top-1 bg-cool-indigo-600 md:px-6 sm:font-medium hover:bg-cool-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cool-indigo-500"
                >
                  <BiSearchAlt /> &nbsp; Search
                </button>
              </form>
            </div>
            <Link
              className="ml-3 inline-flex items-center px-1 py-1 text-sm text-white transition duration-300 ease-in-out rounded-full outline-none right-1 top-1 bg-transparent text-brand text-xl hover:bg-brand focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-brand"
              to="/public/cart"
            >
              <BiCartAlt />
              {cartCount !== 0 && (
                <span className="inline-flex items-center justify-center w-4 h-4 ml-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          <div className="flex items-center">
            {/* Mobile menu button */}
            {/* <button
              type="button"
              className="inline-flex items-center justify-center p-2 ml-3 text-gray-400 rounded-full lg:hidden hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cool-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              data-controller="toggle"
              data-toggle-remote="#mobile-menu"
              data-action="click->toggle#toggleRemote"
            >
              <span className="sr-only">Open main menu</span>
              <BiSearchAlt />
            </button> */}
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
    </nav>
  );
};
export default NavBar;
