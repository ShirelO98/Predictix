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
import { FlowData, MachineNode } from "../../../types/machine";


const factoryFlows: FlowData[] = [
  {
    Name: "Heating Process",
    Head: {
      machine: {
        machine_id: "1",
        name: "Boiler",
        sensors: { temperature: 100, pressure: 1.2, vibration: 0.5 },
        manufacturer: "Siemens",
        prediction_status: true,
      },
      position: { x: 50, y: 200 }, // ✅ Added position
      next: {
        machine: {
          machine_id: "2",
          name: "Pump",
          sensors: { pressure: 2.0 },
          manufacturer: "ABB",
          prediction_status: true,
        },
        position: { x: 300, y: 200 }, // ✅ Added position
        next: null, // ✅ Works now
        critical: false,
      },
      critical: true,
    },
  },
];

// **Custom Node Types**
const nodeTypes: NodeTypes = {
  machine: MachineCard,
  flow: ({ data }: { data: { label: string } }) => (
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

// **Extract Edges from `next`**
const extractEdges = (node: MachineNode | null, edges: Edge[] = []): Edge[] => {
  if (!node || node.next === null) return edges;
  edges.push({
    id: `edge-${node.machine.machine_id}-${node.next.machine.machine_id}`,
    source: node.machine.machine_id,
    target: node.next.machine.machine_id,
    animated: true,
    style: { strokeWidth: 5, stroke: "black" },
    markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 },
  });
  return extractEdges(node.next, edges);
};

// **Extract Nodes from `next`**
const extractNodes = (node: MachineNode | null, nodes: Node[] = [], xOffset = 0): Node[] => {
  if (!node) return nodes;
  nodes.push({
    id: node.machine.machine_id,
    position: { x: xOffset, y: 200 },
    draggable: true,
    data: {
      name: node.machine.name,
      sensors: node.machine.sensors,
      failed: !node.machine.prediction_status,
    },
    type: "machine",
  });
  return extractNodes(node.next, nodes, xOffset + 250);
};

const MachineGrid: React.FC = () => {
  const [flows, setFlows] = useState<FlowData[]>(factoryFlows);
  const [edges, setEdges] = useState<Edge[]>(flows.flatMap((flow) => extractEdges(flow.Head)));

  // Generate Flow Nodes (Group Nodes)
  const flowNodes: Node[] = flows.map((flow, index) => ({
    id: `flow-${flow.Name}`,
    position: { x: index * 500, y: 50 },
    data: { label: flow.Name },
    type: "flow",
  }));

  // Generate Machine Nodes Dynamically
  const machineNodes: Node[] = flows.flatMap((flow) => extractNodes(flow.Head));

  const nodes = [...flowNodes, ...machineNodes];

  // **Recursive Function to Update Machine Position**
  const updateMachinePosition = (node: MachineNode | null, updatedNode: NodeChange): MachineNode | null => {
    if (!node) return node;
  
    // Ensure `updatedNode` is a position change
    if (updatedNode.type === "position" && "id" in updatedNode && updatedNode.id === node.machine.machine_id) {
      const positionChange = updatedNode as { position?: { x: number; y: number } }; // Type assertion
      return {
        ...node,
        position: positionChange.position ? positionChange.position : { x: 0, y: 0 }, // ✅ Safe position handling
      };
    }
  
    // **Recursively update `next` if it's not null**
    return {
      ...node,
      next: node.next !== null ? updateMachinePosition(node.next, updatedNode) : null,
    };
  };
  

  // **Handle Node Dragging**
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setFlows((prevFlows) =>
      prevFlows.map((flow) => {
        // Find the first change that has `id` and is a position change
        const updatedNode = changes.find((change) => change.type === "position" && "id" in change);
        if (!updatedNode) return flow; // Skip if no valid update

        return {
          ...flow,
          Head: updateMachinePosition(flow.Head, updatedNode)!,
        };
      })
    );
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((prevEdges) => addEdge(connection, prevEdges));
  }, []);

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
        zoomOnScroll={false} // **Prevents zooming**
      >
        <Background color="#333" />
        <MiniMap pannable zoomable nodeStrokeWidth={3} nodeColor="green" />
        <Controls showZoom={false} />
      </ReactFlow>
    </div>
  );
};

export default MachineGrid;
