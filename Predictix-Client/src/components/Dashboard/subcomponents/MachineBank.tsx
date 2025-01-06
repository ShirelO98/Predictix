import React from "react";
import { useDrag } from "react-dnd";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Machine } from "../../../types/machine";

interface MachineBankProps {
  onMachineSelect: (machine: Machine) => void;
}

const machinesFromDatabase: Machine[] = [
  {
    machineID: "M001",
    machineName: "Machine A",
    vibration: 5.5,
    temperature: 75.3,
    pressure: 3.1,
    status: "Running",
    lastMaintenanceDate: "2023-12-10",
    nextMaintenanceDate: "2024-01-15",
    upTime: 120,
    downTime: 5,
  },
  {
    machineID: "M002",
    machineName: "Machine B",
    vibration: 3.2,
    temperature: 68.7,
    pressure: 2.9,
    status: "Stopped",
    lastMaintenanceDate: "2023-12-05",
    nextMaintenanceDate: "2024-01-10",
    upTime: 200,
    downTime: 15,
  },
];

const MachineBank: React.FC<MachineBankProps> = ({ onMachineSelect }) => {
  return (
    <Box sx={{ display: "flex", gap: "10px", overflowX: "scroll", padding: "10px" }}>
      {machinesFromDatabase.map((machine) => (
        <DraggableMachine key={machine.machineID} machine={machine} />
      ))}
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
          {machine.machineName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Status: {machine.status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MachineBank;
