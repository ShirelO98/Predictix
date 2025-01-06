import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeyMetrics from "./subcomponents/KeyMetrics";
import MachineStatusGraph from "./subcomponents/MachineStatusGraph";
import RecentAlerts from "./subcomponents/RecentAlerts";
import MachineBank from "./subcomponents/MachineBank";
import MachineGrid from "./subcomponents/MachineGrid";

export default function DashboardHome() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      {/* כרטיסי מידע מרכזיים */}
      <Box sx={{ mb: 4 }}>
        <KeyMetrics />
      </Box>
      {/* גרף מצב מכונות */}
     
      {/* התראות אחרונות */}
      
    </Box>
  );
}
