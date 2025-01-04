import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import BarChartIcon from "@mui/icons-material/BarChart";
import BuildIcon from "@mui/icons-material/Build";
import {
  AppProvider,
  type Router,
  type Navigation,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import logo from "../assets/logo.png";
import PageContent from "./PageContent";

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "alerts",
    title: "Alerts",
    icon: <NotificationImportantIcon />,
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
  },
  {
    segment: "machines",
    title: "Machines",
    icon: <BuildIcon />,
  },
];

export function DashboardLayoutSidebarCollapsed() {
  const [pathname, setPathname] = React.useState("/dashboard");

  const router = React.useMemo<Router>(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  }), [pathname]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src={logo} alt="Predictix Logo" style={{ width: "100%", height: "150px", objectFit: "contain" }} />,
        title: "Predictix",
        homeUrl: "/dashboard",
      }}
      router={router}
    >
      <DashboardLayout defaultSidebarCollapsed>
        <Box sx={{ py: 4 }}>
          <PageContent pathname={pathname} />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
