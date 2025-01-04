import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
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

// Navigation items
const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "alerts",
    title: "Alerts",
    icon: <NotificationImportantIcon />, // Icon for alerts
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />, // Icon for reports
  },
  {
    segment: "machines",
    title: "Machines",
    icon: <BuildIcon />, // Icon for machines
  },
];

// Theme configuration
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Content for each section
function PageContent({ pathname }: { pathname: string }) {
  switch (pathname) {
    case "/dashboard":
      return (
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Welcome to the Dashboard!
        </Typography>
      );
    case "/alerts":
      return (
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Alerts Section: View all active and past alerts here.
        </Typography>
      );
    case "/reports":
      return (
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Reports Section: Generate and view reports here.
        </Typography>
      );
    case "/machines":
      return (
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Machines Section: Monitor machine statuses here.
        </Typography>
      );
    default:
      return (
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Page Not Found
        </Typography>
      );
  }
}

// Component props interface
interface DemoProps {
  window?: () => Window;
}

// Main component
export function DashboardLayoutSidebarCollapsed(props: DemoProps) {
  const { window } = props;

  const [pathname, setPathname] = React.useState("/dashboard");

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: (
          <img
            src={logo}
            alt="MUI logo"
            style={{ width: "100%", height: "150px", objectFit: "contain" }}
          />
        ),
        title: "Predictix",
        homeUrl: "/toolpad/core/introduction",
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout defaultSidebarCollapsed>
        <Box sx={{ py: 4 }}>
          <PageContent pathname={pathname} />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
