import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListPage from "./pages/ProductListPage";
import UserProfilePage from './pages/user/UserProfilePage';
import UserOrdersPage from "./pages/user/UserOrdersPage";
import UserCartDetalsPage from "./pages/user/UserCartDetalsPage";
import UserOrderDetaisPage from "./pages/user/UserOrderDetaisPage";
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminEditUserPage from './pages/admin/AdminEditUserPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminCreateProductPage from './pages/admin/AdminCreateProductPage';
import AdminEditProductPage from './pages/admin/AdminEditProductPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminOrderDetailsPage from './pages/admin/AdminOrderDetailsPage';
import AdminChatsPage from './pages/admin/AdminChatsPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import RoutesWithUserChatComponent from "./components/user/RoutesWithUserChatComponent";
import ScrollToTop from "./utils/ScrollToTop";
import UserUpdateProfilePhoto from "./pages/user/UserUpdateProfilePhoto";
import AdminUpdateProfilePhoto from "./pages/admin/AdminUpdateProfilePhoto";
import AdminCreateCategory from "./pages/admin/AdminCreateCategory";
import { ToastContainer } from "react-toastify";



function App() {
  return (
<BrowserRouter>
<ScrollToTop/>
<ToastContainer theme={"colored"} position={"top-center"}/>
<HeaderComponent/>
  <Routes>
  {/* <Route element={<RoutesWithUserChatComponent/>}>  */}
      {/* public routes  */}
      <Route path="/"  element={<HomePage/>}/>
    <Route path="/product-list"  element={<ProductListPage/>}/>
    <Route path="/product-list/category/:categoryId"  element={<ProductListPage/>}/>
    <Route path="/product-details/:id"  element={<ProductDetailsPage/>}/>
    
    <Route path="/login"  element={<LoginPage/>}/>
    <Route path="/register"  element={<RegisterPage/>}/>
    <Route path="*"  element={"page not found"}/>
  {/* </Route> */}
  UserUpdateProfilePhoto
  {/* user protected routes  */}
  <Route element={<ProtectedRoutesComponent admin={false}/>}>
  <Route path="/user"  element={<UserProfilePage/>}/>
  <Route path="/user/UpdateProfilePhoto"  element={<UserUpdateProfilePhoto/>}/>
    <Route path="/user/my-orders"  element={<UserOrdersPage/>}/>
    <Route path="/user/cart-details"  element={<UserCartDetalsPage/>}/>
    <Route path="/user/order-details/:id"  element={<UserOrderDetaisPage/>}/>
    <Route path="/cart"  element={<CartPage/>}/>
  </Route>

    {/* admin protected routes  */}
    <Route element={<ProtectedRoutesComponent admin={true}/>}>
  <Route path="/admin/users"  element={<AdminUsersPage/>}/>
  <Route path="/admin/edit-user/:id"  element={<AdminEditUserPage/>}/>
  <Route path="/admin/products"  element={<AdminProductsPage/>}/>
  <Route path="/admin/create-new-product"  element={<AdminCreateProductPage/>}/>
  <Route path="/admin/edit-product/:id"  element={<AdminEditProductPage/>}/>
  <Route path="/admin/orders"  element={<AdminOrdersPage/>}/>
  <Route path="/admin/order-details/:id"  element={<AdminOrderDetailsPage/>}/>
  <Route path="/admin/chats"  element={<AdminChatsPage/>}/>
  <Route path="/admin/analytics"  element={<AdminAnalyticsPage/>}/>
  <Route path="/admin/UpdateProfilePhoto"  element={<AdminUpdateProfilePhoto/>}/>
  <Route path="/admin/createcategory"  element={<AdminCreateCategory/>}/>

  </Route>

  </Routes>
  <FooterComponent/>
</BrowserRouter>
  );
}

export default App;
