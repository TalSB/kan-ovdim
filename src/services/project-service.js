import { isFirstDayOfMonth } from "date-fns";
import axios from "axios";

const gProjects = [
  { id: 101, name: "MyBusiness", employeeIds: [], startDate: new Date(Date.now()), endDate: new Date(Date.now() + 1000 * 60 * 60 * 24) },
  { id: 102, name: "Telemesser", employeeIds: [], startDate: new Date(Date.now()), endDate: new Date(Date.now() + 1000 * 60 * 60 * 24) },
  { id: 103, name: "Microsoft", employeeIds: [], startDate: new Date(Date.now()), endDate: new Date(Date.now() + 1000 * 60 * 60 * 24) },
];

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
  let filteredProjects = [];
  try {
    const projects = await axios.get(apiURL);
    return projects.data;
  } catch (error) {
    console.log("ERROR:", error);
  }
};

const moveProject = async (fromIdx, toIdx) => {
  const movedProject = gProjects[fromIdx];
  gProjects.splice(fromIdx, 1);
  gProjects.splice(toIdx, 0, movedProject);
  return Promise.resolve();
};

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

const setFilter = async (filterOptions) => {
  filter = { ...filter, ...filterOptions };
  return Promise.resolve();
};

export const projectService = {
  addProject,
  getProjects,
  moveProject,
  updateProject,
  setFilter,
};
