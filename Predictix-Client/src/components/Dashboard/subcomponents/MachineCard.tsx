import React, { useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Handle, Position } from "reactflow";
import { Machine } from "../../../types/machine"; 

interface MachineCardProps {
  data: Machine;
}

const MachineCard: React.FC<MachineCardProps> = ({ data: machine }) => {
  return (
    <Card
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
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {machine.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "gray" }}>
          {machine.manufacturer}
        </Typography>
      </CardContent>
      <Handle type="target" position={Position.Right} />
      <Handle type="source" position={Position.Left} />
    </Card>
  );
};

export default MachineCard;
