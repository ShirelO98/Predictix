import React, { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
  NodeTypes,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import MachineCard from "./MachineCard";
import { Machine, MachineNodeData,MachineNode,FlowData } from "../../../types/machine";

// Define factory sections dynamically
const sections = [
  { id: "heating", label: "Heating Section" },
  { id: "pumps", label: "Pumps Section" },
  { id: "assembly", label: "Assembly Line" },
  { id: "cooling", label: "Cooling Section" },
];

// Machines (Grouped Under Sections)
const initialMachines: Machine[] = [
  {
    machine_id: "1",
    name: "Boiler",
    sensors: { temperature: 100, pressure: 1.2, vibration: 0.5 },
    section: "heating",
    dependencies: ["2"],
    manufacturer: "Siemens",
    prediction_status: true,
  },
  {
    machine_id: "2",
    name: "Pump",
    sensors: { pressure: 2.0 },
    section: "pumps",
    dependencies: ["3"],
    manufacturer: "ABB",
    prediction_status: true,
  },
  {
    machine_id: "3",
    name: "Conveyor",
    sensors: { speed: 1.5 },
    section: "assembly",
    dependencies: ["4"],
    manufacturer: "Bosch",
    prediction_status: true,
  },
  {
    machine_id: "4",
    name: "Cooling System",
    sensors: { temperature: 20 },
    section: "cooling",
    dependencies: [],
    manufacturer: "GE",
    prediction_status: true,
  },
];

// Define custom node types (Machine & Group)
const nodeTypes: NodeTypes = {
  machine: MachineCard,
  section: ({ data }: { data: { label: string } }) => (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
        border: "2px solid green",
        textAlign: "center",
        fontWeight: "bold",
        padding: "10px",
      }}
    >
      {data.label}
    </div>
  ),
};

const MachineGrid: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [edges, setEdges] = useState<Edge[]>(
    initialMachines.flatMap((machine) =>
      machine.dependencies.map((target) => ({
        id: `edge-${machine.machine_id}-${target}`,
        source: machine.machine_id,
        target: target,
        animated: true,
        style: { strokeWidth: 5, stroke: "black" }, // Bolder connection arrows
        markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 },
      }))
    )
  );

  // Generate section (group) nodes dynamically
  const sectionNodes: Node[] = sections.map((section, index) => ({
    id: `section-${section.id}`,
    position: { x: index * 500, y: 50 },
    data: { label: section.label },
    type: "section",
  }));

  // Generate machine nodes dynamically
  const machineNodes: Node<MachineNodeData>[] = machines.map((machine, index) => ({
    id: machine.machine_id,
    position: { x: (index % 2) * 250 + 50, y: 200 },
    parentId: `section-${machine.section}`, // Assign to section (group)
    draggable: true, // Ensures nodes can be moved
    data: {
      name: machine.name,
      sensors: machine.sensors,
      failed: !machine.prediction_status,
    },
    type: "machine",
  }));

  const nodes = [...sectionNodes, ...machineNodes];

  // Handle Node Dragging
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setMachines((prevMachines) =>
      prevMachines.map((machine) => {
        const updatedNode = changes.find((change) => "id" in change && change.id === machine.machine_id);
        return updatedNode && "position" in updatedNode
          ? { ...machine, position: updatedNode.position || { x: 0, y: 0 } }
          : machine;
      })
    );
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges));
  }, []);

  // Ensure One Connection Per Machine
  const onConnect = useCallback((connection: Connection) => {
    setEdges((prevEdges) => {
      const isExisting = prevEdges.some((edge) => edge.source === connection.source);
      return isExisting ? prevEdges : addEdge(connection, prevEdges);
    });
  }, []);

  const failMachine = (id: string) => {
    setMachines((prevMachines) =>
      prevMachines.map((machine) =>
        machine.machine_id === id
          ? { ...machine, prediction_status: false }
          : machine
      )
    );
  };

  return (
    <div style={{ width: "100vw", height: "90vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Factory Grid</h2>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        panOnDrag
        zoomOnScroll={false} // Disables zooming
      >
        <Background color="#333" />
        <MiniMap pannable zoomable nodeStrokeWidth={3} nodeColor="green" />
        <Controls showZoom={false} />
      </ReactFlow>

      <button onClick={() => failMachine("2")} style={{ position: "absolute", top: 20, left: 20 }}>
        Simulate Pump Failure
      </button>
    </div>
  );
};

export default MachineGrid;
