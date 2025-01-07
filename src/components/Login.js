import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode


function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Simulate an API call
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        // Save JWT token in LocalStorage
    localStorage.setItem("token", data.token);

    // Decode the JWT token to get the user role
    const decodedToken = jwtDecode(data.token);
    const userRole = decodedToken.role;


     // Navigate based on role
      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "user") {
        navigate("/user");
      } else {
        alert("Unknown role!"); // Handle unexpected roles
      }
    } else {
      alert(data.message); // Show error message
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
