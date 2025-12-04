import React from "react";
import clientCRM from "../../data/client_crm";

function UpcomingNonWorkingDaysCard() {
  const { upcomingNonWorkingDays } = clientCRM;

  return (
    <div className="bg-green-50 rounded-lg shadow-sm p-[15px] h-full">
      <h2 className="text-[16px] font-medium mb-2 border-b border-gray-300 pb-2 text-gray-800">Upcoming Non-working days</h2>
      <ul className="space-y-2 text-[14px] text-gray-800">
        {upcomingNonWorkingDays.map((day) => (
          <li key={day.title}>
            <span className="font-medium">{day.title} :</span>{" "}
            <span className="ml-1">{day.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingNonWorkingDaysCard;


