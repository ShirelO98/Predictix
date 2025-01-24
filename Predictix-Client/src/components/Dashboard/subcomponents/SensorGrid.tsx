import React from "react";
import { Box } from "@mui/material";
import SensorCard from "./SensorCard";
import { MachineSensors } from "../../../types/machine";


const mapServerResponseToMachineSensors = (response: any): MachineSensors[] => {
  return response.machines.map((machine: any, index: number) => ({
    machine_id: `${index}`, 
    machine_name: machine.name,
    vibration: machine.sensors.vibration,
    temperature: machine.sensors.temperature,
    pressure: machine.sensors.pressure,
  }));
};

interface SensorGridProps {
  response: any; 
}

const SensorGrid: React.FC<SensorGridProps> = ({ response }) => {
  const machineSensors = mapServerResponseToMachineSensors(response);

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
