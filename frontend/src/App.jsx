import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout/Layout";
import Landing from "./pages/Landing/Landing";
import Signup from "./pages/Signup";
import UserLogin from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import TechnicalNews from "./pages/technical-news/TechnicalNews";
import NewsDetail from "./pages/NewsDetails/NewsDetails";
import Logout from "./pages/Logout";
import ProtectedRoute from "../ProtectedRoute.jsx";

function App() {
  const url = "http://localhost:8000";

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<UserLogin url={url} />} />
        <Route path="signup" element={<Signup url={url} />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="news" element={<TechnicalNews />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
