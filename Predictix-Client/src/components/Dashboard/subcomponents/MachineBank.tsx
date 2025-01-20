import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useDrag } from "react-dnd";
import { Machine } from "../../../types/machine";

interface MachineBankProps {
  onMachineSelect: (machine: Machine) => void;
  machines: Machine[];
}

const MachineBank: React.FC<MachineBankProps> = ({ onMachineSelect, machines }) => {
  return (
    <Box
      sx={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Machine Bank
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          overflowX: "scroll",
          padding: "10px",
        }}
      >
        {machines.map((machine) => (
          <DraggableMachine key={machine.machine_id} machine={machine} />
        ))}
      </Box>
    </Box>
  );
};

const DraggableMachine: React.FC<{ machine: Machine }> = ({ machine }) => {
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
        width: "200px",
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {machine.machine_name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Status: {machine.status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MachineBank;
