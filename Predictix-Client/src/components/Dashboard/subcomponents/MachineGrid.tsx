import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Grid2 from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import MachineCard from "./MachineCard";
import { Machine } from "../../../types/machine";

interface MachineGridProps {
  machines: Machine[];
  onMachineDrop?: (machineId: string, newPosition: number) => void;
}

const MachineGrid: React.FC<MachineGridProps> = ({ machines, onMachineDrop }) => {
  const [machineList, setMachineList] = useState<Machine[]>(machines);

  const [, drop] = useDrop(() => ({
    accept: "machine",
    drop: (item: { id: string; machine: Machine }) => {
      if (!machineList.some((m) => m.machineID === item.id)) {
        setMachineList((prev) => [...prev, item.machine]);
        if (onMachineDrop) onMachineDrop(item.id, machineList.length);
      }
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
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Factory Grid
      </Typography>
      <Grid2 container spacing={2}>
        {machineList.map((machine, index) => (
          <Grid2 key={machine.machineID} >
            <MachineCard machine={machine} position={index} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default MachineGrid;
