import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import Home from "./Components/Home";
import List from "./Components/Blog/List";
import Detail from "./Components/Blog/Detail";
import Index from "./Components/Member/Index";
import Update from "./Components/Account/Update";
import AddProduct from "./Components/Account/AddProduct";
import MyProduct from "./Components/Account/MyProduct";
import EditProduct from "./Components/Account/EditProduct";
import ProductDetail from "./Components/Product/ProductDetail";
import Cart from "./Components/Product/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
        <App>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/blog/list" element={<List />} />
            <Route path="/blog/detail/:id" element={<Detail />} />
            <Route path="/login" element={<Index />} />
            <Route path="/account/update" element={<Update />} />
            <Route path="/account/addproduct" element={<AddProduct />} />
            <Route path="/account/myproduct" element={<MyProduct />} />
            <Route path="/account/editproduct" element={<EditProduct />} />
            <Route path="/product/detail" element={<ProductDetail />} />
            <Route path="/product/cart" element={<Cart />} />
          </Routes>
        </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
