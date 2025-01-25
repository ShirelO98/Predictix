import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { Sensor } from "../../../types/Sensor";

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
}

export default function SensorsThresholdButton({
  sensors,
  onSaveThresholds,
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

  const handleSave = () => {
    const updatedSensors = sensors.map((sensor, index) => ({
      ...sensor,
      thresholdValue: thresholds[index],
    }));
    onSaveThresholds(updatedSensors); // Notify the parent component
    handleClose();
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
          <Button onClick={handleSave} sx={{ mt: 2 }}>
            Save Thresholds
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
