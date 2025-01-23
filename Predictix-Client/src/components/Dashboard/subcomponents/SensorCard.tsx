import React from "react";
import { Card, Typography, Box, Divider } from "@mui/material";
import { MachineSensors } from "../../../types/machine";

interface SensorCardProps {
  machine: MachineSensors;
}

// Thresholds definition
const thresholds = {
  vibration: 4.5,
  temperature: 70.0,
  pressure: 3.0,
};

// Helper function to determine critical states and styles
const getSensorStyles = (machine: MachineSensors) => {
  const isVibrationCritical = machine.vibration > thresholds.vibration;
  const isTemperatureCritical = machine.temperature > thresholds.temperature;
  const isPressureCritical = machine.pressure > thresholds.pressure;

  const isCritical = isVibrationCritical || isTemperatureCritical || isPressureCritical;

  return {
    cardStyles: {
      backgroundColor: isCritical ? "#ffebeb" : "#f9f9f9", // Red tint for critical
      border: `2px solid ${isCritical ? "#ff0000" : "#ccc"}`, // Red border for critical
    },
    textStyles: {
      vibrationColor: isVibrationCritical ? "red" : "inherit",
      temperatureColor: isTemperatureCritical ? "red" : "inherit",
      pressureColor: isPressureCritical ? "red" : "inherit",
    },
  };
};

const SensorCard: React.FC<SensorCardProps> = ({ machine }) => {
  const { cardStyles, textStyles } = getSensorStyles(machine);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: 3,
        marginBottom: "8px",
        ...cardStyles, 
      }}
    >
      {/* Machine Name */}
      <Box
        sx={{
          flex: 1,
          padding: "0 16px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {machine.machine_name}
        </Typography>
        <Divider sx={{ my: 1 }} />
      </Box>

      {/* Sensor Data */}
      <Box
        sx={{
          flex: 2,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: textStyles.vibrationColor,
          }}
        >
          Vibration: <span>{machine.vibration.toFixed(2)} m/s²</span>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: textStyles.temperatureColor,
          }}
        >
          Temperature: <span>{machine.temperature.toFixed(1)}°C</span>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: textStyles.pressureColor,
          }}
        >
          Pressure: <span>{machine.pressure.toFixed(1)} bar</span>
        </Typography>
      </Box>
    </Card>
  );
};

export default SensorCard;
