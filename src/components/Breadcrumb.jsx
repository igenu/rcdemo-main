import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getBreadcrumbName = (path) => {
    const pathMap = {
      "": "Dashboard",
      "how-it-works": "How it Works",
      "my-queries": "My Queries",
      "call-management": "Call Management",
      "call-history": "Call History",
      "ViewProjectDetails": "Manage Project",
    };
    return pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      {pathnames.length > 0 ? (
        <>
          <Link
            to="/"
            className="text-primary hover:underline transition-colors flex items-center gap-2"
          >
            {/* <Home size={15} />  */}
            Dashboard
          </Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-800 font-medium">
            {getBreadcrumbName(pathnames[pathnames.length - 1])}
          </span>
        </>
      ) : (
        <Link
          to="/"
          className="flex items-center hover:text-primary transition-colors gap-2"
        >
          {/* <Home size={15} /> */}
           Dashboard
        </Link>
      )}
    </nav>
  );
}

