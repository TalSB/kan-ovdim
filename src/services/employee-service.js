import axios from "axios";
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

const apiURL = 'http://localhost:3000/employee'


const getEmployees = async () => {
  const employees = await axios.get(apiURL)
  return employees.data
};

const updateEmployee = async (updatedEmployee) => {
  const employeeIdx = gEmployees.findIndex((employee) => employee.id === updatedEmployee.id);
  gEmployees.splice(employeeIdx, 1, updatedEmployee);
  return Promise.resolve();
};

export const employeeService = {
  getEmployees,
  updateEmployee,
};
