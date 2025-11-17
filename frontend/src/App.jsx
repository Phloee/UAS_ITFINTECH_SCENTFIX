import { Routes, Route, Router } from 'react-router';
import { ScrollToTop } from "./components/ScrollToTop";
import { ProductsHome } from './pages/products/ProductsHome';
import { ProductsByCategory } from './pages/products/ProductsByCategory';
import { ProductDetail } from './pages/products/ProductDetail';
import { PageNotFound } from './pages/notFound/PageNotFound';
import { ProductNotFound } from './pages/notFound/ProductNotFound';

import './App.css';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route index element={<ProductsHome />} />

        {/* Product Page */}
        <Route path="products/:category" element={<ProductsByCategory />} />
        <Route path="products/detail/:productId" element={<ProductDetail />} />
        <Route path="products/product-not-found" element={<ProductNotFound />} />

        {/* Not Found */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  )
}

export default App
