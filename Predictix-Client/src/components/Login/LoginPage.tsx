import React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

// AuthResponse type definition
type AuthResponse = {
  status: string; // "ok" or "error"
  token?: string; // Token in case of successful login
  error?: string; // Error message in case of failure
};

// Mock users for testing
const mockUsers = [
  { email: "test@example.com", password: "test123", token: "mock-token-1" },
  { email: "user2@example.com", password: "12345", token: "mock-token-2" },
];

const BRANDING = {
  logo: (
    <img
      src={logo} // Path to the logo
      alt="Predictix Logo"
      style={{ height: 24 }}
    />
  ),
  title: "Predictix",
};

const providers = [{ id: "credentials", name: "Email & Password" }];

// Mock sign-in function
const signIn: (
  provider: AuthProvider,
  formData?: { email?: string; password?: string },
  callbackUrl?: string
) => Promise<AuthResponse> = async (provider, formData) => {
  const { email, password } = formData || {};

  // Validate email and password against mock users
  const user = mockUsers.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("authToken", user.token); // Store token
    return {
      status: "ok",
      token: user.token,
    };
  } else {
    return {
      status: "error",
      error: "Invalid email or password",
    };
  }
};

export default function LoginPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSignIn = async (
    provider: AuthProvider,
    formData?: FormData
  ): Promise<AuthResponse> => {
    // Convert FormData to readable values
    const email = formData?.get("email") as string;
    const password = formData?.get("password") as string;

    // Call the mock sign-in function
    const response = await signIn(provider, { email, password });

    if (response.status === "ok") {
      navigate("/dashboard");
    }

    return response;
  };

  return (
    <AppProvider branding={BRANDING} theme={theme}>
      <SignInPage
        signIn={handleSignIn} // Sign-in function
        providers={providers} // Authentication providers
        slotProps={{
          emailField: { name: "email", label: "Email", autoFocus: true }, // Define the name and label
          passwordField: { name: "password", label: "Password" }, // Define the name and label
        }}
      />
    </AppProvider>
  );
}
