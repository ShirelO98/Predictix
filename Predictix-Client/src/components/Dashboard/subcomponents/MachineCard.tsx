import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { Machine } from "../../../types/machine";

interface MachineCardProps {
  machine: Machine;
  index: number;
  moveMachine: (dragIndex: number, hoverIndex: number) => void;
}

const predictionStatusTheme = [
  {borderColor: "orange"},
  {borderColor: "green"},
]

const MachineCard: React.FC<MachineCardProps> = ({ machine, index, moveMachine }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "machine",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "machine",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveMachine(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <Card
      ref={ref}
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
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {machine.name}
        </Typography>
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
