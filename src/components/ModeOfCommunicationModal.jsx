import { useState, useEffect } from "react";
import { X, ArrowLeft, Upload } from "lucide-react";
import toast from "react-hot-toast";

export default function ModeOfCommunicationModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1); // 1 for Mode of Communication, 2 for Fair Use Policy, 3 for Timelines, 4 for Project Details
  const [ipAddress, setIpAddress] = useState("106.195.37.93"); // Default IP
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isFairUseChecked, setIsFairUseChecked] = useState(false);
  const [isTimelinesChecked, setIsTimelinesChecked] = useState(false);

  useEffect(() => {
    // Function to open the modal and reset step/checks
    const handleOpenModal = () => {
      setStep(1);
      setIsChecked(false);
      setIsFairUseChecked(false);
      setIsTimelinesChecked(false);
      setIsOpen(true);
    };

    // Fetch IP address on first mount
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Failed to fetch IP address:", error);
        // Keep default IP if fetch fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchIP();

    // Listen for a custom event to open the modal
    window.addEventListener("open-mode-of-communication-modal", handleOpenModal);

    return () => {
      window.removeEventListener(
        "open-mode-of-communication-modal",
        handleOpenModal
      );
    };
  }, []);

  const handleNext = () => {
    if (step === 1) {
      if (!isChecked) {
        toast.error("Please check the checkbox to proceed");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!isFairUseChecked) {
        toast.error("Please check the checkbox to proceed");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!isTimelinesChecked) {
        toast.error("Please check the checkbox to proceed");
        return;
      }
      setStep(4);
    } else if (step === 4) {
      setIsOpen(false);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 4) {
      setStep(3);
    }
  };

  const handleUploadProjectDetails = () => {
    window.open(
      "https://rapidcollaborate.com/project-details/demo/index.php?services=ODAyMw==&visits=1",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleClose = () => {
    // if (step === 1 && isChecked) {
    //   setIsOpen(false);
    // } else if (step === 2 && isFairUseChecked) {
    //   setIsOpen(false);
    // } else if (step === 3 && isTimelinesChecked) {
    //   setIsOpen(false);
    // }
    setIsOpen(false)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full mx-4 p-4 relative">
        {/* Step 1: Mode of Communication */}
        {step === 1 && (
          <>
            <div className="flex items-center justify-between border-b-1 border-[#268471] pb-2">
              <h2 className="text-xl font-bold text-gray-800">
                Mode of Communication
              </h2>

              {/* Close button */}
              <button
                onClick={handleClose}
                // disabled={!isChecked}
                className={`absolute top-4 right-4 transition-colors ${
                  isChecked
                    ? "text-gray-400 hover:text-gray-600 cursor-pointer"
                    : "text-gray-400 hover:text-gray-600 cursor-pointer"
                }`}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="pt-4">
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="communication-agreement"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-[#268471] border-gray-300 rounded focus:ring-[#268471] cursor-pointer"
                  />
                  <label
                    htmlFor="communication-agreement"
                    className="text-gray-700 leading-relaxed cursor-pointer"
                  >
                    I understand and accept that
                    updates/feedback(s)/revision(s)/progress and work submission for
                    my project shall be managed through Rapid Collaborate and not
                    through email/WhatsApp or any other means. This shall be treated
                    as official communication between me and{" "}
                    <a
                      href="https://www.dummycompany.com"
                      target="_blank"
                      className="text-md font-semibold text-primary"
                    >
                      DUMMY COMPANY PVT LTD
                    </a>
                  </label>
                </div>

                <p className="text-gray-700">
                  We have captured the IP address :{" "}
                  <span className="font-semibold text-gray-900">
                    {isLoading ? "Loading..." : ipAddress}
                  </span>
                </p>
              </div>

              {/* Next Button */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={handleNext}
                  className="px-4 py-1 f-13 rounded-lg transition-colors font-medium bg-[#268471] text-white hover:bg-[#1f6b5a] cursor-pointer"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}

        {/* Step 2: Fair Use Policy */}
        {step === 2 && (
          <>
            <div className="flex items-center justify-between border-b-1 border-[#268471] pb-2">
              <h2 className="text-xl font-bold text-gray-800">
                Fair Use Policy
              </h2>

              {/* Close button */}
              <button
                onClick={handleClose}
                // disabled={!isChecked}
                className={`absolute top-4 right-4 transition-colors ${
                  isChecked
                    ? "text-gray-400 hover:text-gray-600 cursor-pointer"
                    : "text-gray-400 hover:text-gray-600 cursor-pointer"
                }`}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="pt-4">
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="fair-use-agreement"
                    checked={isFairUseChecked}
                    onChange={(e) => setIsFairUseChecked(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-[#268471] border-gray-300 rounded focus:ring-[#268471] cursor-pointer"
                  />
                  <label
                    htmlFor="fair-use-agreement"
                    className="text-gray-700 leading-relaxed cursor-pointer"
                  >
                    I understand and accept that I am opting for a consulting service where the consultation and reference work is performed as per the details and information I share. Also, that research is iterative in nature and may require changes/revisions. I understand and accept that the work performed is subject to human errors and minor delays. <a
                      href="https://www.dummycompany.com"
                      target="_blank"
                      className="text-md font-semibold text-primary"
                    >
                      DUMMY COMPANY PVT LTD
                    </a>
                  </label>
                </div>

                
              </div>

              {/* Back and Next Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="px-4 py-1 f-13 rounded-lg transition-colors font-medium border border-[#268471] text-[#268471] hover:bg-[#268471] hover:text-white cursor-pointer flex items-center gap-2"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-1 f-13 rounded-lg transition-colors font-medium bg-[#268471] text-white hover:bg-[#1f6b5a] cursor-pointer"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Timelines */}
        {step === 3 && (
          <>
            <div className="flex items-center justify-between border-b-1 border-[#268471] pb-2">
              <h2 className="text-xl font-bold text-gray-800">
                Timelines
              </h2>

              {/* Close button */}
              <button
                onClick={handleClose}
                // disabled={!isChecked}
                className={`absolute top-4 right-4 transition-colors ${
                  isChecked
                    ? "text-gray-400 hover:text-gray-600 cursor-pointer"
                    : "text-gray-400 hover:text-gray-600 cursor-pointer"
                }`}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="pt-4">
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="timelines-agreement"
                    checked={isTimelinesChecked}
                    onChange={(e) => setIsTimelinesChecked(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-[#268471] border-gray-300 rounded focus:ring-[#268471] cursor-pointer"
                  />
                  <label
                    htmlFor="timelines-agreement"
                    className="text-gray-700 leading-relaxed cursor-pointer"
                  >
                    Any project deadlines falling on bank holidays or weekends shall be deemed to be extended to the end of business hours on the next working day.{" "}
                    <a
                      href="https://www.dummycompany.com"
                      target="_blank"
                      className="text-md font-semibold text-primary"
                    >
                      DUMMY COMPANY PVT LTD
                    </a>{" "}
                    will not be liable for any delay due to extension of deadline due to these days.
                  </label>
                </div>
              </div>

              {/* Back and Next Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="px-4 py-1 f-13 rounded-lg transition-colors font-medium border border-[#268471] text-[#268471] hover:bg-[#268471] hover:text-white cursor-pointer flex items-center gap-2"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-1 f-13 rounded-lg transition-colors font-medium bg-[#268471] text-white hover:bg-[#1f6b5a] cursor-pointer"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}

        {/* Step 4: Project Details */}
        {step === 4 && (
          <>
            <div className="flex items-center justify-between border-b-1 border-[#268471] pb-2">
              <h2 className="text-xl font-bold text-gray-800">
                Project Details
              </h2>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="pt-4">
              <div className="space-y-2 mb-3">
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-1">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Project Name :</span>
                    <span className="ml-2 text-sm font-semibold text-gray-800">PhD Topic & Proposal</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Task :</span>
                    <span className="ml-2 text-sm text-gray-800">1</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status :</span>
                    <span className="ml-2 text-sm text-red-500 font-semibold">Pending</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Title :</span>
                    <span className="ml-2 text-sm text-gray-800">Topic Selection</span>
                  </div>
                  <div className="text-gray-800">
                      Kindly provide 2-3 topics as per the research idea of the client
                   
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Estimated Delivery Date :</span>
                    <span className="ml-2 text-sm text-gray-800">22 Oct 2021</span>
                  </div>
                </div>
              </div>

              {/* Back and Upload Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="px-4 py-1 f-13 rounded-lg transition-colors font-medium border border-[#268471] text-[#268471] hover:bg-[#268471] hover:text-white cursor-pointer flex items-center gap-2"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>
                <button
                  onClick={handleUploadProjectDetails}
                  className="flex items-center px-2 py-1 f-13 rounded-lg transition-colors font-medium bg-[#268471] text-white hover:bg-[#1f6b5a] cursor-pointer"
                >
                  Upload project details
                  <Upload size={14} className="ml-1"/>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
