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
import { MachineNode, FlowData } from "../../../types/machine"; // ✅ Use FlowData

// **Example FlowData Structure**
const factoryFlow: FlowData[] = [
  {
    Name: "Heating Process",
    Head: {
      machine: {
        machine_id: "1",
        name: "Boiler",
        sensors: { temperature: 100, pressure: 1.2, vibration: 0.5 },
        dependencies: ["2"],
        manufacturer: "Siemens",
        prediction_status: true,
      },
    },
  },
  {
    Name: "Pumping Process",
    Head: {
      machine: {
        machine_id: "2",
        name: "Pump",
        sensors: { pressure: 2.0 },
        dependencies: ["3"],
        manufacturer: "ABB",
        prediction_status: true,
      },
    },
  },
  {
    Name: "Assembly Line",
    Head: {
      machine: {
        machine_id: "3",
        name: "Conveyor",
        sensors: { speed: 1.5 },
        dependencies: ["4"],
        manufacturer: "Bosch",
        prediction_status: true,
      },
    },
  },
  {
    Name: "Cooling Process",
    Head: {
      machine: {
        machine_id: "4",
        name: "Cooling System",
        sensors: { temperature: 20 },
        dependencies: [],
        manufacturer: "GE",
        prediction_status: true,
      },
    },
  },
];

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

const MachineGrid: React.FC = () => {
  const [flows, setFlows] = useState<FlowData[]>(factoryFlow);
  const [edges, setEdges] = useState<Edge[]>(
    factoryFlow.flatMap((flow) =>
      flow.Head.machine.dependencies.map((target) => ({
        id: `edge-${flow.Head.machine.machine_id}-${target}`,
        source: flow.Head.machine.machine_id,
        target: target,
        animated: true,
        style: { strokeWidth: 5, stroke: "black" },
        markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 },
      }))
    )
  );

  // Generate Flow Nodes (Group Nodes)
  const flowNodes: Node[] = flows.map((flow, index) => ({
    id: `flow-${flow.Name}`,
    position: { x: index * 500, y: 50 },
    data: { label: flow.Name },
    type: "flow",
  }));

  // Generate Machine Nodes
  const machineNodes: Node[] = flows.map((flow, index) => ({
    id: flow.Head.machine.machine_id,
    position: { x: index * 250 + 50, y: 200 },
    parentId: `flow-${flow.Name}`,
    draggable: true,
    data: {
      name: flow.Head.machine.name,
      sensors: flow.Head.machine.sensors,
      failed: !flow.Head.machine.prediction_status,
    },
    type: "machine",
  }));

  const nodes = [...flowNodes, ...machineNodes];

  // Handle Node Dragging
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setFlows((prevFlows) =>
      prevFlows.map((flow) => {
        const updatedNode = changes.find((change) => "id" in change && change.id === flow.Head.machine.machine_id);
        return updatedNode && "position" in updatedNode
          ? {
              ...flow,
              Head: {
                machine: {
                  ...flow.Head.machine,
                  position: updatedNode.position || { x: 0, y: 0 },
                },
              },
            }
          : flow;
      })
    );
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((prevEdges) => {
      const isExisting = prevEdges.some((edge) => edge.source === connection.source);
      return isExisting ? prevEdges : addEdge(connection, prevEdges);
    });
  }, []);

  const failMachine = (id: string) => {
    setFlows((prevFlows) =>
      prevFlows.map((flow) =>
        flow.Head.machine.machine_id === id
          ? { ...flow, Head: { machine: { ...flow.Head.machine, prediction_status: false } } }
          : flow
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
        zoomOnScroll={false}
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
