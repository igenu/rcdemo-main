import Breadcrumb from "../components/Breadcrumb";

export default function HowItWorks() {
  return (
    <div className="w-full">
      <Breadcrumb />
      <div className="bg-[#f8f9fa] rounded-lg shadow-sm p-6">
        <h1 className="text-[18px] font-bold text-gray-800 mb-6 border-b border-gray-300 pb-4">How it Works</h1>
        <div className="w-full">
          <video
            controls
            className="w-full h-screen rounded-lg shadow-md "
            style={{ maxHeight: "80vh" }}
          >
            <source
              src="https://rapidcollaborate.com/rc-main/public/RC%20Scholar%20Panel%20-%20Guide.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

