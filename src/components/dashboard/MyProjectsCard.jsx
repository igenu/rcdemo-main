import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import projects from "../../data/projects";
import { ChevronRight, ChevronRightCircle, ChevronRightSquare } from "lucide-react";

function statusColor(status) {
  if (status === "Pending") return "text-red-500";
  if (status === "InProccess" || status === "InProcess")
    return "text-yellow-500";
  return "text-gray-700";
}

function MyProjectsCard() {
  const navigate = useNavigate();
  const [openProjectId, setOpenProjectId] = useState(null);

  const toggleProject = (projectId) => {
    setOpenProjectId((prev) => (prev === projectId ? null : projectId));
  };

  const isPending = (status) => status === "Pending";

  return (
    <div className="bg-[#f8f9fa] rounded-lg shadow-sm p-[15px] h-full">
      <div className="flex items-center mb-4 border-b border-gray-300 pb-2">
        <h2 className="text-[16px] font-medium text-gray-800">My Projects</h2>
        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded ml-4 bg-danger text-[12px] font-semibold">
          {projects.length}
        </span>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-gray-200 rounded-md px-4 py-3 flex flex-col gap-3"
          >
            <div className="flex  justify-between flex-col">
              <div>
                <h3 className="font-semibold text-sm">{project.name}</h3>
                
              </div>
              <div className="mt-3 flex justify-between items-center gap-5 text-[14px]">
                <p className="text-gray-600">
                  <span className="font-medium">Project ID :</span>{" "}
                  <span className="ml-1">{project.id}</span>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Status :</span>{" "}
                  <span className={`${statusColor(project.status)} ml-1`}>
                    {project.status}
                  </span>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Created Date :</span>{" "}
                  <span className="ml-1">{project.createdDate}</span>
                </p>
                <button
                  className={`self-start md:self-auto inline-flex items-center px-3 py-1 rounded text-[12px] ${
                    isPending(project?.status)
                      ? "bg-danger"
                      : "border border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                  } font-medium `}
                  onClick={() => {
                    if (isPending(project.status)) {
                      // Open the ModeOfCommunication modal
                      window.dispatchEvent(
                        new Event("open-mode-of-communication-modal")
                      );
                    } else {
                      toggleProject(project.id);
                    }
                  }}
                >
                  {isPending(project.status) ? "Upload Details" : "View Details"}
                  <ChevronRightCircle size={14} className="ml-1" />
                </button>
              </div>
            </div>
            {!isPending(project.status) && openProjectId === project.id && (
              <div className="mt-1 border-t border-gray-200 pt-3 space-y-4 text-[14px]">
                {project.milestones?.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 bg-[#f8f9fa] p-2 rounded"
                  >
                    <div className="w-full">
                      <div className="flex items-center justify-between w-full">
                        <p className="font-semibold">{milestone.title}</p>
                        <button
                          onClick={() => navigate(`/ViewProjectDetails/${project.id}?milestone=${index + 1}`)}
                          className="self-start inline-flex items-center px-2 py-1 rounded border border-blue-500 text-blue-600 text-[12px] font-medium hover:bg-blue-50"
                        >
                          View Details
                        </button>
                      </div>
                      {milestone.status && (
                        <p className="text-gray-600 mt-2">
                          <span className="font-medium">Status :</span>{" "}
                          <span className={`ml-1 p-0.5 px-1 rounded text-[10px] ${milestone.status == "Pending" ? "bg-danger" : milestone.status == "Waiting for Approval" ? "bg-yellow-500 text-white" : ""}`}>{milestone.status}</span>
                        </p>
                      )}
                      {milestone.description && (
                        <p className="text-gray-500 mt-2 line-clamp-2">
                          {milestone.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProjectsCard;
