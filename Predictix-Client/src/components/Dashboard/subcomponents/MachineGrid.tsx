import React from "react";
import { useDrop } from "react-dnd";
import Grid2 from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import MachineCard from "./MachineCard";
import { Machine } from "../../../types/machine";

interface MachineGridProps {
  machines: Machine[];
  onMachineDrop: (machine: Machine) => void;
  onMachineRemove: (machine: Machine) => void;
}

const MachineGrid: React.FC<MachineGridProps> = ({ machines, onMachineDrop, onMachineRemove }) => {
  const [, drop] = useDrop(() => ({
    accept: "machine",
    drop: (item: Machine) => {
      onMachineDrop(item); // Ensure drop only adds new machines
    },
  }));

  return (
    <Box
      ref={drop}
      sx={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f4f4f4",
        minHeight: "300px",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Factory Grid
      </Typography>
      <Grid2 container spacing={2}>
        {machines.map((machine) => (
          <Grid2 key={machine.machine_id} >
            <MachineCard
              machine={machine}
              onRemove={() => onMachineRemove(machine)}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default MachineGrid;
