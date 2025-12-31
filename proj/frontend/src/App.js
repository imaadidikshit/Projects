import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";

// Layout Components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import CustomCursor from "@/components/layout/CustomCursor";
import SearchModal from "@/components/layout/SearchModal";

// Pages
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

function App() {
  return (
    <div className="App bg-black min-h-screen">
      <BrowserRouter>
        <CustomCursor />
        <Navbar />
        <CartDrawer />
        <SearchModal />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
