import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Login from "./pages/Login";
import Verify from './pages/Verify'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import FAQ from "./components/FAQ";
import { ToastContainer } from "react-toastify";
import MyProfile from "./components/MyProfile";


const App = () => {
 

  return (
    <div className="px-2 sm:px-6">
      <Navbar />
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/verify" element={<Verify />} />

        {/* Pass previous path to Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
// 9:37 