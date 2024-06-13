import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";
import { useAdminAuthContext } from "../context/useAdminAuthContext";
import Login from "../../pages/Login/login";
import Register from "../../pages/Register/register";
import Header from "../../components/molecules/Header/header";
import Home from "../../pages/Home/home";
import Blogs from "../../pages/Blogs/blogs";
import Contact from "../../pages/Contact/contact";
import DetailBlog from "../../pages/Blogs/detailBlog";
import Profile from "../../pages/Profile/profile";
import UpdateProfile from "../../pages/Profile/updateProfile";
import BlogUser from "../../pages/Profile/blogUser";
import CreateBlog from "../../pages/Blogs/createBlog";
import UpdateBlog from "../../pages/Blogs/updateBlog";
import ResetPassword from "../../pages/ResetPassword/resetPassword";
import Footer from "../../components/molecules/Footer/footer";
import DetailCommunity from "../../pages/Communities/detailCommunity";
import Chat from "../../pages/Communities/community";
import Video from "../../pages/Videos/video";
import DetailVideo from "../../pages/Videos/detailVideo";
import CreateVideo from "../../pages/Videos/createVideo";
import AdminDashboard from "../../pages/Admin/adminDashboard";
import AdminLogin from "../../pages/Admin/adminLogin";
import NotFound from "../../pages/notFound/notFound";
import KajianList from "../../pages/Kajian/kajianList";
import VideoAdmin from "../../pages/Admin/stats/videoAdmin";
import CommunityAdmin from "../../pages/Admin/stats/communityAdmin";
import ChatAdmin from "../../pages/Admin/stats/chatAdmin";
import UserAdmin from "../../pages/Admin/stats/userAdmin";
import KajianAdmin from "../../pages/Admin/stats/kajianAdmin";

const RouteData = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blog",
    element: <Blogs />,
  },
  {
    path: "/blog/detail/:id",
    element: <DetailBlog />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/profile/:id/blog/:id",
    element: <BlogUser />,
  },
  {
    path: "/community",
    element: <Chat />,
  },
  {
    path: "/community/:id",
    element: <DetailCommunity />,
  },
  {
    path: "/video",
    element: <Video />,
  },
  {
    path: "/video/:id",
    element: <DetailVideo />,
  },
  {
    path: "/kajian",
    element: <KajianList />,
  },
];

const AdminRouteData = [
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/dashboard/user",
    element: <UserAdmin />,
  },
  {
    path: "/admin/dashboard/kajian",
    element: <KajianAdmin />,
  },
  {
    path: "/admin/dashboard/video",
    element: <VideoAdmin />,
  },
  {
    path: "/admin/dashboard/community",
    element: <CommunityAdmin />,
  },
  {
    path: "/admin/dashboard/chat",
    element: <ChatAdmin />,
  },
];

const Routing = () => {
  const { token } = useAuthContext();
  const { adminToken, role } = useAdminAuthContext();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* User Authenticated Routes */}
        <Route
          path="/blog/update/:id"
          element={
            token ? (
              <>
                <Header />
                <UpdateBlog />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/video/create"
          element={
            token ? (
              <>
                <Header />
                <CreateVideo />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile/update/:id"
          element={
            token ? (
              <>
                <Header />
                <UpdateProfile />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/blog/create"
          element={
            token ? (
              <>
                <Header />
                <CreateBlog />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/not-found" element={<NotFound />} />

        {/* Admin Authenticated Routes */}
        {AdminRouteData.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              adminToken && role === "admin" ? (
                <>{route.element}</>
              ) : (
                <Navigate to="/not-found" />
              )
            }
          />
        ))}

        {/* Public Routes */}
        {RouteData.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <>
                <Header />
                {route.element}
                <Footer />
              </>
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default Routing;
