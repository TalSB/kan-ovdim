import { useState, createContext, useEffect } from "react";
import { roleService } from "../services/role-service";

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    try {
      const fetchedRoles = await roleService.getRoles();
      setRoles([...fetchedRoles]);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };
  return <RoleContext.Provider value={{ roles, getRoles }}>{children}</RoleContext.Provider>;
}

export default RoleContext;
