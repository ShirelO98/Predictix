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

  // Handle adding machines to the grid
  const handleAddMachine = (machine: Machine) => {
    setFactoryMachines((prev) => [...prev, machine]);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Key Metrics Section */}
      <Box sx={{ mb: 4 }}>
        <KeyMetrics />
      </Box>

      {/* Machine Grid and Machine Bank */}
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Factory Grid */}
        <MachineGrid
          machines={factoryMachines}
          onMachineDrop={(machineId, newPosition) => {
            console.log(`Machine ${machineId} moved to position ${newPosition}`);
          }}
        />

        {/* Machine Bank */}
        <MachineBank onMachineSelect={handleAddMachine} />
      </Box>

    </Box>
  );
}
