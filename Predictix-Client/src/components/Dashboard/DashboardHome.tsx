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
    axios.get(`${SERVER_ADDRESS}/getTaggedByFactory/1`).then((response) => {
      setFactoryMachines(response.data.machines);
      setOverview({
        needs_maintenance_machines: response.data.machines.filter((machine: Machine) => machine.prediction_status != true).length,
        total_machines: response.data.machines.length
      });
    });
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}>
        Dashboard Overview
      </Typography>
      <Box sx={{ mb: 4 }}>
        <KeyMetrics overview={overview} />
      </Box>
      <Box sx={{ display: "flex", gap: 4 }}>
        <MachineGrid
          machines={factoryMachines}
          onReorder={setFactoryMachines}
        />
      </Box>
    </Box>
  );
}
