import React, { useEffect, useState } from "react";
import axios from "axios";
import SensorGrid from "../Dashboard/subcomponents/SensorGrid";
import { MachineSensors } from "../../types/machine";
import { SERVER_ADDRESS } from "../../../constants";

export default function AlertsSection() {
  const [alerts, setAlerts] = useState<MachineSensors[]>([]);

  useEffect(() => {
    axios
      .get(`${SERVER_ADDRESS}/alerts/1`)
      .then((response) => {
        console.log("API Response:", response.data);
  
        if (response.data?.machines) {
          const mappedAlerts = response.data.machines.map((machine: any, index: number) => ({
            machine_id: `${index}`,
            machine_name: machine.name || "Unknown",
            sensors: machine.sensors || {}, // Include full sensors object
          }));
          setAlerts(mappedAlerts);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  

  return (
    <div>
      <h2>Sensor Grid</h2>
      <SensorGrid machines={alerts} />
    </div>
  );
}
