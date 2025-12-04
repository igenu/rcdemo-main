import React from "react";
import { useNavigate } from "react-router-dom";
import projects from "../../data/projects";
import { CircleQuestionMark } from "lucide-react";

function MilestoneApprovalCard() {
  const navigate = useNavigate();
  const awaitingMilestones = [];

  projects.forEach((project) => {
    project.milestones.forEach((m, milestoneIndex) => {
      if (m.status === "Waiting for Approval") {
        awaitingMilestones.push({
          projectName: project.name,
          projectId: project.id,
          milestone: m,
          milestoneNumber: milestoneIndex + 1, // 1-indexed milestone number
        });
      }
    });
  });

  const count = awaitingMilestones.length;
  const first = awaitingMilestones[0];

  const handleViewDetails = () => {
    if (first) {
      navigate(`/ViewProjectDetails/${first.projectId}?milestone=${first.milestoneNumber}`);
    }
  };

  return (
    <div className="bg-[#f8f9fa] rounded-lg shadow-sm p-[15px] ">
      <div className="flex items-center mb-4 border-b border-gray-300 pb-2">
        <h2 className="text-[16px] font-medium text-gray-800">Milestone Approval Awaiting</h2>
        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded ml-4 bg-danger text-xs font-semibold">
          {count}
        </span>
      </div>

      {first ? (
        <div className="text-sm space-y-2 bg-white p-[15px] rounded border border-gray-200">
          <p>
            <span className="font-medium">Project :</span>{" "}
            <span className="ml-1">{first.projectName}</span>
          </p>
          <p>
            <span className="font-medium">Milestone :</span>{" "}
            <span className="ml-1">{first.milestone.title}</span>
          </p>
          {first.milestone.description && (
            <p>
              <span className="font-medium">Milestone Description :</span>{" "}
              <span className="ml-1">{first.milestone.description}</span>
            </p>
          )}
          {first.milestone.uploadedDate && (
            <p>
              <span className="font-medium">Date of Completion :</span>{" "}
              <span className="ml-1">{first.milestone.uploadedDate}</span>
            </p>
          )}
          <p>
            <span className="font-medium">Status :</span>{" "}
            <span className="ml-1 text-yellow-500">
              {first.milestone.status}
            </span>
          </p>
          <div className="pt-2 flex items-center justify-between">
            <button 
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Ask a Query"
            className="inline-flex items-center justify-center rounded text-emerald-600 text-sm border border-emerald-500 p-1">
              <CircleQuestionMark size={15} />
            </button>
            <button
              onClick={handleViewDetails}
              className="inline-flex items-center px-3 py-1 rounded border border-emerald-500 text-emerald-600 text-[12px] font-medium hover:bg-emerald-50"
            >
              View Details
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No milestones awaiting approval.</p>
      )}
    </div>
  );
}

export default MilestoneApprovalCard;


