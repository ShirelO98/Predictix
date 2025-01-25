import React, { useState, useEffect } from "react";
import { Card, Typography, Box, Divider } from "@mui/material";
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

  // Transform and set initial sensors data when machine changes
  useEffect(() => {
    const transformedSensors = transformToSensors(machine);
    setSensorsData(transformedSensors);
  }, [machine]);

  // Determine if all sensors are within their thresholds
  const isAllWithinThreshold = sensorsData.every(
    (sensor) => sensor.sensorValue <= sensor.thresholdValue
  );

  // Handle saving updated thresholds
  const handleSaveThresholds = (updatedSensors: Sensor[]) => {
    setSensorsData(updatedSensors); // Update the sensors data
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
        backgroundColor: isAllWithinThreshold ? "lightgreen" : "lightcoral", // Dynamic card color
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
      />

      <Divider sx={{ my: 1 }} />

      {/* Render Each Sensor */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {sensorsData.map(({ sensorName, sensorValue }) => (
          <Box key={sensorName} sx={{ flex: "1 1 45%" }}>
            <Typography variant="body1">
              {sensorName.charAt(0).toUpperCase() + sensorName.slice(1)}:{" "}
              {sensorValue.toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default SensorCard;
