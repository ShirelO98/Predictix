import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme, Box, Typography } from "@mui/material";
import SensorGrid from "../Dashboard/subcomponents/SensorGrid";
import { MachineSensors } from "../../types/machine";
import { SERVER_ADDRESS } from "../../../constants";

export default function AlertsSection() {
  const [alerts, setAlerts] = useState<MachineSensors[]>([]);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get(`${SERVER_ADDRESS}/alerts/1`)
      .then((response) => {
        console.log("API Response:", response.data);

        if (response.data?.machines) {
          const mappedAlerts = response.data.machines.map((machine: any) => ({
            machine_id: machine.machine_id,
            machine_name: machine.name || "Unknown",
            sensors: machine.sensors || {},
          }));
          setAlerts(mappedAlerts);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
        backgroundColor: theme.palette.mode === "dark" ? "#181818" : "white",
        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "20px",
          textAlign: "center",
          fontWeight: "bold",
          width: "100%",
        }}
      >
        Sensor Grid
      </Typography>
      <Box
        sx={{
          width: "90%", 
          maxWidth: "900px", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SensorGrid machines={alerts} />
      </Box>
    </Box>
  );
}
