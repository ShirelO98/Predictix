import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { name: "Jan", active: 40, inactive: 5 },
  { name: "Feb", active: 38, inactive: 7 },
  { name: "Mar", active: 42, inactive: 3 },
];

export default function MachineStatusGraph() {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="active" stroke="#82ca9d" />
      <Line type="monotone" dataKey="inactive" stroke="#ff7300" />
    </LineChart>
  );
}
