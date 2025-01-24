import React from "react";
import { useDrag } from "react-dnd";
import { Card, CardContent, Typography, Box, Chip, Divider, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Machine } from "../../../types/machine";

interface MachineCardProps {
  machine: Machine;
  onRemove?: () => void;
}

const predictionStatusTheme = [
  {borderColor: "orange"},
  {borderColor: "green"},
]

const MachineCard: React.FC<MachineCardProps> = ({ machine, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "machine",
    item: machine,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag}
      sx={{
        border: "2px solid",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: isDragging ? "#f4f4f4" : "#f9f9f9",
        opacity: isDragging ? 0.5 : 1,
        boxShadow: 3,
        position: "relative",
        ...predictionStatusTheme[machine.prediction_status],
      }}
    >
      {/* Delete Button */}
      {onRemove && <IconButton
        onClick={onRemove}
        sx={{ position: "absolute", top: "8px", right: "8px" }}
        size="small"
        color="error"
      >
        <CloseIcon />
      </IconButton>}

      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {machine.name}
        </Typography>
        <Chip
          label={machine.status}
          color={machine.status === "Running" ? "success" : "default"}
          size="small"
        />
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="body2">
            <strong>Type:</strong> {machine.type}
          </Typography>
          <Typography variant="body2">
            <strong>Manufacturer:</strong> {machine.manufacturer}
          </Typography>
          {machine.vibration !== undefined && (
            <Typography variant="body2">
              <strong>Vibration:</strong> {machine.vibration.toFixed(2)} m/s²
            </Typography>
          )}
          {machine.temperature !== undefined && (
            <Typography variant="body2">
              <strong>Temperature:</strong> {machine.temperature.toFixed(1)}°C
            </Typography>
          )}
          {machine.pressure !== undefined && (
            <Typography variant="body2">
              <strong>Pressure:</strong> {machine.pressure.toFixed(1)} bar
            </Typography>
          )}
          {machine.last_maintenance_date && (
            <Typography variant="body2">
              <strong>Last Maintenance:</strong>{" "}
              {new Date(machine.last_maintenance_date).toLocaleDateString()}
            </Typography>
          )}
          {machine.next_maintenance_date && (
            <Typography variant="body2">
              <strong>Next Maintenance:</strong>{" "}
              {new Date(machine.next_maintenance_date).toLocaleDateString()}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MachineCard;
