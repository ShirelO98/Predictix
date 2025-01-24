import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Overview } from "../../../types/overview";

interface KeyMetricsProps {
  overview: Overview;
}

export default function KeyMetrics({ overview }: KeyMetricsProps) {
  const { needs_maintenance_machines, total_machines } = overview;
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Card sx={{ p: 2, flex: 1 }}>
        <Typography variant="h6">Active Machines</Typography>
        <Typography variant="h4">{total_machines}</Typography>
      </Card>
      <Card sx={{ p: 2, flex: 1 }}>
        <Typography variant="h6">Needs Maintenance</Typography>
        <Typography variant="h4" color="error">
          {needs_maintenance_machines}
        </Typography>
      </Card>
    </Box>
  );
}
