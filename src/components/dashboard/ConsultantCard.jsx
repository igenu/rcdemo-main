import React from "react";
import clientCRM from "../../data/client_crm";

function ConsultantCard() {
  return (
    <div className="bg-[#f8f9fa] rounded-lg shadow-sm p-[15px] h-full">
      <h2 className="text-[16px] font-medium mb-2 border-b border-gray-300 pb-2 text-gray-800">My Consultant</h2>
      <div className="space-y-2 text-[14px] text-gray-800">
        <p>
          <span className="font-medium">Name :</span>{" "}
          <span className="ml-1">{clientCRM.crmName}</span>
        </p>
        <p>
          <span className="font-medium">Board No :</span>{" "}
          <span className="ml-1">{clientCRM.crmBoardNo}</span>
        </p>
        <p>
          <span className="font-medium">Email :</span>{" "}
          <span className="ml-1">{clientCRM.crmEmail}</span>
        </p>
      </div>
    </div>
  );
}

export default ConsultantCard;


