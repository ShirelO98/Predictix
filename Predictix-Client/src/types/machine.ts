// export interface Machine {
//     machineID:string;
//     machineName:string;
//     vibration:number;
//     temperature:number;
//     pressure:number;
//     status:string;
//     lastMaintenanceDate:string;
//     nextMaintenanceDate:string;
//     upTime:number;
//     downTime:number;
// }
export interface Machine {
  machine_id: string; 
  name: string;
  vibration?: number; 
  temperature?: number; 
  pressure?: number;
  status?: string; 
  type: string; 
  manufacturer: string; 
  down_time?: number; 
  last_maintenance_date?: Date; 
  next_maintenance_date?: Date; 
  up_time?: number; 
  prediction_status: number;
}

export interface MachineSensors {
  machine_id: string;
  machine_name: string;
  sensors: Record<string, number>;
}
