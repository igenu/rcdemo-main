import React from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronsRight, File, Info, Phone, RotateCw, ThumbsUp, HelpCircle } from "lucide-react";
import projects from "../data/projects";
import BreadCrump from "../components/Breadcrumb"

export default function ViewProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const milestoneNum = searchParams.get("milestone");

  // Find the project by ID
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="p-3">
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <div className="p-3 space-y-6">
      <BreadCrump />
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Project</h1>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-2 py-1 rounded bg-primary text-sm font-medium "
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Sidebar */}
        <div className="md:col-span-1 space-y-4">
          {/* Scholar Profile Card */}
          <div className="bg-gray-50 rounded-lg shadow-md shadow-gray-100 border border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold ">Scholar Profile</h2>
            <hr className="my-2 text-gray-300" />
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Academic Level -</span> PhD
              </p>
              <p>
                <span className="font-medium">Payment Mode -</span> Online(Credit Card/Debit Card)
              </p>
            </div>
          </div>

          {/* Project Details Card */}
          <div className="bg-gray-50 rounded-lg shadow-md shadow-gray-100 border border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold">Project Details</h2>
            <hr className="my-2 text-gray-300" />
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Project Name -</span> {project.name}
              </p>
              <p>
                <span className="font-medium">Project ID -</span> {project.id}
              </p>
              <p>
                <span className="font-medium">Project Created Date -</span> {project.createdDate}
              </p>
              {project.acceptedDate && (
                <p>
                  <span className="font-medium">Project Accepted Date -</span> {project.acceptedDate}
                </p>
              )}
              <p>
                <span className="font-medium">Project Status -</span> {project.status}
              </p>
            </div>
          </div>

          {/* Details of Project Card */}
          <div className="bg-gray-50 rounded-lg shadow-md shadow-gray-100 border border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold ">Details of Project</h2>
            <hr className="my-2 text-gray-300" />
            <div className="space-y-2 text-sm">
              <p className="">
                Client Uploaded Details
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          {/* Milestones Section */}
          <div className="bg-white rounded-lg shadow-md shadow-gray-100 border border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold mb-4">Milestones</h2>
            <div className="flex gap-4">
              {/* Milestone Navigation */}
              <div className="space-y-2">
                {project.milestones?.map((milestone, index) => {
                  const milestoneNumber = index + 1;
                  const isSelected = milestoneNum === milestoneNumber.toString();
                  return (
                    <button
                      key={index}
                      onClick={() => navigate(`/ViewProjectDetails/${projectId}?milestone=${milestoneNumber}`)}
                      className={`w-40 text-left px-4 py-2 rounded border ${
                        isSelected
                          ? "bg-primary"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      } text-sm font-medium flex items-center justify-between`}
                    >
                      Milestone {milestoneNumber}
                      <ChevronsRight size={16} className="" />
                    </button>
                  );
                })}
              </div>

              {/* Milestone Details */}
              <div className="w-full">
                {milestoneNum && project.milestones?.[parseInt(milestoneNum) - 1] ? (
                  (() => {
                    const selectedMilestone = project.milestones[parseInt(milestoneNum) - 1];
                    return (
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <button className="inline-flex items-center px-3 py-1  bg-primary text-white text-xs font-medium ">
                           
                            Milestone Details {milestoneNum}
                          </button>
                          <button className="inline-flex items-center px-3 py-1 border border-primary text-gray-700 text-xs font-medium hover:bg-primary">
                            <span className="mr-1"><File size={15} /></span>
                            Attach Additional Files
                          </button>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Milestone Title:</span> {selectedMilestone.title}
                          </p>
                          <p>
                            <span className="font-medium">Milestone Description:</span> {selectedMilestone.description}
                          </p>
                          <p>
                            <span className="font-medium">Milestone Status:</span>{" "}
                            <span className={selectedMilestone.status === "Pending" ? "text-red-500 font-semibold" : selectedMilestone?.status == "Waiting for Approval" ? "text-yellow-500 font-semibold" : ""}>
                              {selectedMilestone.status}
                            </span>
                          </p>
                          {selectedMilestone?.writerCode && (
                            <p>
                            <span className="font-medium">Writer Code:</span> {selectedMilestone.writerCode}
                          </p>
                          )}
                        </div>
                        {selectedMilestone.status === "Waiting for Approval" && (
                          <div className="bg-green-50 rounded-lg border border-green-300 px-3 py-2 space-y-4">
                            <h3 className="text-lg font-bold text-black">Completion Details</h3>
                            <div className="space-y-2 text-sm">
                              <p className="flex items-center gap-2">
                                <span className="font-medium">Uploaded File :</span>
                                <Info size={16} className="text-black" />
                              </p>
                              <p>
                                <span className="font-medium">Comments :</span> {selectedMilestone.comments || "N/A"}
                              </p>
                              <p>
                                <span className="font-medium">Date of Completion :</span> {selectedMilestone.dateOfCompletion || "N/A"}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center gap-2">
                                <button className="w-7 h-7 bg-green-100 border border-primary rounded flex items-center justify-center hover:bg-green-200">
                                  <HelpCircle size={15} className="text-primary" />
                                </button>
                                <span className="text-black text-sm">or</span>
                                <button className="w-7 h-7 bg-green-100 border border-primary rounded flex items-center justify-center hover:bg-green-200">
                                  <Phone size={15} className="text-primary" />
                                </button>
                                <span className="text-black text-sm">or</span>
                                <button className="w-7 h-7 bg-red-100 border border-red-400 rounded flex items-center justify-center hover:bg-red-200">
                                  <RotateCw size={15} className="text-danger" />
                                </button>
                              </div>
                              <button className="inline-flex items-center f-12 px-2 py-1 bg-primary rounded hover:bg-teal-700">
                                <ThumbsUp size={16} className="mr-2" />
                                Approve the Work
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <p className="text-gray-500 text-sm">Select a milestone to view details</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment History Section */}
          {project.paymentHistory && (
            <div className="bg-white rounded-lg shadow-md shadow-gray-100 border border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Payment History</h2>
                <div className="text-right space-x-3 flex items-center">
                  <p className="text-gray-900 bg-green-50 p-1 rounded font-semibold text-sm">
                    Total Amount: {project.paymentHistory.totalAmount}
                  </p>
                  <p className="text-gray-900 bg-red-50 p-1 rounded  font-semibold text-sm">
                    Due Amount: {project.paymentHistory.dueAmount}
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold">S.No</th>
                      <th className="text-left py-2 px-3 font-semibold">Milestone</th>
                      <th className="text-left py-2 px-3 font-semibold">Amount Paid</th>
                      <th className="text-left py-2 px-3 font-semibold">Payment Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.paymentHistory.payments.map((payment, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-3">{payment.sNo}</td>
                        <td className="py-2 px-3">{payment.milestone}</td>
                        <td className="py-2 px-3">{payment.amountPaid}</td>
                        <td className="py-2 px-3">{payment.paymentDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

