import React from "react";
import { useDrag } from "react-dnd";
import { Card, CardContent, Typography, Box, Chip, Divider } from "@mui/material";
import { Machine } from "../../../types/machine";

interface MachineCardProps {
  machine: Machine;
  position: number;
}

const MachineCard: React.FC<MachineCardProps> = ({ machine }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "machine",
    item: { id: machine.machineID, machine },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag}
      sx={{
        border: "2px solid",
        borderColor: machine.status === "Running" ? "green" : "red",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: isDragging ? "#f4f4f4" : "#f9f9f9",
        opacity: isDragging ? 0.5 : 1,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {machine.machineName}
        </Typography>
        <Chip label={machine.status} color={machine.status === "Running" ? "success" : "error"} size="small" />
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="body2">
            <strong>Vibration:</strong> {machine.vibration.toFixed(2)} m/s²
          </Typography>
          <Typography variant="body2">
            <strong>Temperature:</strong> {machine.temperature.toFixed(1)}°C
          </Typography>
          <Typography variant="body2">
            <strong>Pressure:</strong> {machine.pressure.toFixed(1)} bar
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MachineCard;
