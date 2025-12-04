import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Layout from "../layouts/Layout";
import ScrollToTop from "../components/ScrollToTop";
import { useAuth } from "../utils/idb";
import { useEffect } from "react";
import Dashboard from "../pages/Dashboard";
import HowItWorks from "../pages/HowItWorks";
import CallHistory from "../pages/CallHistory";
import ViewProjectDetails from "../pages/ViewProjectDetails";
import MyQueries from "../pages/MyQueries";



export default function AppRouter() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Restaurant Routes (NO layout) */}
        <Route path="/login" element={<p>Login</p>} />

        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/my-queries" element={<MyQueries />} />
            <Route path="/schedule-demo" element={<MyQueries />} />
            <Route path="/call-history" element={<CallHistory />} />
            <Route path="/ViewProjectDetails/:projectId" element={<ViewProjectDetails />} />
          </Route>
        </Route>
        
      </Routes>
    </Router>
  );
}
