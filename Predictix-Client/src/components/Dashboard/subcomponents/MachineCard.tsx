import React from "react";
import { Handle, Position } from "reactflow";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface MachineNodeProps {
  data: {
    name: string;
    sensors: Record<string, number>;
    failed: boolean;
  };
}

const MachineCard: React.FC<MachineNodeProps> = ({ data }) => {
  return (
    <Card
      sx={{
        padding: "16px",
        borderRadius: "12px",
        textAlign: "center",
        minWidth: "220px",
        minHeight: "180px",
        backgroundColor: data.failed ? "#ffcccc" : "white",
        color: data.failed ? "black" : "black",
        boxShadow: data.failed ? "0px 0px 15px red" : "3px 3px 10px gray",
        border: data.failed ? "2px solid red" : "2px solid green",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {data.name}
        </Typography>
        <Box sx={{ textAlign: "left", mt: 1 }}>
          {Object.entries(data.sensors).map(([key, value]) => (
            <Typography key={key} variant="body2" sx={{ fontWeight: "bold" }}>
              {key.replace(/_/g, " ").toUpperCase()}: {value}
            </Typography>
          ))}
        </Box>
      </CardContent>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Card>
  );
};

export default MachineCard;
