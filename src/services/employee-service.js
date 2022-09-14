const gEmployees = [
  {
    id: 101,
    name: "Tal",
    roleId: 101,
  },
  {
    id: 102,
    name: "NivOPS",
    roleId: 102,
  },
  {
    id: 103,
    name: "Alon",
    roleId: 101,
  },
];

const gRoles = [
  { name: "developer", id: 101 },
  { name: "devops", id: 102 },
];

const getEmployees = async () => {
  return Promise.resolve(gEmployees);
};

export const employeeService = {
  getEmployees,
};
