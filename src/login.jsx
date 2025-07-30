
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsername] = useState(""); // Username for login/signup
  const [password, setPassword] = useState(""); // Password for login/signup
//   const [fullName, setFullName] = useState(""); // Full name only for signup
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate();

  // Handle Login Logic
  const handleLogin = () => {
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading

    axios
    .post("https://chordata-backend-1.onrender.com/api/post/login", { username, password }) // Send username and password for login
    .then((response) => {
      setLoading(false); // Stop loading
      if (response.data.status === "ok") {
        alert("Login successfully!");
        localStorage.setItem("token", response.data.data);
        localStorage.setItem("isLogin", "true");

        // Update the state in App component
        setIsLoggedIn(true);

        navigate("/dashboard");
      } else {
        alert(response.data.message || "An error occurred");
      }
    })
    .catch((error) => {
      setLoading(false);
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    });

    // axios
    //   .post("http://localhost:3000/api/post/login", { username, password }) // Send username and password for login
    //   .then((response) => {
    //     setLoading(false); // Stop loading
    //     if (response.data.status === "ok") {
    //       alert("Login successfully!");
    //       localStorage.setItem("token", response.data.data);
    //       localStorage.setItem("isLogin", "true");

    //       // Update the state in App component
    //       setIsLoggedIn(true);

    //       navigate("/dashboard");
    //     } else {
    //       alert(response.data.message || "An error occurred");
    //     }
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.error("Login error:", error);
    //     alert("Login failed. Please try again.");
    //   });
  };

  // Handle Signup Logic
  const handleSignup = () => {
    if (!email || !username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading

    axios
      .post("http://localhost:3000/api/post/signUp", { email, username, password }) // Send full name, username and password for signup
      .then((response) => {
        setLoading(false); // Stop loading
        if (response.data.status === "ok") {
          alert("Registered successfully!");
          setIsLogin(true); // Switch to login form after successful signup
        } else {
          alert(response.data.message || "An error occurred");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Signup error:", error);
        alert("Signup failed. Please try again.");
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px" }}>
      <h2 style={{ marginBottom: "20px" }}>{isLogin ? "Login" : "Sign Up"}</h2>

      {/* Full Name field only for signup */}
      {!isLogin && (
        <div style={{ marginBottom: "15px", width: "300px" }}>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
        </div>
      )}

      {/* Username field for both login and signup */}
      <div style={{ marginBottom: "15px", width: "300px" }}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
      </div>

      {/* Password field for both login and signup */}
      <div style={{ marginBottom: "15px", width: "300px" }}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
      </div>

      {/* Submit button for login or signup */}
      <button
        onClick={isLogin ? handleLogin : handleSignup}
        style={{
          backgroundColor: isLogin ? "#3498db" : "#2ecc71",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        disabled={loading} // Disable the button when loading
      >
        {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
      </button>

      {/* Toggle between Login and Signup */}
      <p style={{ marginTop: "20px" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={() => setIsLogin(!isLogin)} style={{ color: "#3498db", cursor: "pointer" }}>
          {isLogin ? "Sign up here" : "Login here"}
        </span>
      </p>
    </div>
  );
}




