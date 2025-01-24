import React from "react";
import { Box } from "@mui/material";
import SensorCard from "./SensorCard";

interface SensorGridProps {
  response: any; // The raw API response
}

const mapServerResponseToMachineSensors = (response: any): any[] => {
  if (!response?.machines || response.machines.length === 0) {
    console.error("No machines found in response:", response);
    return [];
  }

  // Map API response to a more generic structure
  return response.machines.map((machine: any, index: number) => ({
    machine_id: `${index}`,
    machine_name: machine.name || "Unnamed Machine",
    sensors: machine.sensors || {}, // Pass the full sensors object
  }));
};

const SensorGrid: React.FC<SensorGridProps> = ({ response }) => {
  const machineSensors = mapServerResponseToMachineSensors(response);

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
      {machineSensors.map((machine) => (
        <SensorCard key={machine.machine_id} machine={machine} />
      ))}
    </Box>
  );
};

export default SensorGrid;
