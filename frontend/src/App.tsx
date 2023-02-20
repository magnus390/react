import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Fruits from "./pages/Fruits";
import LoginForm from "./components/sections/LoginForm";
import RegisterUserForm from "./components/sections/RegisterUserForm";
import Category from "./pages/admin/Category";
import CategoryForm from "./pages/admin/CategoryForm";
import Product from "./pages/admin/Product";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import ProductForm from "./pages/admin/ProductForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Index from "./components/cart";
import Order from "./pages/admin/Order";
import User from "./pages/admin/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<Fruits />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/add" element={<ProductForm title="Add" />} />
          <Route path="/product/edit/:id" element={<ProductForm title="Edit" />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/add" element={<CategoryForm title="Add" />} />
          <Route
            path="/category/edit/:id"
            element={<CategoryForm title="Edit" />}
          />
          <Route path="/order" element={<Order />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterUserForm />} />
        <Route path="/cart" element={<Index />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
