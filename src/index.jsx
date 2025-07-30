import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // ✅ Updated here
import { UserProvider } from "./Api/userContext";
// import { NavigationProvider } from "./Api/NavigationContext";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import App from "./App";
import AuthForm from "./login";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = localStorage.getItem("isLogin");
      console.log(data);
      setIsLoggedIn(data === "true");
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <UserProvider>
      {/* Uncomment if you actually use it */}
      {/* <NavigationProvider> */}
        <Router>
          <div>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <div className="spinner">
                  <Spinner animating={true} speed={1} size={16} color="#028704" />
                </div>
              </div>
            ) : (
              <Routes>
                <Route path="/home" element={isLoggedIn ? <App /> : <AuthForm />} />
                {/* Add more routes here as needed */}
              </Routes>
            )}
          </div>
        </Router>
      {/* </NavigationProvider> */}
    </UserProvider>
  );
}

