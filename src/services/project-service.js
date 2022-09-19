const gProjects = [
  { id: 101, name: "MyBusiness", employeeIds: [], startDate: new Date(Date.now()), endDate: new Date(Date.now() + 1000 * 60 * 60 * 24) },
  { id: 102, name: "Telemesser", employeeIds: [] },
  { id: 103, name: "Microsoft", employeeIds: [] },
];

const addProject = async (newProject) => {
  newProject.id = Math.floor(1000 * Math.random());
  gProjects.push(newProject);
  return Promise.resolve();
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
