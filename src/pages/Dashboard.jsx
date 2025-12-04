import React from "react";
import ConsultantCard from "../components/dashboard/ConsultantCard";
import AccountDetailsCard from "../components/dashboard/AccountDetailsCard";
import UpcomingNonWorkingDaysCard from "../components/dashboard/UpcomingNonWorkingDaysCard";
import MyProjectsCard from "../components/dashboard/MyProjectsCard";
import MilestoneApprovalCard from "../components/dashboard/MilestoneApprovalCard";
import Breadcrumb from "../components/Breadcrumb";

function Dashboard() {
  return (
    <div className=" space-y-6">
      <Breadcrumb />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <ConsultantCard />
        </div>
        <div className="md:col-span-1">
          <AccountDetailsCard />
        </div>
        <div className="md:col-span-1">
          <UpcomingNonWorkingDaysCard />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <MyProjectsCard />
        </div>
        <div className="md:col-span-1">
          <MilestoneApprovalCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;