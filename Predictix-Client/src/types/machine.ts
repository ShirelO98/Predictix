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
export interface MachineNode {
  machine: Machine;
  position: { x: number; y: number }; 
  next: MachineNode | null;
  critical: boolean;
}

export interface FlowData {
  Name: string;
  Head: MachineNode;
}

export interface MachineSensors {
  machine_id: string;
  machine_name: string;
  sensors: Record<string, { value: number; threshold: number }>;
}

export interface MachineNodeData {
  name: string;
  sensors: Record<string, number>;
}
