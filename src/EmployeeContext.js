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
    if (currEmployees) setEmployees([...currEmployees]);
  };

  const setFilter = async (filterOptions) => {
    await employeeService.setFilter(filterOptions);
    await queryEmployees();
  };

  return <EmployeeContext.Provider value={{ employees, updateEmployee, queryEmployees, setFilter }}>{children}</EmployeeContext.Provider>;
}

export default EmployeeContext;
