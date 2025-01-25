import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeyMetrics from "./subcomponents/KeyMetrics";
import MachineGrid from "./subcomponents/MachineGrid";
import { Machine } from "../../types/machine";
import { Overview } from "../../types/overview";
import axios from "axios";
import { SERVER_ADDRESS } from "../../../constants";

export default function DashboardHome() {
  const [factoryMachines, setFactoryMachines] = useState<Machine[]>([]);
  const [overview, setOverview] = useState<Overview>({ needs_maintenance_machines: 0, total_machines: 0 });
  
  useEffect(() => {
    // Fetch all machines from the database - Shirel...
    axios.get(`${SERVER_ADDRESS}/getTaggedByFactory/1`).then((response) => {
      setFactoryMachines(response.data.machines);
    }).then(() => {
      setOverview({
        needs_maintenance_machines: factoryMachines.filter((machine) => machine.prediction_status != 1).length,
        total_machines: factoryMachines.length
      });
    });
  }, [factoryMachines]);

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
        />
      </Box>
    </Box>
  );
}
