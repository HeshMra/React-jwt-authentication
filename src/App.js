import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";


function App() {
  const [user, setUser] = React.useState(null); // Store the user object after login

  const handleLogout = () => {
    setUser(null); // Clear the user
  };

  
  return (
    <Router>
    <div>
      {/* Navigation Bar */}
      <nav>
        <a href="/">Home</a>
        {!user && <a href="/login">Login</a>}
        {!user && <a href="/register">Register</a>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/user"
          element={user?.role === "user" ? <UserDashboard /> : <Navigate to="/" />}
        />
         {/* Default redirection */}
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
