import React, { useState } from "react";
import clientCRM from "../../data/client_crm";
import { Sparkle, Sparkles } from "lucide-react";
import SubscriptionPlanModal from "../SubscriptionPlanModal";

function AccountDetailsCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpgradeClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmPlan = (selectedPlan) => {
    // Handle plan confirmation logic here
    console.log("Selected plan:", selectedPlan);
    // You can add API call or state update here
  };

  return (
    <>
      <div className="bg-[#f8f9fa] rounded-lg shadow-sm p-[15px] h-full">
        <div className="flex items-start justify-between  mb-2 border-b border-gray-300 pb-2">
          <h2 className="text-[16px] font-medium text-gray-800">Account Details</h2>
          <button
            onClick={handleUpgradeClick}
            className="inline-flex items-center px-3 py-1 rounded bg-yellow-400 text-[11px] font-medium hover:bg-yellow-500 transition"
          >
            Upgrade Plan <Sparkles size={13} className="ml-1" />
          </button>
        </div>

      <div className="space-y-2 text-[14px] text-gray-800">
        <p>
          <span className="font-medium">Account Creation Date :</span>{" "}
          <span className="ml-1">{clientCRM.accountCreationDate}</span>
        </p>
        <p>
          <span className="font-medium">Account Expiry Date :</span>{" "}
          <span className="ml-1">{clientCRM.accountExpiryDate}</span>
        </p>
        <p>
          <span className="font-medium">Current Plan :</span>{" "}
          <span className="ml-1">{clientCRM.currentPlan}</span>
        </p>
      </div>
      </div>
      <SubscriptionPlanModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        currentPlan={clientCRM.currentPlan}
        onConfirm={handleConfirmPlan}
      />
    </>
  );
}

export default AccountDetailsCard;


