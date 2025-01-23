import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeyMetrics from "./subcomponents/KeyMetrics";
import MachineStatusGraph from "./subcomponents/MachineStatusGraph";
import RecentAlerts from "./subcomponents/RecentAlerts";
import MachineBank from "./subcomponents/MachineBank";
import MachineGrid from "./subcomponents/MachineGrid";
import { Machine } from "../../types/machine";
import { Overview } from "../../types/overview";
import axios from "axios";
import { SERVER_ADDRESS } from "../../../constants";



export default function DashboardHome() {
  const [factoryMachines, setFactoryMachines] = useState<Machine[]>([]);
  const [bankMachines, setBankMachines] = useState<Machine[]>([]);
  const [overview, setOverview] = useState<Overview>({ down_time_hours_next_7_days: 0, needs_maintenance_machines: 0, total_machines: 0 });
  useEffect(() => {
    // Fetch all machines from the database - Shirel...
    axios.get(`${SERVER_ADDRESS}/getTaggedByFactory/1`).then((response) => {
      setBankMachines(response.data);
    });
    // axios.get(`${SERVER_ADDRESS}/overview/1`).then((response) => { 
    //   setOverview(response.data);
    // });
  }, []);

  // Add machine to the grid, preventing duplicates
  const handleAddMachineToCompany = (machine: Machine) => {
    setFactoryMachines((prev) => [...prev, machine]);
    setBankMachines((prev) => prev.filter((m) => m.machine_id !== machine.machine_id));
  };

  // Remove machine from the grid
  const handleRemoveMachineFromCompany = (machine: Machine) => {
    setBankMachines((prev) => [...prev, machine]);
    setFactoryMachines((prev) => prev.filter((m) => m.machine_id !== machine.machine_id));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Box sx={{ mb: 4 }}>
        <KeyMetrics overview={overview} />
      </Box>

      <Box sx={{ display: "flex", gap: 4 }}>
        <MachineGrid
          machines={factoryMachines}
          onMachineDrop={handleAddMachineToCompany}
          onMachineRemove={handleRemoveMachineFromCompany}
        />

        <MachineBank onMachineSelect={handleAddMachineToCompany} machines={bankMachines} />
      </Box>

      

      
    </Box>
  );
}
