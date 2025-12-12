import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
const RecipeDetail = lazy(() => import("./pages/RecipeDetailPage"));
const OrderConfirm = lazy(() => import("./pages/OrderConfirm"));
const ReturnAndRefund = lazy(() => import("./pages/ReturnAndRefund"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <GoogleOAuthProvider
          clientId={
            "933629412968-6ap8h0f5repil5akr2reubfnl5qmbt3m.apps.googleusercontent.com"
          }
        >
          <Navbar />
          <Toaster richColors position="top-right" />
          <ScrollToTop />
          <Suspense>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/detail/:unique_id" element={<Detail />} />
              <Route path="/products" element={<Products />} />
              <Route path="/auth" element={<Authentication />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/recipe" element={<Recipe />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/order-confirm" element={<OrderConfirm />} />
              <Route path="/account" element={<Account />} />
              <Route path="/return" element={<ReturnAndRefund />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </Suspense>
          <Footer />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
