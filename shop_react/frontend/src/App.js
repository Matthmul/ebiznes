import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Payment from './components/Payment';
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import NoPage from "./pages/NoPage";
import { ProductListContextProvider } from "./context/productListContext";
import { CartContextProvider } from "./context/cartContext";
import { PaymentContextProvider } from "./context/paymentContext";

function App() {
  return (
    <ProductListContextProvider>
      <CartContextProvider>
        <PaymentContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/payment" element={<Payment />} />
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
