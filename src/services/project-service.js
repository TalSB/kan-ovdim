const gProjects = [
  { id: 101, name: "MyBusiness", employeeIds: [101], startDate: new Date(Date.now()), endDate: new Date(Date.now() + 1000 * 60 * 60 * 24) },
  { id: 102, name: "Telemesser", employeeIds: [102] },
  { id: 103, name: "Microsoft", employeeIds: [103] },
];

const addProject = async (projName) => {
  gProjects.push({
    id: Math.floor(1000 * Math.random()),
    name: projName,
  });
  Promise.resolve();
};

const getProjects = async () => {
  return Promise.resolve(gProjects);
};

const moveProject = async (fromIdx, toIdx) => {
  const movedProject = gProjects[fromIdx];
  gProjects.splice(fromIdx, 1);
  gProjects.splice(toIdx, 0, movedProject);
  return Promise.resolve();
};

const updateProject = async (updatedProject) => {
  const projectIdx = gProjects.findIndex((project) => project.id === updatedProject.id);
  gProjects.splice(projectIdx, 1, updatedProject);
  return Promise.resolve();
};

export const projectService = {
  addProject,
  getProjects,
  moveProject,
  updateProject,
};
