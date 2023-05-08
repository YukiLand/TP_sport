import React from "react";
import AuthPage from "./components/pages/AuthPage";
import HomePage from "./components/pages/HomePage";
import SignupPage from "./components/pages/SignupPage";
import Header from "./components/common/Header";
import MaterialPage from "./components/pages/MaterialPage";
import CartPage from "./components/pages/CartPage";
import ManageProductsPage from "./components/pages/admin/ManageProductsPage";
import ManageCartsPage from "./components/pages/admin/ManageCartsPage";
import ManageUsersPage from "./components/pages/admin/ManageUsersPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* If we are on the login or signup page we don't want to display the header */}
        {window.location.pathname === "/signup" ||
        window.location.pathname === "/" ? null : (
          <Header />
        )}
        {/* All the pages of the application */}
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<MaterialPage />} />
          <Route path="/my-cart" element={<CartPage />} />
          <Route path="/manage-carts" element={<ManageCartsPage />} />
          <Route path="/manage-products" element={<ManageProductsPage />} />
          <Route path="/manage-users" element={<ManageUsersPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
