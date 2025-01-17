import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import HandleProduct from "./components/HandleProduct ";


function App() {
  const [user, setUser] = React.useState(null); // Store the user object after login

  // Check for token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // console.log("Fetched Role:", decoded.role); // Print the role
        setUser({ role: decoded.role });
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
  }, []);

  const handleLogout = () => {
    setUser(null); // Clear the user
    localStorage.removeItem("token"); // Remove token from storage
  };

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav style={{ display: "flex", gap: "20px", background:" #d7f0e2 " , height:"50px" , alignItems:"center" }}>
          <a href="/">Home</a>
          {!user && <a href="/login">Login</a>}
          {!user && <a href="/register">Register</a>}
          {user && user.role ==='admin' && <a href="/handleProduct">Products handling page</a>}
          {user && <button onClick={handleLogout}>Logout</button>}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />


          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute role="user">
                <UserDashboard />
              </PrivateRoute>
            }
          />
             <Route
            path="/handleProduct"
            element={
              <PrivateRoute role="admin">
                <HandleProduct />
              </PrivateRoute>
            }
          />

          {/* Default redirection */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
