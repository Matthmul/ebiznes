import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import Navbar from './components/Navbar';
import Payment from './components/Payment';
import Cart from './components/Cart';
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import { ProductListContextProvider } from "./context/productListContext";
import { CartContextProvider } from "./context/cartContext";
import Login from './components/Login';
import Logout from './components/Logout';
import { useCookies } from 'react-cookie';
import Product from './components/Product';
import LoginOrGuest from './components/LoginOrGuest';
import OrderHistory from './components/OrderHistory';

function App() {
  const [cookies] = useCookies(['username']);
  const [isLoggedIn, setIsLoggedIn] = useState(cookies.username);

  return (
    <ProductListContextProvider>
      <CartContextProvider>
        <Router>
          <Navbar {...{ isLoggedIn }} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart {...{ isLoggedIn }} />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/login" element={<Login {...{ isLoggedIn, setIsLoggedIn }} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/product" element={<Product />} />
            <Route path="/loginOrGuest" element={<LoginOrGuest />} />
            <Route path="/orderHistory" element={<OrderHistory />} />
            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Router>
      </CartContextProvider>
    </ProductListContextProvider>

  );
}

export default App;
