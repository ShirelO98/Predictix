
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
import axios from "axios";
import MachineCard from "./MachineCard"; 
import { SERVER_ADDRESS } from "../../../../constants";
import { Machine, EdgeWithHead, FlowHead } from "../../../types/machine";


const calculateDistanceFromHead = (
  machine_id: string,
  head_ids: string[],
  edges: Edge[],
  distance = 1
): { distance: number; head_id: string } => {
  machine_id = machine_id.toString();
  head_ids = head_ids.map((id) => id.toString());

  if (head_ids.includes(machine_id)) {
    return { distance, head_id: machine_id };
  }

  const relevant_edges = edges.filter(
    (edge) => edge.target.toString() === machine_id
  );

  if (relevant_edges.length === 0) {
    console.warn(`No edges found for machine_id: ${machine_id}`);
    return { distance: Infinity, head_id: "" };
  }

  const machine_heads = relevant_edges
    .map((edge) =>
      calculateDistanceFromHead(edge.source.toString(), head_ids, edges, distance + 1)
    )
    edges.filter(({ id, source, target }) => id && source && target)

  if (machine_heads.length === 0) {
    console.warn(` No valid heads found for machine_id: ${machine_id}`);
    return { distance: Infinity, head_id: "" };
  }

  machine_heads.sort((a, b) => a.distance - b.distance);
  return machine_heads[0];
};

const setMachinesPosition = (
  machines: Node<Machine>[],
  edges: EdgeWithHead[]
): Node<Machine>[] => {
  if (!machines.length || !edges.length) {
    console.warn(" No machines or edges found!");
    return machines;
  }
  const x_offset = 400; 
  const y_offset = 300; 
  const flow_head_ids: FlowHead[] = [
    ...new Set(
      edges
        .filter((edge) => edge.head !== undefined && edge.head !== null)
        .map((edge) => edge.head.toString())
    ),
  ].map((id, index) => ({ id, y: y_offset * (index + 1) }));

  return machines.map((machine) => {
    if (!machine.id) {
      console.warn(" Machine missing ID:", machine);
      return { ...machine, position: { x: x_offset, y: y_offset } };
    }

    const { distance, head_id } = calculateDistanceFromHead(
      machine.id.toString(),
      flow_head_ids.map((fh) => fh.id),
      edges
    );

    if (!head_id) {
      console.warn(` No head_id found for machine ${machine.id}, using default.`);
    }

    const head = flow_head_ids.find((fh) => fh.id === head_id);
    const x = isNaN(distance) || !isFinite(distance) ? x_offset : x_offset * distance;
    const y = head?.y && isFinite(head.y) ? head.y : y_offset;

    return {
      ...machine,
      position: { x, y },
    };
  });
};


const nodeTypes: NodeTypes = {
  machine: MachineCard,
};

const parseMachines = ({ machines }: { machines: Machine[] }): Node<Machine>[] => {
  return machines.map((machine, index) => ({
    id: machine.machine_id.toString(),
    type: "machine",
    data: machine,
    position: { x: 200 * (index % 5), y: 200 * Math.floor(index / 5) },
  }));
};

const parseEdges = ({ edges }: { edges: EdgeWithHead[] }): Edge[] => {
  if (!edges || !Array.isArray(edges)) {
    console.error(" Edges data is invalid:", edges);
    return [];
  }
  return edges
    .filter(
      (edge) =>
        edge &&
        edge.id !== undefined &&
        edge.source !== undefined &&
        edge.target !== undefined
    )
    .map((edge) => ({
      id: edge.id.toString(),
      source: edge.source.toString(),
      target: edge.target.toString(),
      animated: true,
      type: "smoothstep",
      head: edge.head, 
      style: { strokeWidth: 6 },
    }));
};


const MachineGrid: React.FC = () => {
const [edges, setEdges] = useState<Edge[]>([]);
const [machines, setMachines] = useState<Node<Machine>[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const edgesResponse = await axios.get(`${SERVER_ADDRESS}/getAllEdges/1`);
        const edgesData = parseEdges({ edges: edgesResponse.data.edges });
        const machinesResponse = await axios.get(`${SERVER_ADDRESS}/getTaggedByFactory/1`);
        const machinesData = parseMachines({ machines: machinesResponse.data.machines });
        const positionedMachines = setMachinesPosition(machinesData, edgesData as EdgeWithHead[]);

        setEdges(edgesData);
        setMachines(positionedMachines);
      } catch (error) {
        console.error(" Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ width: "100vw", height: "90vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Factory Grid</h2>
      <ReactFlow
        nodes={machines}
        edges={edges}
        nodeTypes={nodeTypes}
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
