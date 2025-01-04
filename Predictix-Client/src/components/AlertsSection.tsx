import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const alerts = [
  { id: 1, machine: "Machine A", message: "High vibration detected" },
  { id: 2, machine: "Machine B", message: "Temperature anomaly" },
];

export default function AlertsSection() {
  return (
    <List>
      {alerts.map((alert) => (
        <ListItem key={alert.id}>
          <ListItemText primary={alert.machine} secondary={alert.message} />
        </ListItem>
      ))}
    </List>
  );
}
