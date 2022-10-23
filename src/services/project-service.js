import axios from "axios";

let filter = {};

const apiURL = "http://localhost:3005/project";

const addProject = async (newProject) => {
  // newProject.id = Math.floor(1000 * Math.random());
  // gProjects.push(newProject);
  try {
    const project = await axios.post(apiURL, { newProject });
    return project.data;
  } catch (error) {
    console.log("ERROR", error);
  }
};

const getProjects = async () => {
  try {
    const projects = await axios.get(apiURL);
    const filteredProjects = _filterProjects(projects.data);
    return filteredProjects;
  } catch (error) {
    console.log("ERROR:", error);
  }
};

// const moveProject = async (fromIdx, toIdx) => {
//   const movedProject = gProjects[fromIdx];
//   gProjects.splice(fromIdx, 1);
//   gProjects.splice(toIdx, 0, movedProject);
//   return Promise.resolve();
// };

const updateProject = async (updatedProject) => {
  // const projectIdx = gProjects.findIndex((project) => project.id === updatedProject.id);
  // gProjects.splice(projectIdx, 1, updatedProject);
  // return Promise.resolve();
  try {
    const project = await axios.put(apiURL, { updatedProject });
    return project.data;
  } catch (error) {
    console.log("ERORR:", error);
  }
};

const deleteProject = async (projectId) => {
  try {
    return await axios.delete(apiURL + "/" + projectId);
  } catch (error) {
    console.log("ERROR:", error);
  }
};

const setFilter = async (filterOptions) => {
  filter = { ...filter, ...filterOptions };
  return Promise.resolve();
};

const _filterProjects = (projects) => {
  let filteredProjects;
  if (filter.from) {
    filteredProjects = projects.filter((project) => project.startDate >= filter.from);
  }
  if (filter.to) {
    let projArr = filteredProjects || projects;
    filteredProjects = projArr.filter((project) => project.endDate <= filter.to);
  }

  if (!filteredProjects || !filter) return projects;

  return filteredProjects;
};

export const projectService = {
  addProject,
  getProjects,
  // moveProject,
  updateProject,
  deleteProject,
  setFilter,
};
