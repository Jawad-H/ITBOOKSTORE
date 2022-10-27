import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequestPage from "./pages/RequestPage";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Result from "./pages/Result";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useSelector } from "react-redux";
import Success from "./pages/Success";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const user = useSelector((state) => state.user?.currentUser);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        theme="dark"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            {!user ? <Login /> : <Home />}
          </Route>
          <Route exact path="/register">
            {!user ? <Register /> : <Home />}
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route path="/requestbook">
            <RequestPage />
          </Route>
          <Route path="/product/:id">
            <SingleProduct />
          </Route>
          <Route path="/result/:name">
            <Result />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
        </Switch>
      </Router>
    </>
    //   // <Home />
    //     {/* <RequestPage /> */ }
    // {/* <Login /> */ }
    // {/* <Register /> */ }
    // {/* <SingleProduct /> */ }
    // {/* <Cart /> */ }
    // {/* <Result /> */ }
  );
}

export default App;
