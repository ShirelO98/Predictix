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
  machine_name: string;
  vibration: number;
  temperature: number;
  pressure: number;
  status: string;
  down_time: number;
  last_maintenance_date: Date;
  next_maintenance_date: Date;
  up_time: number;
}

export interface MachineSensors {
  machine_id: string;
  machine_name: string;
  vibration: number;
  temperature: number;
  pressure: number;
}
