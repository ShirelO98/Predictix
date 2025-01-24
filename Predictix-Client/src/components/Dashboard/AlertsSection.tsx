import React, { useEffect, useState } from "react";
import axios from "axios";
import SensorGrid from "../Dashboard/subcomponents/SensorGrid";
import { MachineSensors } from "../../types/machine";
import { SERVER_ADDRESS } from "../../../constants";

export default function AlertsSection() {
  const [alerts, setAlerts] = useState<MachineSensors[]>([]);

  useEffect(() => {
    axios.get(`${SERVER_ADDRESS}/alerts/1`).then((response) => {
      const mappedAlerts: MachineSensors[] = response.data.machines.map((machine: any, index: number) => ({
        machine_id: `${index}`, 
        machine_name: machine.name,
        vibration: machine.sensors.vibration,
        temperature: machine.sensors.temperature,
        pressure: machine.sensors.pressure,
      }));

      setAlerts(mappedAlerts);
    });
  }, []);

  return (
    <div>
      <h2>Sensor Grid</h2>
      <SensorGrid response={{ machines: alerts }} />
    </div>
  );
}
