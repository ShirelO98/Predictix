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
import logo from "../../assets/logo.png";
import PageContent from "../Login/PageContent";
import LogoutButton from "../Login/LogoutButton";

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon color="primary" />,
  },
  {
    segment: "alerts",
    title: "Alerts",
    icon: <NotificationImportantIcon color="secondary" />,
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon color="action" />,
  },
  {
    segment: "machines",
    title: "Machines",
    icon: <BuildIcon color="disabled" />,
  },
];

export default function DashboardLayoutSidebarCollapsed() {
  const [pathname, setPathname] = React.useState(
    localStorage.getItem("currentPath") || "/dashboard"
  );

  const router = React.useMemo<Router>(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => {
      setPathname(String(path));
      localStorage.setItem("currentPath", String(path));
    },
  }), [pathname]);

  React.useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("authToken");
    if (!isAuthenticated) {
      setPathname("/login");
    }
  }, []);

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
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, py: 1 }}>
          <LogoutButton />
        </Box>
        <Box sx={{ py: 4 }}>
          <PageContent pathname={pathname} />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
