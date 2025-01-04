import React from "react";
import DashboardHome from "./DashboardHome";
import AlertsSection from "./AlertsSection";
import ReportsSection from "./ReportsSection";
import MachinesSection from "./MachinesSection";

export default function PageContent({ pathname }: { pathname: string }) {
  switch (pathname) {
    case "/dashboard":
      return <DashboardHome />;
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
