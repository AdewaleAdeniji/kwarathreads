/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../../components/simple/nav";
import Footer from "../../components/simple/footer";
import HeroSection from "../../components/simple/hero";
import Products from "../../components/multi/products";
import { useEffect, useState } from "react";
import { productService } from "../../requests";
import utils from "../../utils";
import useQueryParam from "../../hooks/useQueryParams";
import ContainerLoader from "../../components/simple/containerLoader";
import userService from "../../services/userService";
import CustomProduct from "../../components/simple/customProduct";

const PublicPage = () => {
  const [products, setProducts] = useState([]);
  const [isFiltered, setIsFiltered] = useQueryParam("filter", "");
  const [loading, setLoading] = useState(false);
  const isLoggedIn = userService.getUserProfile();

  const getProducts = () => {
    setLoading(true);
    productService
      .getAllProducts()
      .then((d) => d.json())
      .then((r) => {
        setLoading(false);
        utils.makeResponse(r);
        setProducts(r?.response?.data || []);
      })
      .catch((e) => utils.informError("Failed to get Products"));
  };
  const getFilterProducts = (payload) => {
    setLoading(true);
    productService
      .filterProducts(payload)
      .then((d) => d.json())
      .then((r) => {
        setLoading(false);
        utils.makeResponse(r);
        setProducts(r?.response?.data || []);
      })
      .catch((e) => utils.informError("Failed to get Products"));
  };

  const handleFilter = (val) => {
    setIsFiltered(val);
    if (val === "") {
      return getProducts();
    }
    return getFilterProducts({
      searchTerm: val,
    });
  };
  useEffect(() => {
    isFiltered !== "" ? handleFilter(isFiltered) : getProducts();
  }, []);
  console.log(isLoggedIn);
  return (
    <>
      <NavBar />
      <HeroSection handleFilter={handleFilter} isLoggedIn={isLoggedIn} />

      {isFiltered && (
        <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Showing results for {isFiltered}{" "}
          <button
            class="bg-blue-100 border-green-400 text-brand text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded bg-transparent border h-8 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              class="w-3 h-3 mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            Remove Filter
          </button>
        </p>
      )}
      {loading && (
        <div className="max-w-lg px-4 pt-12 mx-auto md:max-w-screen-2xl md:px-6 xl:px-8 2xl:px-12 text-center">
          Getting Products tailored for you....
          <ContainerLoader />
        </div>
      )}
      {isLoggedIn && (
        <div className="max-w-lg px-4 pt-12 mx-auto md:max-w-screen-2xl md:px-6 xl:px-8 2xl:px-12 text-left">
          <div
            class="p-4 bg-800 rounded-lg md:p-8 dark:bg-gray-800 image.png border-gray-200 rounded-lg shadow"
            id="statistics"
            role="tabpanel"
            aria-labelledby="statistics-tab "
          >
            <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
              <div class="flex flex-col">
                <dt class="mb-2 text-3xl font-extrabold">{utils.displayMoney(parseFloat(isLoggedIn.user.balance))}</dt>
                <dd class="font-light text-gray-500 dark:text-gray-400">
                  Wallet Balance
                </dd>
                <button className="inline-flex w-48 items-center h-10 px-4 py-2 mt-3 text-sm text-white transition duration-300 ease-in-out rounded-full outline-none right-1 top-1 bg-cool-indigo-600 md:px-6 sm:font-medium hover:bg-cool-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cool-indigo-500">
                    Fund My Wallet
                </button>
              </div>
              <div class="flex flex-col">
                <dt class="mb-2 text-3xl font-extrabold">{isLoggedIn.orders.length}</dt>
                <dd class="font-light text-gray-500 dark:text-gray-400">
                  Orders
                </dd>
              </div>
              <div class="flex flex-col">
                <dt class="mb-2 text-3xl font-extrabold">{isLoggedIn.transactions.length}</dt>
                <dd class="font-light text-gray-500 dark:text-gray-400">
                  Transactions
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      <div className="max-w-lg px-4 pt-12 mx-auto md:max-w-screen-2xl md:px-6 xl:px-8 2xl:px-12">
        {products.length === 0 && !loading && (
          <div className="text-center w-full">
            We're sorry, but the product you're looking for is currently
            unavailable. We are constantly updating our inventory, so please
            check back soon or contact us for more information.
          </div>
        )}
        <Products products={products} />
      </div>
      <Footer />
    </>
  );
};
export default PublicPage;
