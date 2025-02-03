import React from "react";
import { Box, useTheme } from "@mui/material";
import SensorCard from "./SensorCard";
import { MachineSensors } from "../../../types/machine";

interface SensorGridProps {
  machines: MachineSensors[];
}

const SensorGrid: React.FC<SensorGridProps> = ({ machines }) => {
  const theme = useTheme(); // Get the theme from MUI

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        border: `1px solid ${theme.palette.mode === "dark" ? "#444" : "#ccc"}`,
        borderRadius: "10px",
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#f4f4f4",
        color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
      }}
    >
      {machines.map((machine) => (
        <SensorCard key={machine.machine_id} machine={machine} />
      ))}
    </Box>
  );
};

export default SensorGrid;
