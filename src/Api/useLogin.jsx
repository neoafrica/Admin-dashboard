import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useLogin = () => useContext(UserContext);
