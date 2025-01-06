import React, { useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import KeyMetrics from "./subcomponents/KeyMetrics";
import MachineStatusGraph from "./subcomponents/MachineStatusGraph";
import RecentAlerts from "./subcomponents/RecentAlerts";
import MachineGrid from "./subcomponents/MachineGrid";
import MachineBank from "./subcomponents/MachineBank";
import { Machine } from "../../types/machine";

const DashboardHome: React.FC = () => {
  const [factoryMachines, setFactoryMachines] = useState<Machine[]>([]); 
  const [bankOpen, setBankOpen] = useState(false); 

  const handleOpenBank = () => setBankOpen(true);
  const handleCloseBank = () => setBankOpen(false);

  
  const handleAddMachine = (machine: Machine) => {
    setFactoryMachines((prev) => [...prev, machine]);
    setBankOpen(false); 
  };

  return (
    <Box sx={{ p: 4 }}>
     
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Box sx={{ mb: 4 }}>
        <KeyMetrics />
      </Box>

     
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Factory Grid
        </Typography>
       
        <MachineGrid
          machines={factoryMachines}
          onMachineDrop={(machineId, newPosition) => {
            console.log(`Machine ${machineId} moved to position ${newPosition}`);
          }}
        />
        
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleOpenBank}>
            + Add Machine
          </Button>
        </Box>
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
            borderRadius: "8px",
            p: 4,
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Select a Machine to Add
          </Typography>
          <MachineBank onMachineSelect={handleAddMachine} />
        </Box>
      </Modal>

     
      <Box sx={{ mb: 4 }}>
        <MachineStatusGraph />
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Recent Alerts
        </Typography>
        <RecentAlerts />
      </Box>
    </Box>
  );
};

export default DashboardHome;
