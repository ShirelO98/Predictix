import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export default function KeyMetrics() {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Card sx={{ p: 2, flex: 1 }}>
        <Typography variant="h6">Active Machines</Typography>
        <Typography variant="h4">42</Typography>
      </Card>
      <Card sx={{ p: 2, flex: 1 }}>
        <Typography variant="h6">Needs Maintenance</Typography>
        <Typography variant="h4" color="error">
          5
        </Typography>
      </Card>
      <Card sx={{ p: 2, flex: 1 }}>
        <Typography variant="h6">Downtime (Hours) next 7 days</Typography>
        <Typography variant="h4">12</Typography>
      </Card>
    </Box>
  );
}
