const gEmployees = [
  {
    id: 101,
    name: "Tal",
    roleId: 101,
    occupiedFrom: new Date(),
    occupiedUntil: new Date(Date.now() + 1000 * 60 * 60 * 24),
  },
  {
    id: 102,
    name: "NivOPS",
    roleId: 102,
    occupiedFrom: null,
    occupiedUntil: null,
  },
  {
    id: 103,
    name: "Alon",
    roleId: 101,
    occupiedFrom: new Date(),
    occupiedUntil: new Date(Date.now() + 1000 * 60 * 60 * 24),
  },
];

const gRoles = [
  { name: "developer", id: 101 },
  { name: "devops", id: 102 },
];

const getEmployees = async () => {
  return Promise.resolve(gEmployees);
};

const updateEmployee = async (updatedEmployee) => {};

export const employeeService = {
  getEmployees,
  updateEmployee,
};
