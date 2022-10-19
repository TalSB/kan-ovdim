import axios from "axios";
import { areIntervalsOverlappingWithOptions } from "date-fns/fp";
const gEmployees = [
  {
    id: 101,
    name: "Tal",
    roleId: 101,
    occupiedFrom: null,
    occupiedUntil: null,
    isOccupiedChanged: false,
  },
  {
    id: 102,
    name: "NivOPS",
    roleId: 102,
    occupiedFrom: null,
    occupiedUntil: null,
    isOccupiedChanged: false,
  },
  {
    id: 103,
    name: "Alon",
    roleId: 101,
    occupiedFrom: null,
    occupiedUntil: null,
    isOccupiedChanged: false,
  },
];

const gRoles = [
  { name: "developer", id: 101 },
  { name: "devops", id: 102 },
];

const apiURL = "http://localhost:3005/employee";

let filter;

const getEmployees = async () => {
  try {
    const employees = await axios.get(apiURL);
    const filteredEmployees = _filterEmployees(employees.data);
    return filteredEmployees;
  } catch (error) {
    console.log("ERROR:", error);
  }
};

const updateEmployee = async (updatedEmployee) => {
  // const employeeIdx = gEmployees.findIndex((employee) => employee.id === updatedEmployee.id);
  // gEmployees.splice(employeeIdx, 1, updatedEmployee);
  try {
    const employee = await axios.put(apiURL, { updatedEmployee });
    return employee.data;
  } catch (error) {
    console.log("ERROR:", error);
  }
};

const addEmployee = async (newEmployee) => {
  try {
    await axios.post(apiURL, { newEmployee });
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = async (employeeId) => {
  try {
    await axios.delete(apiURL + "/" + employeeId);
  } catch (error) {
    console.log(error);
  }
};

const _filterEmployees = (employees) => {
  let filteredEmployees;
  if (filter?.from) {
    filteredEmployees = employees.filter((employee) => employee.occupiedFrom >= filter.from);
  }
  if (filter?.to) {
    let employeeArray = filteredEmployees || employees;
    filteredEmployees = employeeArray.filter((employee) => employee.occupiedUntil <= filter.to);
  }
  if (!filteredEmployees || !filter) return employees;
  return filteredEmployees;
};

const setFilter = (filterOptions) => {
  filter = { ...filter, ...filterOptions };
  return Promise.resolve();
};

export const employeeService = {
  getEmployees,
  updateEmployee,
  setFilter,
  addEmployee,
  deleteEmployee,
};
