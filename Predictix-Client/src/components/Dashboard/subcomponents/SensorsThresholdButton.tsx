import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { Sensor } from "../../../types/Sensor";
import axios from "axios";
import { SERVER_ADDRESS } from "../../../../constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface SensorsThresholdProps {
  sensors: Sensor[];
  onSaveThresholds: (updatedSensors: Sensor[]) => void;
  machineID: string; // Explicitly define machineID as a required prop
}

export default function SensorsThresholdButton({
  sensors,
  onSaveThresholds,
  machineID, 
}: SensorsThresholdProps) {
  const [open, setOpen] = useState(false);
  const [thresholds, setThresholds] = useState<number[]>([]);

  // Synchronize thresholds state with the sensors prop
  useEffect(() => {
    setThresholds(sensors.map((sensor) => sensor.thresholdValue));
  }, [sensors]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleThresholdChange = (index: number) => (
    event: Event,
    newValue: number | number[]
  ) => {
    if (typeof newValue === "number") {
      const updatedThresholds = [...thresholds];
      updatedThresholds[index] = newValue;
      setThresholds(updatedThresholds);
    }
  };

  const handleSave = async () => {
    try {
      // Prepare the payload for the API
      const updatedThresholdsPayload = sensors.reduce((acc, sensor, index) => {
        acc[`${sensor.sensorName}_threshold`] = thresholds[index];
        return acc;
      }, {} as Record<string, number>);

      // Make the POST request with machineID
      const response = await axios.post(
        `${SERVER_ADDRESS}/update_thresholds/${machineID}/`, // Use machineID directly
        updatedThresholdsPayload
      );

      if (response.data.message === "Thresholds updated successfully.") {
        console.log("Updated Thresholds:", response.data.updated_thresholds);
      }

      // Notify the parent component with the updated sensors
      const updatedSensors = sensors.map((sensor, index) => ({
        ...sensor,
        thresholdValue: thresholds[index],
      }));
      onSaveThresholds(updatedSensors);

      // Close the modal
      handleClose();
    } catch (error) {
      console.error("Error updating thresholds:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Set Thresholds</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Adjust Sensor Thresholds
          </Typography>
          {sensors.map((sensor, index) => (
            <div key={sensor.sensorName} style={{ marginTop: "20px" }}>
              <Typography>
                {sensor.sensorName} Threshold: {thresholds[index]}
              </Typography>
              <Slider
                value={thresholds[index]}
                onChange={handleThresholdChange(index)}
                aria-labelledby={`${sensor.sensorName}-slider`}
                valueLabelDisplay="auto"
                step={0.1}
                marks
                min={0}
                max={100}
              />
            </div>
          ))}
          <Button
            onClick={handleSave} // Directly use handleSave (no destructuring needed here)
            style={{ marginTop: "20px" }}
          >
            Save Thresholds
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
