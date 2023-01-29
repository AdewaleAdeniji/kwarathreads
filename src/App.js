import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React, { Suspense } from "react";
import { routes } from './config/routing';
import ProtectedRoute from "./config/protected";
import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.min.css';
import PublicPage from "./pages/public";
import userService from "./services/userService";

function App() {
  userService.init();
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
        
        <Switch>
        <Route exact path="/" component={PublicPage} />
          {
            routes.map((route) => {
              return (
                route.protected ? <ProtectedRoute /> : <Route exact={true} path={route.path} component={route.component} />
              )
            })
          }
        </Switch>

        </Suspense>
        </Router>
        <ToastContainer
          position="top-center"
          theme="light"
          autoClose={10000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
        />
    </div>
  );
}

export default App;
