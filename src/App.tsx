/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import { ProductProvider } from './ProductContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import About from './pages/About';
import Contact from './pages/Contact';
import ScentFinder from './pages/ScentFinder';
import CustomScent from './pages/CustomScent';
import Admin from './pages/Admin';

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/scent-finder" element={<ScentFinder />} />
              <Route path="/custom-blend" element={<CustomScent />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}
