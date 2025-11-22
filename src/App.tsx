// import { useState } from 'react'
import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const Detail = lazy(() => import("./pages/DetailPage"));
const Products = lazy(() => import("./pages/FilterPage"));
const Authentication = lazy(() => import("./pages/Authentication"));
const Verify = lazy(() => import("./pages/VerifyOtp"));
const Recipe = lazy(() => import("./pages/RecipePage"));
const Cart = lazy(() => import("./pages/Cart"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const Account = lazy(() => import("./pages/Account"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
