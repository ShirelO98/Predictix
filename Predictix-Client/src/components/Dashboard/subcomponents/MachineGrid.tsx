import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Grid2 from "@mui/material/Grid2";
import { Box, Button, Modal, Typography } from "@mui/material";
import MachineCard from "./MachineCard";
import MachineBank from "./MachineBank"; 
import { Machine } from "../../../types/machine";

interface MachineGridProps {
  machines: Machine[];
  onMachineDrop?: (machineId: string, newPosition: number) => void;
}

const MachineGrid: React.FC<MachineGridProps> = ({ machines, onMachineDrop }) => {
  const [machineList, setMachineList] = useState<Machine[]>(machines);
  const [bankOpen, setBankOpen] = useState(false);

  const [, drop] = useDrop(() => ({
    accept: "machine",
    drop: (item: Machine) => {
      setMachineList((prev) => [...prev, item]);
    },
  }));

  const handleOpenBank = () => setBankOpen(true);
  const handleCloseBank = () => setBankOpen(false);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Factory Grid
      </Typography>

      {/* Factory Grid */}
      <Grid2
        container
        spacing={2}
        ref={drop}
        sx={{
          padding: "20px",
          backgroundColor: "#f4f4f4",
          borderRadius: "10px",
          minHeight: "300px",
        }}
      >
        {machineList.map((machine, index) => (
          <Grid2 key={machine.machineID}>
            <MachineCard machine={machine} position={index} />
          </Grid2>
        ))}
      </Grid2>
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleOpenBank}
        >
          + Add Machine
        </Button>
      </Box>
      <Modal open={bankOpen} onClose={handleCloseBank}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Drag a Machine to the Factory Grid
          </Typography>
          <MachineBank onMachineSelect={(machine: Machine) => {
            setMachineList((prev) => [...prev, machine]);
            setBankOpen(false);
          }} />
        </Box>
      </Modal>
    </Box>
  );
};

export default MachineGrid;
