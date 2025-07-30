// In a component
import { useNavigate } from "react-router-dom";

export const LogOut = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const logOut = () => {
    // Clear user data from localStorage
    localStorage.removeItem("isLogin");
    localStorage.removeItem("token");

    // Update the isLoggedIn state to false in App
    setIsLoggedIn(false);

    // Navigate to the login page
    navigate("/");
  };

  return (
    <div>
      <h1>Logging out...</h1>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

