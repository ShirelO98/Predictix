import React from "react";
import DashboardHome from "../Dashboard/DashboardHome";
import AlertsSection from "../Dashboard/AlertsSection";
import ReportsSection from "../Dashboard/ReportsSection";
import MachinesSection from "../Dashboard/MachinesSection";

export default function PageContent({ pathname }: { pathname: string }) {
  switch (pathname) {
    case "/dashboard":
      return <DashboardHome/>;
    case "/alerts":
      return <AlertsSection />;
    case "/reports":
      return <ReportsSection />;
    case "/machines":
      return <MachinesSection />;
    default:
      return <div>Page Not Found</div>;
  }
}
