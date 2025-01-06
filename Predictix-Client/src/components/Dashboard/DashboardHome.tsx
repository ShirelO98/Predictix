import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeyMetrics from "./subcomponents/KeyMetrics";
import MachineStatusGraph from "./subcomponents/MachineStatusGraph";
import RecentAlerts from "./subcomponents/RecentAlerts";
import MachineBank from "./subcomponents/MachineBank";
import MachineGrid from "./subcomponents/MachineGrid";
import { Machine } from "../../types/machine";

export default function DashboardHome() {
  const [factoryMachines, setFactoryMachines] = useState<Machine[]>([]);

  // Add machine to the grid, preventing duplicates
  const handleAddMachine = (machine: Machine) => {
    setFactoryMachines((prev) => {
      if (!prev.some((m) => m.machineID === machine.machineID)) {
        return [...prev, machine];
      }
      return prev; // If duplicate, return the current state
    });
  };

  // Remove machine from the grid
  const handleRemoveMachine = (machineID: string) => {
    setFactoryMachines((prev) => prev.filter((machine) => machine.machineID !== machineID));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Box sx={{ mb: 4 }}>
        <KeyMetrics />
      </Box>

      <Box sx={{ display: "flex", gap: 4 }}>
        <MachineGrid
          machines={factoryMachines}
          onMachineDrop={handleAddMachine}
          onMachineRemove={handleRemoveMachine}
        />

        <MachineBank onMachineSelect={handleAddMachine} />
      </Box>

      <Box sx={{ mt: 4 }}>
        <MachineStatusGraph />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Alerts
        </Typography>
        <RecentAlerts />
      </Box>
    </Box>
  );
}
