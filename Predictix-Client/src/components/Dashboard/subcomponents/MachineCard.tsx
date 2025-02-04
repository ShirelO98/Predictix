import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Handle, Position } from "reactflow";
import { Machine } from "../../../types/machine";
interface MachineCardProps {
  data: Machine;
}
const MachineCard: React.FC<MachineCardProps> = ({ data: machine }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          padding: "16px",
          borderRadius: "12px",
          textAlign: "center",
          minWidth: "250px",
          minHeight: "200px",
          backgroundColor: machine.prediction_status ? "white" : "#ffcccc",
          color: "black",
          boxShadow: machine.prediction_status ? "3px 3px 10px gray" : "0px 0px 15px red",
          border: machine.prediction_status ? "2px solid green" : "2px solid red",
          cursor: "pointer" 
        }}
      >
        <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}>
            {machine.name}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}>
            {machine.manufacturer}
          </Typography>
        </CardContent>
        <Handle type="target" position={Position.Right} />
        <Handle type="source" position={Position.Left} />
      </Card>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{machine.name} - Details</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}>
            <strong>Manufacturer:</strong> {machine.manufacturer}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}>
            <strong>Machine ID:</strong> {machine.machine_id}
          </Typography>
          <Typography variant="subtitle1"sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}>
            <strong>Prediction Status:</strong> {machine.prediction_status ? "Good" : "Warning"}
          </Typography>
          {machine.down_time !== undefined && (
            <Typography variant="subtitle1">
              <strong>Down Time:</strong> {machine.down_time}
            </Typography>
          )}
          {machine.up_time !== undefined && (
            <Typography variant="subtitle1">
              <strong>Up Time:</strong> {machine.up_time}
            </Typography>
          )}
          {machine.last_maintenance_date && (
            <Typography variant="subtitle1">
              <strong>Last Maintenance Date:</strong>{" "}
              {new Date(machine.last_maintenance_date).toLocaleDateString()}
            </Typography>
          )}
          {machine.next_maintenance_date && (
            <Typography variant="subtitle1">
              <strong>Next Maintenance Date:</strong>{" "}
              {new Date(machine.next_maintenance_date).toLocaleDateString()}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MachineCard;
