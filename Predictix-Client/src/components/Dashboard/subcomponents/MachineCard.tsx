import React from "react";
import { Card, CardContent, Typography, Box, Chip, Divider } from "@mui/material";
import { Machine } from "../../../types/machine";

interface MachineCardProps {
  machine: Machine;
  position: number; 
}

const MachineCard: React.FC<MachineCardProps> = ({ machine }) => {
  const {
    machineName,
    vibration,
    temperature,
    pressure,
    status,
    lastMaintenanceDate,
    nextMaintenanceDate,
    upTime,
    downTime,
  } = machine;

  return (
    <Card
      sx={{
        border: "2px solid",
        borderColor: status === "Running" ? "green" : "red",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#f9f9f9",
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {machineName}
        </Typography>
        <Chip
          label={status}
          color={status === "Running" ? "success" : "error"}
          size="small"
          sx={{ mt: 1, mb: 2 }}
        />

        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="body2">
            <strong>Vibration:</strong> {vibration.toFixed(2)} m/s²
          </Typography>
          <Typography variant="body2">
            <strong>Temperature:</strong> {temperature.toFixed(1)}°C
          </Typography>
          <Typography variant="body2">
            <strong>Pressure:</strong> {pressure.toFixed(1)} bar
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="body2">
            <strong>Last Maintenance:</strong> {lastMaintenanceDate}
          </Typography>
          <Typography variant="body2">
            <strong>Next Maintenance:</strong> {nextMaintenanceDate}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="body2">
            <strong>Uptime:</strong> {upTime} hrs
          </Typography>
          <Typography variant="body2">
            <strong>Downtime:</strong> {downTime} hrs
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MachineCard;
