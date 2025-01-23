 import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SensorGrid from "./subcomponents/SensorGrid";
import { MachineSensors } from "../../types/machine";
// import { SERVER_ADDRESS } from "../../../constants";
// import axios from "axios";
const machineSensors: MachineSensors[] = [
  {
    machine_id: "M001",
    machine_name: "Machine A",
    vibration: 5.5,
    temperature: 75.3,
    pressure: 3.1,
  },
  {
    machine_id: "M002",
    machine_name: "Machine B",
    vibration: 3.2,
    temperature: 68.7,
    pressure: 2.9,
  },
  {
    machine_id: "M003",
    machine_name: "Machine C",
    vibration: 4.1,
    temperature: 70.5,
    pressure: 3.3,
  },
];

const AlertsSection: React.FC = () => {
  //   const [machineSensors, setMachineSensors] = useState<MachineSensors[]>([]);
  //   const [loading, setLoading] = useState<boolean>(true);

  //   useEffect(() => {
  //     // Fetch sensors data
  //     axios.get(`${SERVER_ADDRESS}/api/machine-sensors`) // Replace with your actual API endpoint
  //       .then((response) => {
  //         setMachineSensors(response.data);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching machine sensors:", error);
  //         setLoading(false);
  //       });
  //   }, []);

  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Alerts
      </Typography>
      {/* Factory Sensors Section */}
      <Box
        sx={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Factory Sensors
        </Typography>
        <SensorGrid machineSensors={machineSensors} />
      </Box>
    </Box>
  );
};

export default AlertsSection;
