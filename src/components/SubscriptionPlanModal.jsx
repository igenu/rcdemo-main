import React from "react";
import { X, Check } from "lucide-react";

export default function SubscriptionPlanModal({
  isOpen,
  onClose,
  currentPlan,
  onConfirm,
}) {
  const [selectedPlan, setSelectedPlan] = React.useState(null);

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      isCurrent: currentPlan === "Basic Plan",
      color: "green",
      bg: "bg-green-50",
      border: "border-green-300",
      note: "Current Plan : Active",
    },
    {
      id: "standard",
      name: "Standard Plan",
      isCurrent: currentPlan === "Standard Plan",
      color: "blue",
      bg: "bg-[#e8f6ff]",
      border: "border-[#8cd3ff]",
      features: {
        title: "Key Features of Standard Plan",
        items: ["Most Popular Plan", "Upto three revisions", "Voice note exchange"],
      },
    },
    {
      id: "advanced",
      name: "Advanced Plan",
      isCurrent: currentPlan === "Advanced Plan",
      color: "yellow",
      bg: "bg-yellow-50",
      border: "border-yellow-300",
      features: { title: "Key Features of Advanced Plan", badge: null, items: [ "Extended Collaboration", "Unlimited Revisions", "Advanced Features" ] }
    },
  ];

  const handleConfirm = () => {
    if (selectedPlan) onConfirm(selectedPlan);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-xl rounded-xl p-6 shadow-lg relative">

        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-400">
          <h2 className="text-lg  font-semibold">Subscription Plan Upgrade Request</h2>
          <button onClick={onClose}>
            <X size={24} className="text-gray-500 hover:text-black" />
          </button>
        </div>

        <p className="mt-4 text-center text-gray-700 font-medium">
          Please Select Plan Type
        </p>

        {/* Plans */}
        <div className="mt-6 space-y-5">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => !plan.isCurrent && setSelectedPlan(plan.id)}
                className={`rounded-xl border-2 p-4 cursor-pointer relative transition-all 
                ${plan.isCurrent
                    ? `${plan.bg} ${plan.border}`
                    : isSelected
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-gray-50"
                }`}
              >
                {/* Check Icon on Top */}
                {isSelected && !plan.isCurrent && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white rounded-full border-2 border-blue-400 p-1">
                    <Check className="text-blue-500" size={18} />
                  </div>
                )}

                {/* Title + Current Badge */}
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {plan.isCurrent && (
                    <span className="mt-1 inline-block text-xs px-3 py-1 bg-pink-100 text-pink-600 rounded-full">
                      Current Plan : Active
                    </span>
                  )}
                </div>

                {/* Features Box */}
                {plan.features && isSelected && (
                  <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
                    <p className="font-semibold text-gray-700">
                      {plan.features.title}
                    </p>

                    <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                      {plan.features.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check size={16} className="text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {isSelected && (
                      <span className="flex items-center mt-3 w-32 text-xs px-4 py-1 bg-green-100 mx-auto text-green-700 rounded-full">
                        <Check size={15}className="mr-2" /> Plan Selected
                      </span>
                    )}
                  </div>
                )}

                {  !plan.isCurrent && !isSelected && (
                  <p className="mt-2 text-center text-sm text-gray-600 font-medium">
                    Click here to select plan
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            className="px-2 py-1 f-13 border border-red-300 rounded-lg hover:bg-red-100 text-red-500"
          >
            Cancel
          </button>

          <button
            disabled={true}
            onClick={handleConfirm}
            className={`px-2 py-1 f-13 cursor-not-allowed rounded-lg text-white transition-all 
              ${selectedPlan ? "bg-[#268471] hover:bg-[#1e5e52]" : "bg-gray-300 cursor-not-allowed"}
            `}
          >
            Confirm Your Plan →
          </button>
        </div>
      </div>
    </div>
  );
}
