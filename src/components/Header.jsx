import { useAuth } from "../utils/idb.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, LayoutDashboard, Calendar, Menu, X } from "lucide-react";

export default function Header({ onToggleSidebar, isSidebarOpen }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboardActive = location.pathname === "/";

  if (!user) {
    // navigate("/login");
    // return null;
  }

  return (
    <header className="bg-[#f8f9fa] text-gray-800 shadow-sm border-b border-gray-200 f-13">
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="rounded text-primary hover:bg-primary transition-colors"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-700">Welcome</p>
            <p className="text-sm font-semibold text-primary">DUMMY CLIENT</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/")}
            className={`flex items-center space-x-2 px-2 py-1 rounded transition-colors text-[12px] ${
              isDashboardActive
                ? "bg-primary text-white"
                : "text-gray-700 hover:text-[#268471]"
            }`}
          >
            <LayoutDashboard size={13} />
            <span className="font-medium">Dashboard</span>
          </button>
          
         

          <button
            className="relative px-2 py-1 rounded bg-primary hover:bg-white text-white hover:text-[#268471] transition-colors flex items-center gap-2 text-[12px]" 
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Notifications"
          >
            <Bell size={13} />
            <span className="">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
