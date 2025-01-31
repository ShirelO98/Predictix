import React, { useState, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import MachineCard from "./MachineCard";
import { Machine } from "../../../types/machine";
import axios from "axios";

const machinesData: Node<Machine>[] = [
  {
    id: "1",
    type: "machine",
    position: { x: 100, y: 100 },
    data: {
      machine_id: "1",
      name: "Machine 1",
      sensors: {},
      manufacturer: "A",
      prediction_status: true,
    },
  },
  {
    id: "2",
    type: "machine",
    position: { x: 100, y: 100 },
    data: {
      machine_id: "2",
      name: "Machine 2",
      sensors: {},
      manufacturer: "A",
      prediction_status: true,
    },
  },
  {
    id: "3",
    type: "machine",
    position: { x: 100, y: 100 },
    data: {
      machine_id: "3",
      name: "Machine 3",
      sensors: {},
      manufacturer: "B",
      prediction_status: true,
    },
  },
  {
    id: "4",
    type: "machine",
    position: { x: 100, y: 100 },
    data: {
      machine_id: "4",
      name: "Machine 4",
      sensors: {},
      manufacturer: "B",
      prediction_status: true,
    },
  },
  {
    id: "5",
    type: "machine",
    position: { x: 100, y: 100 },
    data: {
      machine_id: "5",
      name: "Machine 5",
      sensors: {},
      manufacturer: "C",
      prediction_status: true,
    },
  },
  {
    id: "6",
    type: "machine",
    position: { x: 100, y: 100 },
    data: {
      machine_id: "6",
      name: "Machine 6",
      sensors: {},
      manufacturer: "C",
      prediction_status: true,
    },
  },
  {
    id: "7",
    type: "machine",
    position: { x: 100, y: 100 },
    data: {
      machine_id: "7",
      name: "Machine 7",
      sensors: {},
      manufacturer: "D",
      prediction_status: true,
    },
  },
  {
    id: "8",
    type: "machine",
    position: { x: 100, y: 100 },
    data: {
      machine_id: "8",
      name: "Machine 8",
      sensors: {},
      manufacturer: "E",
      prediction_status: true,
    },
  },
  {
    id: "9",
    type: "machine",
    position: { x: 100, y: 100 },
    data: {
      machine_id: "9",
      name: "Machine 9",
      sensors: {},
      manufacturer: "F",
      prediction_status: true,
    },
  },
];

const edgesData: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
  { id: "e5-6", source: "5", target: "6", animated: true },
  { id: "e2-7", source: "2", target: "7", animated: true },
  { id: "e4-7", source: "4", target: "7", animated: true },
  { id: "e6-7", source: "6", target: "7", animated: true },
  { id: "e7-8", source: "7", target: "8", animated: true },
  { id: "e8-9", source: "8", target: "9", animated: true },
];

const calculateDistanceFromHead = (machine_id: string, head_ids: string[], edges: Edge[], distance = 1): { distance: number, head_id: string } => {
  if (head_ids.includes(machine_id)) return {distance, head_id: machine_id};
  const relevant_edges = edges.filter((edge) => edge.target === machine_id);
  let machine_heads = relevant_edges.map((edge) => calculateDistanceFromHead(edge.source, head_ids, edges, distance + 1));
  machine_heads = machine_heads.sort((a, b) => a.distance - b.distance);
  return machine_heads[0];
}

interface FlowHead {
  id: string;
  y?: number;
}

const setMachinesPosition = (machines: Node<Machine>[], edges: Edge[]) => {
  const x_offset = 400;
  const y_offset = 400;

  const flow_head_ids: FlowHead[] = machines.filter((machine) =>
    edges.filter((edge) => edge.target === machine.id).length === 0
  ).map((machine, index) => ({ id: machine.id, y: y_offset * index }));
  return machines.map((machine) => {
    const { distance, head_id } = calculateDistanceFromHead(machine.id, flow_head_ids.map((flow_head) => flow_head.id), edges);
    const head = flow_head_ids.find((flow_head) => flow_head.id === head_id);
    machine.position = { x: x_offset * distance, y: head?.y || 0 };
    return machine;
  });
};

const machineCardTypes: NodeTypes = {
  machine: MachineCard,
};

const MachineGrid: React.FC = () => {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [machines, setMachines] = useState<Node<Machine>[]>([]);

  useEffect(() => {
    setMachines(setMachinesPosition(machinesData, edgesData));
    setEdges(edgesData);
    // axios.get("http://localhost:5000/machines").then((response) => {
    //   setMachines(response.data);
    // });
    // axios.get("http://localhost:5000/edges").then((response) => {
    //   setEdges(response.data);
    // }
  }, []);

  return (
    <div style={{ width: "100vw", height: "90vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Factory Grid</h2>
      <ReactFlow
        nodes={machines}
        edges={edges}
        nodeTypes={machineCardTypes}
        fitView
        panOnDrag
        zoomOnScroll={false}
      >
        <Background color="#333" />
        <MiniMap pannable zoomable nodeStrokeWidth={3} nodeColor="green" />
        <Controls showZoom={false} />
      </ReactFlow>
    </div>
  );
};

export default MachineGrid;
