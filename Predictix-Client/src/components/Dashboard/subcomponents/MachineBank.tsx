import React from "react";
import { Box, Typography } from "@mui/material";
import { Machine } from "../../../types/machine";
import MachineCard from "./MachineCard";

interface MachineBankProps {
  onMachineSelect: (machine: Machine) => void;
}

const machinesFromDatabase: Machine[] = [
  {
    machineID: "M001",
    machineName: "Machine A",
    vibration: 5.5,
    temperature: 75.3,
    pressure: 3.1,
    status: "Running",
    lastMaintenanceDate: "2023-12-10",
    nextMaintenanceDate: "2024-01-15",
    upTime: 120,
    downTime: 5,
  },
  {
    machineID: "M002",
    machineName: "Machine B",
    vibration: 3.2,
    temperature: 68.7,
    pressure: 2.9,
    status: "Stopped",
    lastMaintenanceDate: "2023-12-05",
    nextMaintenanceDate: "2024-01-10",
    upTime: 200,
    downTime: 15,
  },
];

const MachineBank: React.FC<MachineBankProps> = ({ onMachineSelect }) => {
  return (
    <Box sx={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
      <Typography variant="h5" gutterBottom>
        Machine Bank
      </Typography>
      <Box sx={{ display: "flex", gap: "10px", overflowX: "scroll", padding: "10px" }}>
        {machinesFromDatabase.map((machine) => (
          <MachineCard key={machine.machineID} machine={machine} position={0} />
        ))}
      </Box>
    </Box>
  );
};

export default MachineBank;
