import React from "react";
import { Card, Typography, Box, Divider } from "@mui/material";

interface SensorCardProps {
  machine: {
    machine_name: string;
    sensors: Record<string, number>; // Generic structure for sensors
  };
}

// Thresholds for critical states (define as needed)
const thresholds: Record<string, number> = {
  temperature: 70.0,
  pressure: 3.0,
  vibration: 4.5,
};

const SensorCard: React.FC<SensorCardProps> = ({ machine }) => {
  const { machine_name, sensors } = machine;

  const formatSensorName = (name: string) => {
    return name.replace(/_/g, " ").charAt(0).toUpperCase() + name.slice(1);
  };

  const getSensorStyles = (key: string, value: number) => {
    const isCritical = thresholds[key] !== undefined && value > thresholds[key];
    return {
      color: isCritical ? "red" : "inherit",
      fontWeight: isCritical ? "bold" : "normal",
    };
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: 3,
        marginBottom: "8px",
      }}
    >
      {/* Machine Name */}
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
        {machine_name}
      </Typography>
      <Divider sx={{ my: 1 }} />

      {/* Dynamically Render Sensors */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {Object.entries(sensors).map(([key, value]) => (
          <Box key={key} sx={{ flex: "1 1 45%" }}>
            <Typography
              variant="body1"
              sx={{
                ...getSensorStyles(key, value),
              }}
            >
              {formatSensorName(key)}: {value.toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default SensorCard;
