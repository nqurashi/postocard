import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import DashBoardIndex from "./DashBoard/DashBoardIndex";
import AllProducts from "./DashBoard/Pages/AllProducts";
import AdminLogin from "./DashBoard/Accounts/AdminLogin";
import { useDispatch, useSelector } from "react-redux";
import { LogedinUser } from "./Redux/Action/UserAction";
import CreateProduct from "./DashBoard/Pages/CreateProduct";
import CategoryList from "./DashBoard/Pages/CategoryList";
import Home from "./Pages/Home";
import SubCategoryList from "./DashBoard/Pages/SubCategoryList";
import SingleCard from "./Pages/SingleCard";
import Index from "./Layout/Index";
import Footer from "./Layout/Footer/Footer";
import Product from "./Pages/Product";
import SingleProduct from "./Pages/SingleProduct";
import Cart from "./Pages/Cart";
import Payment from "./Pages/Payment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getallproduct } from "./Redux/Action/ProductAction";
import { ScrollToTop } from "react-router-scroll-to-top";
import OrderList from "./DashBoard/Pages/OrderList";
import SingleOrder from "./DashBoard/Pages/SingleOrder";
import Vindor from "./DashBoard/Pages/Vindor";
import CreateVendor from "./DashBoard/Pages/CreateVendor";
import ConformOrder from "./DashBoard/Pages/ConformOrder";
import { getallCategoryforuser } from "./Redux/Action/CategoryAction";
import SingleVendor from "./DashBoard/Pages/SingleVendor";
import NotFound from "./Layout/NotFoundPage/NotFound";
import Cookies from "js-cookie";
import Allcollection from "./Pages/Allcollection";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import PrivicyPolicy from "./Pages/PrivicyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions ";
import RefundPolicy from "./Pages/RefundPolicy";
import UserLogin from "./Pages/UserLogin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import AllUsers from "./DashBoard/Pages/AllUsers";
import UserAnalytics from "./DashBoard/Pages/UserAnalytics";
import Discounts from "./DashBoard/Pages/Discounts";
import UserOrderDetails from "./Pages/UserOrderDetails";
import CreatePackage from "./DashBoard/Pages/CreatePackage";
import VendorDashBoard from "./DashboardVendor/Views/VendorDashBoard";
import VendorLogin from "./DashboardVendor/Pages/VendorLogin";
import VendorAuth from "./Hooks/VendorAuth";
import Orders from "./DashboardVendor/Views/Orders";
import PendingOrders from "./DashboardVendor/Views/PendingOrders";
import CompletedOrders from "./DashboardVendor/Views/CompletedOrders";
import RejectedOrders from "./DashboardVendor/Views/RejectedOrders";
import EditPackage from "./DashBoard/Pages/EditPackage";
import ProductView from "./DashBoard/Pages/ProductView";
import Artists from "./DashBoard/Pages/Artists";

const App = () => {
  const user = useSelector((state) => state.user.user);
  const isAuthantication = useSelector((state) => state.user.isAuthantication);

  // ============ admin privateRoute
  const AdminPrivateRoute = () => {
    return isAuthantication === false || (user && user.IsAdmin === 0) ? (
      <Navigate replace to="/login" />
    ) : (
      <Outlet />
    );
  };
  // ------------ redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get("ApiLoginToken")) {
      dispatch(LogedinUser());
    }
    dispatch(getallproduct());
    dispatch(getallCategoryforuser());
  }, []);
  // useEffect(() => {
  //   if (Cookies.get("ApiLoginToken")) {
  //     dispatch(LogedinUser());
  //   }
  // }, [user]);

  // useEffect(() => {
  //   document.addEventListener("contextmenu", (event) => event.preventDefault());
  // }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer position="top-center" theme="colored" />
      {/* =================== */}
      <Index />
      {/* ========================== */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/privacypolicy" element={<PrivicyPolicy />} />
        <Route path="/termsconditions" element={<TermsAndConditions />} />
        <Route path="/refundpolicy" element={<RefundPolicy />} />
        {/* ---- single card  */}
        <Route path="/singleCard/:id" element={<SingleCard />} />
        <Route path="/allcollection/:all" element={<Allcollection />} />

        {/* ----------admin Route  */}
        <Route path="/admin/dashboard" element={<AdminPrivateRoute />}>
          <Route path="/admin/dashboard" element={<DashBoardIndex />} />
        </Route>
        {/* ------- all product */}
        <Route path="/admin/products" element={<AdminPrivateRoute />}>
          <Route path="/admin/products" element={<AllProducts />} />
        </Route>

        <Route path="/admin/products/view/:id" element={<AdminPrivateRoute />}>
          <Route path="/admin/products/view/:id" element={<ProductView />} />
        </Route>
        <Route path="/admin/allusers" element={<AdminPrivateRoute />}>
          <Route path="/admin/allusers" element={<AllUsers />} />
        </Route>
        <Route path="/admin/artists" element={<AdminPrivateRoute />}>
          <Route path="/admin/artists" element={<Artists />} />
        </Route>
        <Route path="/admin/user/Analytics" element={<AdminPrivateRoute />}>
          <Route path="/admin/user/Analytics" element={<UserAnalytics />} />
        </Route>
        <Route path="/admin/product/discount" element={<AdminPrivateRoute />}>
          <Route path="/admin/product/discount" element={<Discounts />} />
        </Route>
        <Route path="/admin/create/package" element={<AdminPrivateRoute />}>
          <Route path="/admin/create/package" element={<CreatePackage />} />
        </Route>
        <Route path="/admin/edit/package/:id" element={<AdminPrivateRoute />}>
          <Route path="/admin/edit/package/:id" element={<EditPackage />} />
        </Route>

        {/* ---------- login  */}
        <Route path="/login" element={<AdminLogin />} />
        {/* ------------- admin/create/product  */}
        <Route path="/admin/create/product" element={<AdminPrivateRoute />}>
          <Route path="/admin/create/product" element={<CreateProduct />} />
        </Route>
        {/* ----------- category list  */}

        <Route path="/admin/category/list" element={<AdminPrivateRoute />}>
          <Route path="/admin/category/list" element={<CategoryList />} />
        </Route>

        {/* ------- sub category  */}

        <Route path="/admin/subcategory/list" element={<AdminPrivateRoute />}>
          <Route path="/admin/subcategory/list" element={<SubCategoryList />} />
        </Route>
        {/* ------- order list  */}
        <Route path="/admin/orderlist" element={<AdminPrivateRoute />}>
          <Route path="/admin/orderlist" element={<OrderList />} />
        </Route>

        {/* -------- single order deatail  */}
        <Route path="/admin/order/:id" element={<AdminPrivateRoute />}>
          <Route path="/admin/order/:id" element={<SingleOrder />} />
        </Route>
        {/* -------- vindor list  */}
        <Route path="/admin/vendor" element={<AdminPrivateRoute />}>
          <Route path="/admin/vendor" element={<Vindor />} />
        </Route>
        {/* -------- createvindor list  */}
        <Route path="/admin/create/vendor" element={<AdminPrivateRoute />}>
          <Route path="/admin/create/vendor" element={<CreateVendor />} />
        </Route>
        {/* ------- vendor single list  */}
        <Route path="/admin/vendor/detail/:id" element={<AdminPrivateRoute />}>
          <Route path="/admin/vendor/detail/:id" element={<SingleVendor />} />
        </Route>
        {/* -------- product Page  */}
        <Route exact path="/products/:category" element={<Product />} />
        <Route exact path="/product/:id" element={<SingleProduct />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/conformOrder" element={<ConformOrder />} />
        {/* ===== page not found  */}
        <Route path="/*" element={<NotFound />} />
        {/* ============ user route  */}
        <Route path="/user/Login" element={<UserLogin />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/order/details/:id" element={<UserOrderDetails />} />

        {/* ========================== vendor system  routes */}

        <Route path="/vendor/login" element={<VendorLogin />} />

        <Route path="/vendor/orders" element={<Orders />} />
        <Route path="/vendor/pendingorders" element={<PendingOrders />} />

        <Route path="/vendor/completedorders" element={<CompletedOrders />} />

        <Route path="/vendor/rejectedorders" element={<RejectedOrders />} />

        <Route
          path="/vendor/dashboard"
          element={
            <VendorAuth>
              <VendorDashBoard />{" "}
            </VendorAuth>
          }
        />
      </Routes>
      {/* =============== */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
