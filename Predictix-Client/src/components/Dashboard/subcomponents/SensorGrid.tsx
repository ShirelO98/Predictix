import React from "react";
import { Box } from "@mui/material";
import SensorCard from "./SensorCard";
import { MachineSensors } from "../../../types/machine";

interface SensorGridProps {
  machineSensors: MachineSensors[];
}

const SensorGrid: React.FC<SensorGridProps> = ({ machineSensors }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f4f4f4",
      }}
    >
      {machineSensors.map((machine) => (
        <SensorCard key={machine.machine_id} machine={machine} />
      ))}
    </Box>
  );
};

export default SensorGrid;
