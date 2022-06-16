import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import Navbar from './components/Navbar';
import Payment from './components/Payment';
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import NoPage from "./pages/NoPage";
import FinalizeOrder from "./pages/FinalizeOrder";
import { ProductListContextProvider } from "./context/productListContext";
import { CartContextProvider } from "./context/cartContext";
import { PaymentContextProvider } from "./context/paymentContext";
import Login from './components/Login';

function App() {
  const [isLoggedIn] = useState(
    document.cookie.split(';').some((item) => item.trim().startsWith('PLAY_SESSION=')));

  return (
    <ProductListContextProvider>
      <CartContextProvider>
        <PaymentContextProvider>
          <Router>
            <Navbar {...{ isLoggedIn }} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/finalOrder" element={<FinalizeOrder />} />
              <Route path="/login" element={<Login />} />
              <Route index element={<Home />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </Router>
        </PaymentContextProvider>
      </CartContextProvider>
    </ProductListContextProvider>

  );
}

export default App;
