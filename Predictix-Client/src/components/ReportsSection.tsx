import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { name: "Jan", failures: 3 },
  { name: "Feb", failures: 5 },
  { name: "Mar", failures: 2 },
];

export default function ReportsSection() {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="failures" stroke="#8884d8" />
    </LineChart>
  );
}
