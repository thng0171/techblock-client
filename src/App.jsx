import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BacktoTop from "./components/User/Layout/BacktoTop";
import Header from "./components/User/Layout/Header";
import Home from "./components/User/Home/Home";
import Article from "./components/User/Article/Article";
import Login from "./components/User/Auth/Login";
import Profile from "./components/User/Auth/Profile";
import Register from "./components/User/Auth/Register";
import Search from "./components/User/Search/Search";
import AdminDashboard from "./components/Admin/Dashboard/Dashboard";
import Datatable from "./components/Admin/Datatable";
import Sidebar from "./components/Admin/Layout/Sidebar";
import Topbar from "./components/Admin/Layout/Topbar";
import AdminLogin from "./components/Admin/Auth/Login";
import NotFound from "./components/User/layout/NotFound";
import NewArticle from "./components/Admin/ArticleManager/NewArticle";
import NewCategory from "./components/Admin/CategoryManager/NewCategory";
import EditCategory from "./components/Admin/CategoryManager/EditCategory";
import NewUser from "./components/Admin/UserManager/NewUser";
import EditArticle from "./components/Admin/ArticleManager/EditArticle";
import Footer from "./components/User/Layout/Footer";
import EditInfo from "./components/User/Auth/EditInfo";
import ChangePassword from "./components/User/Auth/ChangePassword";
import Setting from "./components/Admin/Auth/Setting";
import { useAdminContext } from "./context/AdminContext";
import { Context } from "./context/Context";

function App() {
  const { user, userData } = useContext(Context);
  function UserLayoutRoutes() {
    return (
      <div className="">
        <Header />
        <BacktoTop />
        <div className="min-h-[calc(100vh-6.5rem)] bg-slate-50 px-4 lg:px-10 xl:px-24">
          <Routes path=":path">
            <Route path="/" element={<Home />} />
            <Route path="/about" />
            <Route path="/article">
              <Route path=":slug" element={<Article />} />
            </Route>
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/register" element={user ? <Home /> : <Register />} />
            <Route path="/profile">
              <Route index element={user ? <Profile /> : <Login />} />
              <Route path="edit" element={user ? <EditInfo /> : <Login />} />
              <Route
                path="change-password"
                element={user ? <ChangePassword /> : <Login />}
              />
            </Route>
            <Route path="/search" element={<Search />} />

            <Route path="*" element={<Navigate replace to={"/not-found"} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    );
  }
  const admin = user?.role === "admin";
  function AdminLayoutRoutes() {
    const { activeMenu } = useAdminContext();
    return (
      <div className={`min-h-screen bg-slate-100 ${activeMenu && "lg:ml-64"}`}>
        {activeMenu ? (
          <div className="fixed left-0 z-50 w-64 ">
            <Sidebar />
          </div>
        ) : (
          <div className="-left-64">
            <Sidebar />
          </div>
        )}
        <Topbar />
        <Routes>
          <Route path="/">
            <Route index element={<AdminDashboard />} />
            <Route path="*" element={<Navigate replace to={"/admin"} />} />
            <Route path="articles">
              <Route index element={<Datatable page="articles" />} />
              <Route path="new" element={<NewArticle />} />
              <Route path="edit">
                <Route path=":id" element={<EditArticle />} />
              </Route>
            </Route>
            <Route path="category">
              <Route index element={<Datatable page="category" />} />
              <Route path="new" element={<NewCategory />} />
              <Route path="edit">
                <Route path=":id" element={<EditCategory />} />
              </Route>
            </Route>
            <Route path="users">
              <Route index element={<Datatable page="users" />} />
              <Route path="new" element={<NewUser />} />
            </Route>
            <Route path="comments">
              <Route index element={<Datatable page="comments" />} />
            </Route>
            <Route path="setting" element={<Setting />} />
            {/* <Route path="change-password" element={<ChangePasswordAdmin />} /> */}
          </Route>
        </Routes>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserLayoutRoutes />} />
        {/* <Route path="*" element={<AdminDashboard />} /> */}
        <Route
          path="/admin/*"
          element={admin ? <AdminLayoutRoutes /> : <AdminLogin />}
        />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
