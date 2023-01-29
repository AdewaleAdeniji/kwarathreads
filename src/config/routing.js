import Orders from "../pages/app/orders";
import Transactions from "../pages/app/transactions";
import LoginPage from "../pages/auth/login";
import SignupPage from "../pages/auth/signup";
import CartsPage from "../pages/public/cart";

export const routes = [
    {
        "path": "/public/cart",
        "component": CartsPage,
        protected: false
    },
    {
        "path": "/auth/login",
        "component": LoginPage,
        protected: false
    },
    {
        "path": "/auth/signup",
        "component": SignupPage,
        protected: false
    },
    {
        "path": "/app/orders",
        "component": Orders,
        protected: false
    },
    {
        "path": "/app/transactions",
        "component": Transactions,
        protected: false
    },



]