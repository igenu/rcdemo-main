import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { ArrowLeftCircle } from "lucide-react";

// --- START: Sample Data to Populate the Table ---
const initialData = [
  {
    projectName: "Thesis Proposal",
    milestoneName: "Chapter 1 Outline",
    writerCode: "WR1001",
    addedOn: "2025-11-20",
    slotTime: "10:00 AM",
    bookingDate: "24 Nov, 2025",
    status: "Completed",
  },
  {
    projectName: "Dissertation",
    milestoneName: "Literature Review",
    writerCode: "WR1005",
    addedOn: "2025-10-15",
    slotTime: "02:30 PM",
    bookingDate: "20 Oct, 2025",
    status: "Pending",
  },
  {
    projectName: "Project Report",
    milestoneName: "Data Analysis",
    writerCode: "WR1010",
    addedOn: "2025-09-01",
    slotTime: "11:00 AM",
    bookingDate: "05 Sep, 2025",
    status: "Cancelled",
  },
  {
    projectName: "Thesis Proposal",
    milestoneName: "Abstract Drafting",
    writerCode: "WR1001",
    addedOn: "2025-11-25",
    slotTime: "04:00 PM",
    bookingDate: "26 Nov, 2025",
    status: "Completed",
  },
];
// --- END: Sample Data to Populate the Table ---

// Helper function to dynamically apply Tailwind classes based on status
const getStatusClasses = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};


export default function CallHistory() {
  const navigate = useNavigate();
  const [entriesPerPage, setEntriesPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Use the sample data for initial state
  const [data] = useState(initialData); 

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      item.projectName?.toLowerCase().includes(searchLower) ||
      item.milestoneName?.toLowerCase().includes(searchLower) ||
      item.writerCode?.toLowerCase().includes(searchLower)
    );
  });

  // Calculate pagination
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full">
      <Breadcrumb />
      <div className="bg-[#f8f9fa] rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
          <h1 className="text-[18px] font-bold text-gray-800">Call History</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-2 py-0.5 bg-white text-emerald-600 border border-emerald-600 rounded hover:bg-emerald-600 hover:text-white transition-colors text-[12px]"
          >
            Back
            <ArrowLeftCircle size={13} />
          </button>
        </div>

        {/* Table Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <label className="text-[14px] text-gray-600">Show</label>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-[14px] text-gray-600">entries</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[14px] text-gray-600">Search:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search..."
              className="border border-gray-300 rounded px-3 py-1 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-200 text-[14px] ">
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Sr. No.</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Project Name</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Milestone Name</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Writer Code</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Added On</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Slot Time</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Booking Date</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Status</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-4 text-center text-[14px] text-gray-500 bg-white"
                  >
                    No data available in table
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-[14px] text-gray-700 border-r border-gray-200">
                      {startIndex + index + 1}
                    </td>
                    {/* Updated mapping to use your defined columns */}
                    <td className="px-4 py-3 text-[14px] text-gray-700 border-r border-gray-200">
                      {item.projectName || "-"}
                    </td>
                    <td className="px-4 py-3 text-[14px] text-gray-700 border-r border-gray-200">
                      {item.milestoneName || "-"}
                    </td>
                    <td className="px-4 py-3 text-[14px] text-gray-700 border-r border-gray-200">
                      {item.writerCode || "-"}
                    </td>
                    <td className="px-4 py-3 text-[14px] text-gray-700 border-r border-gray-200">
                      {item.addedOn || "-"}
                    </td>
                    <td className="px-4 py-3 text-[14px] text-gray-700 border-r border-gray-200">
                      {item.slotTime || "-"}
                    </td>
                    <td className="px-4 py-3 text-[14px] text-gray-700 border-r border-gray-200">
                      {item.bookingDate || "-"}
                    </td>
                    {/* Status Badge */}
                    <td className="px-4 py-3 text-[14px]">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusClasses(item.status)}`}
                      >
                        {item.status || "-"}
                      </span>
                    </td>
                    {/* Action Button */}
                    <td className="px-4 py-3 text-[14px]">
                      <button className="text-emerald-600 hover:underline font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-[14px]">
          <div className="text-gray-600">
            Showing {totalEntries === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(endIndex, totalEntries)} of {totalEntries} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded text-[12px] transition-colors ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-4 py-2 rounded text-[12px] transition-colors ${
                currentPage === totalPages || totalPages === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}