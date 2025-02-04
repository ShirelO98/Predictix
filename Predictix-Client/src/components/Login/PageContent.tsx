import React from "react";
import DashboardHome from "../Dashboard/DashboardHome";
import AlertsSection from "../Dashboard/AlertsSection";

export default function PageContent({ pathname }: { pathname: string }) {
  switch (pathname) {
    case "/dashboard":
      return <DashboardHome/>;
    case "/alerts":
      return <AlertsSection />;
    default:
      return <div>Page Not Found</div>;
  }
}
