import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // מחיקת הטוקן
    navigate("/login"); // הפניה לדף הכניסה
  };

  return (
    <Button variant="outlined" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
}
