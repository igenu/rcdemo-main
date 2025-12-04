import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { ArrowLeftCircle } from "lucide-react";

// 1. UPDATED SAMPLE DATA to match the screenshot columns
const initialData = [
  {
    ticketId: 'SUP-16987459422',
    queryType: 'I have queries regarding my ongoing work',
    projectName: 'Topic and Proposal',
    milestoneName: 'Research Proposal Development',
    status: 'Open',
    date: '24 Nov, 2025',
  },
  {
    ticketId: 'SUP-16987459421',
    queryType: 'I have questions for the writer/consultant',
    projectName: 'Topic and Proposal',
    milestoneName: 'Research Proposal Development',
    status: 'Closed',
    date: '24 Oct, 2025',
  },
  // Add more sample data here if needed for testing pagination
];

// Helper to get Status Badge classes
const getStatusClasses = (status) => {
  switch (status) {
    case "Open":
      return "bg-cyan-100 text-cyan-700"; // Light Cyan/Blue for Open
    case "Closed":
      return "bg-gray-200 text-gray-700"; // Light Gray for Closed
    default:
      return "bg-gray-100 text-gray-800";
  }
};


export default function CallHistory() {
  const navigate = useNavigate();
  const [entriesPerPage, setEntriesPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Use the new initialData
  const [data] = useState(initialData);

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      item.ticketId?.toLowerCase().includes(searchLower) || // Searching by Ticket ID
      item.queryType?.toLowerCase().includes(searchLower) || // Searching by Query Type
      item.projectName?.toLowerCase().includes(searchLower) ||
      item.milestoneName?.toLowerCase().includes(searchLower)
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
      <div className="bg-[#f8f9fa] rounded-lg shadow-sm p-[15px]">
        <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-2">
          <h1 className="text-[16px] font-bold text-gray-800">My Query</h1>
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
          <table className="w-full border-collapse border-gray-200  ">
            {/* Table Head is perfect and requires no change */}
            <thead>
              <tr className="bg-white border-b border-gray-200">
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Sr. No.</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Ticket Id</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Query Type</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Project Name</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Milestone Name</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Status</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700 border-r border-gray-200">Date</th>
                <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            
            {/* UPDATED Table Body */}
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={8} // Changed colSpan to 8 (number of columns)
                    className="px-4 py-4 text-center text-gray-500 bg-white text-[14px]" // Changed bg-gray-50 to bg-white for better contrast
                  >
                    No data available in table
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr
                    key={item.ticketId}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-[14px] text-gray-700 border-r border-gray-200">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-3 text-[14px] text-gray-700 border-r border-gray-200">
                      {item.ticketId || "-"} 
                    </td>
                    <td className="px-4 py-3 text-[14px] text-gray-700 border-r border-gray-200">
                      {item.queryType || "-"}
                    </td>
                    <td className="px-4 py-3 text-[14px] text-gray-700 border-r border-gray-200">
                      {item.projectName || "-"}
                    </td>
                    <td className="px-4 py-3 text-[14px] text-gray-700 border-r border-gray-200">
                      {item.milestoneName || "-"}
                    </td>
                    
                    {/* Status Badge */}
                    <td className="px-4 py-3 text-[14px] border-r border-gray-200">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusClasses(item.status)}`}>
                        {item.status || "-"}
                      </span>
                    </td>
                    
                    <td className="px-4 py-3 text-[14px] text-gray-700 border-r border-gray-200">
                      {item.date || "-"}
                    </td>

                    {/* Action Buttons */}
                    <td className="px-4 py-3 text-[14px] flex items-center space-x-1">
                      <button className="bg-cyan-400 text-white font-medium py-1 px-3 rounded text-[12px] hover:bg-cyan-500 transition-colors">
                        View & Reply
                      </button>
                      <button className="bg-red-500 text-white p-1.5 rounded-full w-5 h-5 flex items-center justify-center text-[12px] font-bold leading-none hover:bg-red-600">
                        &times;
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-[14px] text-gray-600">
            Showing {totalEntries === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(endIndex, totalEntries)} of {totalEntries} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded text-[14px] transition-colors ${
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
              className={`px-4 py-2 rounded text-[14px] transition-colors ${
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