import { Edge } from "reactflow";

export interface Machine {
  machine_id: string;
  name: string;
  sensors: Record<string, number>;
  manufacturer: string;
  down_time?: number;
  last_maintenance_date?: Date;
  next_maintenance_date?: Date;
  up_time?: number;
  prediction_status: boolean;
}

export interface FlowHead {
  id: string;
  y?: number;
}

export interface EdgeWithHead extends Edge {
  head: string;
}

export interface MachineSensors {
  machine_id: string;
  machine_name: string;
  sensors: Record<string, { value: number; threshold: number }>;
}

