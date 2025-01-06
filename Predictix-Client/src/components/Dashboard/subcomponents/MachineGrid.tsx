import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Grid2 from '@mui/material/Grid2';
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
    drop: (item: { id: string; position: number }, monitor) => {
      const draggedMachineIndex = item.position;
      const targetMachineIndex = machineList.findIndex((m) => m.machineID === item.id);

      if (draggedMachineIndex !== targetMachineIndex) {
        const updatedMachines = [...machineList];
        const [draggedMachine] = updatedMachines.splice(draggedMachineIndex, 1);
        updatedMachines.splice(targetMachineIndex, 0, draggedMachine);
        setMachineList(updatedMachines);

        if (onMachineDrop) {
          onMachineDrop(item.id, targetMachineIndex);
        }
      }
    },
  }));

  return (
    <Grid2
      container
      spacing={2}
      ref={drop}
      sx={{ padding: "20px", backgroundColor: "#f4f4f4", borderRadius: "10px" }}
    >
    {machineList.map((machine, index) => (
    <Grid2 >
       <MachineCard machine={machine} position={index} />
     </Grid2>
      ))}
    </Grid2>
  );
};

export default MachineGrid;
