import { useState, createContext, useContext, useEffect } from "react";
import { employeeService } from "./services/employee-service";
import ProjectContext from "./ProjectContext";

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(null);
  const { queryProjects } = useContext(ProjectContext);

  useEffect(() => {
    queryEmployees();
  }, []);

  const updateEmployee = async (updatedEmployee) => {
    await employeeService.updateEmployee(updatedEmployee);
    await queryEmployees();
    await queryProjects();
  };

  const queryEmployees = async () => {
    const currEmployees = await employeeService.getEmployees();
    setEmployees([...currEmployees]);
  };

  return <EmployeeContext.Provider value={{ employees, updateEmployee, queryEmployees }}>{children}</EmployeeContext.Provider>;
}

export default EmployeeContext;
