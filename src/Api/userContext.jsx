import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    // try {
    //   const response = await axios.post("http://localhost:3000/api/post/user-data", { token });

    //   if (response.data.status === "ok") {
    //     setUserData(response.data.data);
    //   } else {
    //     window.alert(response.data.message || "Something went wrong.");
    //   }
    // } catch (error) {
    //   console.error("Error fetching user data:", error);
    // } finally {
    //   setLoading(false);
    // }

    try {
      const response = await axios.post("https://chordata-backend-1.onrender.com/api/post/user-data", { token });

      if (response.data.status === "ok") {
        setUserData(response.data.data);
      } else {
        window.alert(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, getToken, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};


