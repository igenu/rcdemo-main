import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/idb.jsx";
import { LayoutDashboard, HelpCircle, LogOut, MessageSquareText, PhoneCall } from "lucide-react";

export default function Sidebar({ isOpen = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/my-queries", label: "My Queries", icon: MessageSquareText },
    { path: "/how-it-works", label: "How it Works", icon: HelpCircle },
    { path: "/call-history", label: "Call History", icon: PhoneCall },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className={`${isOpen ? 'w-[220px]' : 'w-[68px]'} border-r border-gray-200 flex flex-col h-full transition-all duration-300 bg-[#f8f9fa]`}>
      <div className={`px-2 py-7 ${!isOpen && ''}`}>
        <div className={`flex items-center space-x-2 cursor-pointer ${isOpen ? 'justify-start' : 'justify-center'}`} onClick={() => navigate("/")}>
          <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0">
            <img  src="/logo.png" alt="logo" className="w-full h-auto "/>
          </div>
          {isOpen && (
            <h2 className="text-[13px] font-bold text-primary whitespace-nowrap">
              DUMMY <br/> COMPANY PVT LTD
            </h2>
          )}
        </div>
      </div>
      
      <nav className={`flex-1 text-[14px] ${isOpen ? 'p-0' : 'p-0'}`}>
        <ul className="space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center ${isOpen ? 'space-x-3 px-4' : 'justify-center px-2'} py-3 transition-colors ${
                    isActive
                      ? "border-l-4 border-primary text-primary"
                      : "border-l-4 border-transparent text-gray-700 hover:text-[#268471]"
                  }`}
                  title={!isOpen ? item.label : ""}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={!isOpen ? item.label : ""}
                >
                  <Icon size={18} />
                  {isOpen && <span className="">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={`border-t border-gray-200 ${isOpen ? 'p-2' : 'p-2'}`}>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${isOpen ? 'space-x-3 px-4' : 'justify-center px-2'} py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors`}
          title={!isOpen ? "Logout" : ""}
        >
          <LogOut size={18} />
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

