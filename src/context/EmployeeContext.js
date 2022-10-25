import { useState, createContext, useContext, useEffect } from "react";
import { employeeService } from "../services/employee-service";
import ProjectContext from "./ProjectContext";

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(null);
  const [filter, setFilter] = useState(null);
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

  const addEmployee = async (newEmplyoee) => {
    try {
      await employeeService.addEmployee(newEmplyoee);
      await queryEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    await employeeService.deleteEmployee(employeeId);
    await queryEmployees();
  };

  const onSetFilter = async (filterOptions) => {
    setFilter({ ...filter, ...filterOptions });
  };

  return (
    <EmployeeContext.Provider value={{ employees, filter, updateEmployee, queryEmployees, addEmployee, deleteEmployee, onSetFilter }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export default EmployeeContext;
