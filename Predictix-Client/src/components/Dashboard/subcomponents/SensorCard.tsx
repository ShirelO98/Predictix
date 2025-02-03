import React, { useState, useEffect } from "react";
import { Card, Typography, Box, Divider, useTheme } from "@mui/material";
import { MachineSensors } from "../../../types/machine";
import { Sensor } from "../../../types/Sensor";
import SensorsThresholdButton from "./SensorsThresholdButton";

interface SensorCardProps {
  machine: MachineSensors;
}

// Function to transform machine sensors into a list of Sensor objects
const transformToSensors = (machine: MachineSensors): Sensor[] =>
  Object.entries(machine.sensors).map(([sensorName, { value, threshold }]) => ({
    machineID: machine.machine_id,
    sensorName,
    sensorValue: value,
    thresholdValue: threshold,
  }));

const SensorCard: React.FC<SensorCardProps> = ({ machine }) => {
  const { machine_name } = machine;
  const [sensorsData, setSensorsData] = useState<Sensor[]>([]);
  const theme = useTheme(); // Get the theme from MUI

  // Transform and set initial sensors data when machine changes
  useEffect(() => {
    const transformedSensors = transformToSensors(machine);
    setSensorsData(transformedSensors);
  }, [machine]);

  // Handle saving updated thresholds
  const handleSaveThresholds = (updatedSensors: Sensor[]) => {
    setSensorsData(updatedSensors);
  };

  // Get styles for each sensor's text based on its threshold
  const getSensorStyles = (sensor: Sensor) => {
    const isWithinThreshold = sensor.sensorValue <= sensor.thresholdValue;
    return {
      color: isWithinThreshold ? "green" : "red",
      fontWeight: "bold",
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
        backgroundColor: theme.palette.mode === "dark" ? "#1E1E1E" : "white",
        color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
      }}
    >
      {/* Machine Name */}
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
        {machine_name}
      </Typography>

      {/* Threshold Button */}
      <SensorsThresholdButton
        sensors={sensorsData}
        onSaveThresholds={handleSaveThresholds}
        machineID={machine.machine_id}
      />

      <Divider sx={{ my: 1, backgroundColor: theme.palette.mode === "dark" ? "#444" : "#ccc" }} />

      {/* Render Each Sensor */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {sensorsData.map((sensor) => (
          <Box key={sensor.sensorName} sx={{ flex: "1 1 45%" }}>
            <Typography
              variant="body1"
              sx={getSensorStyles(sensor)}
            >
              {sensor.sensorName.charAt(0).toUpperCase() + sensor.sensorName.slice(1)}
              : {sensor.sensorValue.toFixed(2)} (Threshold: {sensor.thresholdValue})
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default SensorCard;
