import axios from "axios";

const apiURL = "http://localhost:3005/employee";

let filter;

const getEmployees = async () => {
  try {
    const employees = await axios.get(apiURL);
    // const filteredEmployees = _filterEmployees(employees.data);
    return employees.data;
  } catch (error) {
    console.log("ERROR:", error);
  }
};

const updateEmployee = async (updatedEmployee) => {
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
    if (!filter.to) filter.to = filter.from;
    filteredEmployees = employees.filter((employee) => !(filter.from <= employee.occupiedUntil && filter.to >= employee.occupiedFrom));
  }

  if (!filteredEmployees) return employees;
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
