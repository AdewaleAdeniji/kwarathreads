/* eslint-disable jsx-a11y/alt-text */
import NavBar from "../../components/simple/nav";
import Footer from "../../components/simple/footer";
import { Link } from "react-router-dom";
import useQueryParam from "../../hooks/useQueryParams";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import utils from "../../utils";
import { userApiService } from "../../requests";
import ButtonLoader from "../../components/simple/buttonLoader";
import userService from "../../services/userService";
import { cacheService } from "../../services/cacheService";
import { cartService } from "../../services/cartService";

const LoginPage = () => {
    const [next, _] = useQueryParam('next');
    const [payload, setPayload] = useState({
        phoneNumber: "",
        password: "",
        loading: false,
      });

    const history = useHistory();
const handleSubmit = () => {
    if(payload.phoneNumber === "" || payload.phoneNumber.length < 11) return utils.informError('Invalid Phone number');
    if(payload.password === "" || payload.password.length < 5) return utils.informError("Password should be more than 5 characters in length");
    setPayload({...payload, loading: true})
    utils.loading('Logging into your account ....');
    userApiService.loginRetailer(payload)
    .then(r=>r.json())
    .then(async (d) => {
        setPayload({...payload, loading: false})
        utils.makeResponse(d);
        //at this point pass cart
        await userService.signUserIn(d.response);
        userService.getProfile()
        .then(d => d.json())
        .then((r)=> {
            const profile = r.response;
            // console.log(profile);
            cacheService.saveItem('kwProfile', profile);
            cartService.saveFromApi(profile.cart.cart.length !== 0  ? profile.cart.cart[0].cartItems : 0);
           // cartService.saveFromApi(profile.cart.cart.cartItems, profile.user.phoneNumber)
        })
        // await cacheService.
        await cacheService.saveItem('kwPhone', d.response.user.phoneNumber);
        // await cartService.swapUserCart(d.response.user.phoneNumber);
        
        utils.dismiss();
        utils.success('Login successful...');
        if(next){
            history.push(next);
        }
        history.push('/');
        // cartService.saveUserCart()
    })

}
  return (
    <>
      <NavBar />
      <div className="h-full mt-10 bg-gray-300">
        <div className="py-12">
          <div className=" mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-5xl w-1/2 mobile-w-full">
            <div className="md:flex">
              <div className="w-full w-9/12	 p-4 px-5 py-5">
                <form>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="08107034555"
                      onChange={(e) =>
                        setPayload({ ...payload, phoneNumber: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      id="password"
                      onChange={(e) =>
                        setPayload({ ...payload, password: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="flex items-start mb-6">
                    Don't have an account?&nbsp; <Link to={`/auth/signup?next=${next}`} className="text-brand"> {" "} Create account</Link>
                  </div>
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={payload.loading}
                    onClick={handleSubmit}
                    >
                      {payload.loading ? <ButtonLoader /> : 'Login'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default LoginPage;
