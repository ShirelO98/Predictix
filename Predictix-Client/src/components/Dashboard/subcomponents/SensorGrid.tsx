import React, { useEffect } from "react";
import { Box } from "@mui/material";
import SensorCard from "./SensorCard";
import { MachineSensors } from "../../../types/machine";

interface SensorGridProps {
  machines: MachineSensors[]; // The raw API response
}

const SensorGrid: React.FC<SensorGridProps> = ({ machines }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f4f4f4",
      }}
    >
      {/* Render each machine with its SensorCard */}
      {machines.map((machine) => (
        <SensorCard key={machine.machine_id} machine={machine} />
      ))}
    </Box>
  );
};

export default SensorGrid;
